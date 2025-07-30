import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import ChatSession from "@/backend/models/ChatSession";

// Ensure mongoose connection (if not already connected)
async function connectMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.NEXT_MONGODB_URL || "mongodb://localhost:27017/chatbotDB");
  }
}

interface RequestBody {
  content: string;
  role: "user" | "bot";
  sessionId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { content, role = "user", sessionId } = body;

    if (!content || !sessionId) {
      return NextResponse.json(
        { message: "Missing content or sessionId" },
        { status: 400 }
      );
    }

    await connectMongo();

    let chatSession = await ChatSession.findOne({ sessionId });

    if (!chatSession) {
      chatSession = new ChatSession({ sessionId, messages: [] });
    }

    chatSession.messages.push({
      sender: role,
      message: content,
      timestamp: new Date(),
    });

    await chatSession.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /chat/message:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
