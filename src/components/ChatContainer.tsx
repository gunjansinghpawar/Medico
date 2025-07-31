'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { decryptMessage } from '@/lib/encryption';
import { Message, User } from '@/types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { v4 as uuidv4 } from 'uuid';
import { Heart } from 'lucide-react';

interface ChatContainerProps {
  user: User;
  sessionId?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ user, sessionId: sessionIdProp }) => {

  // Determine sessionId: first from props, else from localStorage, else generate new
  const [sessionId] = useState<string>(() => {
    if (sessionIdProp) return sessionIdProp;

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('chat_session_id');
      if (stored) return stored;

      const newId = uuidv4();
      localStorage.setItem('chat_session_id', newId);
      return newId;
    }

    // Fallback for SSR (should not usually be used in client component)
    return uuidv4();
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync sessionId to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionId) {
      localStorage.setItem('chat_session_id', sessionId);
    }
  }, [sessionId]);

  // Scroll to bottom on message or typing changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Fetch chat messages and decrypt
  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch(`/api/chat/messages?sessionId=${encodeURIComponent(sessionId)}`);
      if (!res.ok) throw new Error(`Failed to load messages: ${res.statusText}`);

      const data = await res.json();

      if (data.messages) {
        const decrypted = data.messages.map((msg: Message) => ({
          ...msg,
          content: msg.content,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(decrypted);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  }, [sessionId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Handle sending a new user message
  const handleSendMessage = async (content: string) => {
    if (!sessionId) {
      console.error('No sessionId available');
      return;
    }

    // Optimistically add user's message
    const userMessage: Message = {
      _id: uuidv4(),
      content,
      role: 'user',
      userId: user._id ?? '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, sessionId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error('Failed to send message:', errData.message || res.statusText);
        setIsTyping(false);
        return;
      }

      const data = await res.json();

      if (data.history) {
        const decryptedHistory = data.history.map((msg: Message) => ({
          ...msg,
          content: msg.encrypted ? decryptMessage(msg.content) : msg.content,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(decryptedHistory);
      } else if (data.reply) {
        const botMessage: Message = {
          _id: uuidv4(),
          content: data.reply,
          role: 'assistant',
          userId: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader userFirstName={user.firstname} userLastName={user.lastname} />

      <div className="flex-1 relative">
        {messages.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to HealthBot AI</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              I&apos;m here to help answer your health-related questions and provide general medical information.
              Feel free to ask me anything about symptoms, conditions, or wellness tips!
            </p>
          </div>
        )}

        <div className="flex flex-col space-y-4 p-4 overflow-y-auto h-full">
          {messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};
