// src/routes/chat.ts
import { Router, Request, Response } from 'express';
import ChatSession from '@/backend/models/ChatSession';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

interface ChatRequestBody {
  sessionId?: string;
  message: string;
}

// Fake bot reply generator
const getBotResponse = (msg: string): string => {
  return `Bot reply to: "${msg}"`;
};

router.post('/chat', async (req: Request, res: Response) => {
  const { sessionId, message }: ChatRequestBody = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  const id = sessionId || uuidv4();
  let chatSession = await ChatSession.findOne({ sessionId: id });

  if (!chatSession) {
    chatSession = new ChatSession({ sessionId: id, messages: [] });
  }

  // User message
  chatSession.messages.push({ sender: 'user', message });

  // Bot reply
  const botReply = getBotResponse(message);
  chatSession.messages.push({ sender: 'bot', message: botReply });

  await chatSession.save();

  res.json({
    sessionId: chatSession.sessionId,
    reply: botReply,
    history: chatSession.messages
  });
});

export default router;
