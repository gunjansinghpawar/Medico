import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ChatSession from '../models/ChatSession.js';
import { auth, optionalAuth } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyASXhEtG3aoZJtHveWoZjPg3luO_a1iIKw');

// System prompt for health-focused Hinglish responses
const SYSTEM_PROMPT = `
You are HealthBot, a professional, friendly, and knowledgeable health assistant.
You ONLY provide health-related information. For any non-health queries, respond with:
"Sorry, main sirf health-related queries ka answer de sakta hoon."

Language & Tone:
1. Respond in Hinglish (Hindi + English mix), simple and easy to understand.
2. Be empathetic, supportive, and encouraging.
3. Use simple medical terms and explain complex ones briefly.
4. Be culturally sensitive to Indian lifestyle, diet, and habits.
5. Always remind users to consult a doctor for serious or persistent symptoms.

Response Guidelines:
1. Structure every response strictly in **4 parts**, each starting with headings:
   - **Reason (h2):** Possible causes  
   - **Cure (h2):** Home remedies & lifestyle changes  
   - **Medicine (h2):** OTC medicines suggestions + doctor consult reminder  
   - **Doctor, Food & Advice (h2):** Local doctor suggestions, diet, lifestyle tips
2. Use HTML-like headings and paragraphs for formatting:
   - Example: <h1>, <h2>, <h3>, <p>, <ul>/<ol>, <li>
3. Provide UI tools alongside text in JSON format.
4. Always end with helpful questions or suggestions when appropriate.

UI Tools (JSON objects):
1. Button → { "type": "button", "label": "string", "action": "string", "variant": "primary|secondary|danger" }
2. Table → { "type": "table", "title": "string", "columns": ["string"], "rows": [["string"]] }
3. List → { "type": "list", "title": "string", "items": ["string"], "ordered": true|false }
4. Suggestions → { "type": "suggestions", "options": ["string"] }
5. Card → { "type": "card", "title": "string", "subtitle": "string", "description": "string", "buttons": [] }

Response Format (JSON object):
{
  [Your structured Hinglish response using <h1>–<h6> and <p>",
  [JSON array of UI tools relevant to the answer]
}

Example Response:
<h2>Reason:</h2>
<p>Ho sakta hai headache stress, dehydration ya eyesight problem ki wajah se ho.</p>

<h2>Cure:</h2>
<p>Paani zyada piyein, rest lein, aur screen time kam karein.</p>

<h2>Medicine:</h2>
<p>Simple paracetamol le sakte hain, lekin agar headache bar bar ho toh doctor ko dikhayein.</p>

<h2>Doctor, Food & Advice:</h2>
<p>Nearby doctor ko consult karein, fruits like apple/banana aur light diet khayein.</p>
[
  {
    "type": "list",
    "title": "Possible Causes",
    "items": ["Stress", "Dehydration", "Eyesight issues"],
    "ordered": false
  },
  {
    "type": "table",
    "title": "Suggested Diet",
    "columns": ["Food", "Benefit"],
    "rows": [
      ["Banana", "Energy boost"],
      ["Cucumber", "Hydration"],
      ["Dal & Rice", "Light & easy to digest"]
    ]
  },
  {
    "type": "button",
    "label": "Find Nearby Doctor",
    "action": "open_doctor_search",
    "variant": "primary"
  },
  {
    "type": "suggestions",
    "options": ["Headache remedies", "Diet for acidity", "Exercises for stress relief"]
  }
]
`;


 
// Create new chat session
router.post('/sessions', optionalAuth, async (req, res) => {
  try {
    const sessionId = uuidv4();
    const { guestId } = req.body;
    
    const sessionData = {
      sessionId,
      isGuest: !req.user,
      ...(req.user ? { user: req.user.userId } : { guestId: guestId || uuidv4() })
    };

    const chatSession = new ChatSession(sessionData);
    await chatSession.save();

    res.status(201).json({
      message: 'New chat session बना दिया गया! (New chat session created!)',
      session: chatSession
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ message: 'Session create करने में error (Error creating session)' });
  }
});

