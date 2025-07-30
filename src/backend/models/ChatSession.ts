import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp?: Date;
}

export interface IChatSession extends Document {
  sessionId: string;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema<IMessage>({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSessionSchema: Schema = new Schema<IChatSession>({
  sessionId: { type: String, required: true, unique: true },
  messages: [MessageSchema]
});

export default mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);
