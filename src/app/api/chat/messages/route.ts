import { NextRequest, NextResponse } from 'next/server';
import mongoose, { Document, Types } from 'mongoose';
import ChatSession from '@/backend/models/ChatSession';
import { decryptMessage } from '@/lib/encryption';

// Define the IMessage interface to be consistent with your schema
interface IMessage {
  message: string;
  timestamp: Date;
  encrypted?: boolean;          // Flag to indicate encrypted messages
  sender?: 'user' | 'bot';      // Sender role
  _id?: Types.ObjectId | string; // MongoDB ObjectId
}

// Document interface for ChatSession
interface IChatSessionDocument extends Document {
  sessionId: string;
  messages: Types.DocumentArray<IMessage>;
}

// Connect to MongoDB if not already connected
async function connectMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      process.env.MONGODB_URI ||
      process.env.NEXT_PUBLIC_MONGODB_URI ||
      'mongodb://localhost:27017/chatbotdb'
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { message: 'Missing sessionId query parameter' },
        { status: 400 }
      );
    }

    await connectMongo();

    // Fetch the chat session
    const chatSession = (await ChatSession.findOne({ sessionId })) as
      | IChatSessionDocument
      | null;

    if (!chatSession) {
      // No messages found, return empty list
      return NextResponse.json({ messages: [] });
    }

    // Decrypt messages before sending to client
    const decryptedMessages = chatSession.messages.map((msg) => {
      // Convert mongoose subdoc to plain object to avoid mutation issues
      const plainMsg = typeof msg.toObject === 'function' ? msg.toObject() : msg;

      let decryptedContent = plainMsg.message;
      console.log(decryptedContent)
      try {
        if (plainMsg.encrypted) {
          const dec = decryptMessage(plainMsg.message);
          console.log("dec", dec);
          decryptedContent = dec || plainMsg.message; // fallback to original if decrypt fails
        }
      } catch (error) {
        console.error('Decryption error for message:', plainMsg, error);
        decryptedContent = plainMsg.message;
      }

      return {
        ...plainMsg,
        content: decryptedContent,
        timestamp: plainMsg.timestamp,
      };
    });
    return NextResponse.json({ messages: decryptedMessages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
