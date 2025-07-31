import mongoose, { Schema, Document, Model, models } from 'mongoose';

// Your schema code stays as is ...

export interface IMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp?: Date;
}

export interface IChatSession extends Document {
  sessionId: string;
  messages: IMessage[];
}

const MessageSchema: Schema<IMessage> = new Schema({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSessionSchema: Schema<IChatSession> = new Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [MessageSchema]
});

const ChatSessionModel: Model<IChatSession> =
  models.ChatSession || mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);

export default ChatSessionModel;
