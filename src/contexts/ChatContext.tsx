'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { chatAPI } from '../services/api';
import { useAuth } from './AuthContext';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  messageType?: 'text' | 'form' | 'button' | 'table' | 'health-form';
  metadata?: any;
  tools?: any[];
}

interface ChatSession {
  _id: string;
  sessionId: string;
  title: string;
  messages: Message[];
  lastActivity: Date;
  createdAt: Date;
  isGuest: boolean;
}

interface ChatContextType {
  currentSession: ChatSession | null;
  sessions: Record<string, ChatSession[]>;
  isLoading: boolean;
  sendMessage: (message: string, messageType?: string) => Promise<void>;
  createNewSession: () => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  loadChatHistory: () => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [sessions, setSessions] = useState<Record<string, ChatSession[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { token, isAuthenticated, setShowLoginModal } = useAuth();

  // 🔹 Restore last session from localStorage
  useEffect(() => {
    const lastSessionId = localStorage.getItem('lastSessionId');
    if (lastSessionId) {
      loadSession(lastSessionId);
    } else if (!isAuthenticated) {
      createGuestSession();
    } else {
      loadChatHistory();
    }
  }, [isAuthenticated]);

  // 🔹 Persist currentSession ID
  useEffect(() => {
    if (currentSession?.sessionId) {
      localStorage.setItem('lastSessionId', currentSession.sessionId);
    }
  }, [currentSession]);

  const generateGuestId = () =>
    'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  const createGuestSession = async () => {
    try {
      const guestId = localStorage.getItem('guestId') || generateGuestId();
      localStorage.setItem('guestId', guestId);

      const response = await chatAPI.createSession({ guestId });
      const session = response.session || response;
      setCurrentSession(session);
    } catch (error) {
      console.error('Failed to create guest session:', error);
    }
  };

  const createNewSession = async () => {
    try {
      setIsLoading(true);
      const response = await chatAPI.createSession({}, token);
      const session = response.session || response;
      setCurrentSession(session);

      if (isAuthenticated) await loadChatHistory();
    } catch (error) {
      console.error('Failed to create new session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const session = await chatAPI.getSession(sessionId, token);
      setCurrentSession(session);
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatHistory = async () => {
    if (!isAuthenticated || !token) return;

    try {
      const { sessions: chatSessions } = await chatAPI.getSessions(token);
      setSessions(chatSessions);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async (message: string, messageType = 'text') => {
    if (!currentSession) return;

    try {
      setIsLoading(true);

      const userMessage: Message = {
        role: 'user',
        content: message,
        timestamp: new Date(),
        messageType,
      };

      setCurrentSession(prev =>
        prev ? { ...prev, messages: [...prev.messages, userMessage] } : null
      );

      const response = await chatAPI.sendMessage(
        currentSession.sessionId,
        message,
        messageType,
        token
      );

      setCurrentSession(prev =>
        prev
          ? {
              ...prev,
              messages: [
                ...prev.messages.slice(0, -1),
                response.userMessage,
                response.botMessage,
              ],
              title:
                response.userMessage.content.slice(0, 50) +
                (response.userMessage.content.length > 50 ? '...' : ''),
              lastActivity: new Date(),
            }
          : null
      );

      if (response.requiresAuth && !isAuthenticated) setShowLoginModal(true);
    } catch (error) {
      console.error('Failed to send message:', error);

      setCurrentSession(prev =>
        prev ? { ...prev, messages: prev.messages.slice(0, -1) } : null
      );

      const errorMessage: Message = {
        role: 'bot',
        content:
          'Sorry, आपका message process करने में समस्या हो रही है। Please try again.',
        timestamp: new Date(),
        messageType: 'text',
      };

      setCurrentSession(prev =>
        prev ? { ...prev, messages: [...prev.messages, errorMessage] } : null
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!isAuthenticated || !token) return;

    try {
      await chatAPI.deleteSession(sessionId, token);
      await loadChatHistory();

      if (currentSession?.sessionId === sessionId) await createNewSession();
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentSession,
        sessions,
        isLoading,
        sendMessage,
        createNewSession,
        loadSession,
        loadChatHistory,
        deleteSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