// Get user's chat sessions
router.get('/sessions', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const sessions = await ChatSession.find({ user: req.user.userId })
      .select('sessionId title lastActivity createdAt messages')
      .sort({ lastActivity: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Group sessions by date
    const groupedSessions = sessions.reduce((acc, session) => {
      const date = session.lastActivity.toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        ...session.toObject(),
        messageCount: session.messages.length
      });
      return acc;
    }, {});

    res.json({
      sessions: groupedSessions,
      totalSessions: await ChatSession.countDocuments({ user: req.user.userId })
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Sessions load करने में error (Error loading sessions)' });
  }
});

// Get specific chat session
router.get('/sessions/:sessionId', optionalAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const query = req.user 
      ? { sessionId, user: req.user.userId }
      : { sessionId, isGuest: true };
    
    const session = await ChatSession.findOne(query);
    
    if (!session) {
      return res.status(404).json({ message: 'Chat session नहीं मिला (Chat session not found)' });
    }

    res.json(session);
  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ message: 'Session load करने में error (Error loading session)' });
  }
});

// Send message and get AI response
router.post('/sessions/:sessionId/messages', optionalAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message, messageType = 'text' } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ message: 'Message empty नहीं हो सकता (Message cannot be empty)' });
    }

    // Find session
    const query = req.user 
      ? { sessionId, user: req.user.userId }
      : { sessionId, isGuest: true };
    
    const session = await ChatSession.findOne(query);
    
    if (!session) {
      return res.status(404).json({ message: 'Chat session नहीं मिला (Chat session not found)' });
    }

    // Add user message
    const userMessage = {
      role: 'user',
      content: message.trim(),
      messageType,
      timestamp: new Date()
    };

    session.messages.push(userMessage);
    
    // Update title if this is the first message
    if (session.messages.length === 1) {
      session.title = message.slice(0, 50) + (message.length > 50 ? '...' : '');
    }
    
    session.lastActivity = new Date();

    // Generate AI response
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      // Build conversation context
      const conversationHistory = session.messages.map(msg => 
        `${msg.role === 'user' ? 'User' : 'HealthBot'}: ${msg.content}`
      ).join('\n');

      const prompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${conversationHistory}\n\nUser: ${message}\n\nHealthBot:`;
      
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // Add bot response
      const botMessage = {
        role: 'bot',
        content: aiResponse,
        messageType: 'text',
        timestamp: new Date()
      };

      session.messages.push(botMessage);
      session.lastActivity = new Date();
      
      // Save session with both messages
      await session.save();

      res.json({
        message: 'Response मिल गया! (Response received!)',
        userMessage,
        botMessage,
        sessionId: session.sessionId,
        requiresAuth: !req.user // Flag to show login popup
      });

    } catch (aiError) {
      console.error('AI generation error:', aiError);
      
      // Fallback response
      const fallbackMessage = {
        role: 'bot',
        content: 'Maaf kijiye, मुझे थोड़ी technical problem आ रही है। Please try again या अपना question फिर से पूछिए। (Sorry, I\'m having some technical issues. Please try again or rephrase your question.)',
        messageType: 'text',
        timestamp: new Date()
      };

      session.messages.push(fallbackMessage);
      session.lastActivity = new Date();
      
      // Save session with fallback message
      await session.save();

      res.json({
        message: 'Fallback response भेजा गया (Fallback response sent)',
        userMessage,
        botMessage: fallbackMessage,
        sessionId: session.sessionId,
        requiresAuth: !req.user
      });
    }

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Message send करने में error (Error sending message)' });
  }
});

// Delete chat session
router.delete('/sessions/:sessionId', auth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await ChatSession.findOneAndDelete({
      sessionId,
      user: req.user.userId
    });

    if (!session) {
      return res.status(404).json({ message: 'Chat session नहीं मिला (Chat session not found)' });
    }

    res.json({ message: 'Chat session delete हो गया (Chat session deleted)' });
  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({ message: 'Session delete करने में error (Error deleting session)' });
  }
});

export default router;