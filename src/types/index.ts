export interface Message {
  _id?: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  userId: string;
  sessionId?: string;
  encrypted?: boolean;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface ChatSession {
  _id?: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, 'password'>;
  message?: string;
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  message?: string;
}