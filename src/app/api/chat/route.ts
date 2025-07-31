import ChatSession from '@/backend/models/ChatSession';
import { v4 as uuidv4 } from 'uuid';
import { encryptMessage } from '@/lib/encryption';
import { connectDB } from '@/backend/config/db';

// Import Google Gemini SDK
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client with API key
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const getBotResponse = async (message: string): Promise<string | null> => {
  try {
    // Use the latest Gemini model
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Format chat messages as per Gemini spec
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are a helpful health assistant.' }],
        },
      ],
    });
    
    const result = await chat.sendMessage(message);
    const reply = typeof result?.response?.text === 'function' ? await result.response.text() : result?.response?.text || null;
    return reply;
  } catch (error) {
    console.error('Gemini API error:', error);
    return null;
  }
};

export async function POST(request: Request) {
  try {
    await connectDB();

    const { sessionId, message } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const id = sessionId || uuidv4();

    let chatSession = await ChatSession.findOne({ sessionId: id });
    if (!chatSession) {
      chatSession = new ChatSession({ sessionId: id, messages: [] });
    }

    const encryptedUserMessage = encryptMessage(message);
    chatSession.messages.push({
      sender: 'user',
      message: encryptedUserMessage,
      timestamp: new Date()
    });

    const botReply = await getBotResponse(message);

    if (botReply) {
      const encryptedBotReply = encryptMessage(botReply);
      chatSession.messages.push({
        sender: 'bot',
        message: encryptedBotReply,
        timestamp: new Date()
      });
    }

    await chatSession.save();

    return new Response(
      JSON.stringify({
        sessionId: chatSession.sessionId,
        reply: botReply,
        history: chatSession.messages,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('Error processing chat session:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
