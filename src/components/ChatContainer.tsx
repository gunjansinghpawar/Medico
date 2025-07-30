'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/lib/api';
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
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState<string>(() => {
    return typeof window !== 'undefined'
      ? localStorage.getItem('chat_session_id') || uuidv4()
      : uuidv4();
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chat_session_id', sessionId);
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const loadMessages = React.useCallback(async () => {
    try {
      const response = await apiClient.getMessages(sessionId);
      if (response.messages) {
        const decryptedMessages = response.messages.map((msg: Message) => ({
          ...msg,
          content: msg.encrypted ? decryptMessage(msg.content) : msg.content,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(decryptedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    loadMessages();
  }, [sessionId, loadMessages]);

  const getChatResponse = async (userMessage: string) => {
    try {
      const response = await apiClient.getChatResponse(userMessage, sessionId);
      return response.reply || 'Sorry, I had trouble processing your request.';
    } catch (error) {
      console.error('Error calling health bot:', error);
      return 'I apologize, but I’m having trouble processing your request. Try again later.';
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      _id: uuidv4(),
      content,
      role: 'user',
      userId: user._id ?? '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Save user message to DB
    try {
      await apiClient.sendMessage(content, 'user', sessionId);
    } catch (error) {
      console.error('Failed to save user message:', error);
    }

    setIsTyping(true);

    try {
      const aiReply = await getChatResponse(content);

      const botMessage: Message = {
        _id: uuidv4(),
        content: aiReply,
        role: 'assistant',
        userId: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      try {
        await apiClient.sendMessage(aiReply, 'bot', sessionId);
      } catch (error) {
        console.error('Failed to save bot message:', error);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader userFirstName={user.firstname} userLastName={user.lastname} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to HealthBot AI</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              I&apos;m here to help answer your health-related questions and provide general medical information.
              Feel free to ask me anything about symptoms, conditions, or wellness tips!
            </p>
          </div>
        )}

        {messages.map((message: Message) => (
          <MessageBubble key={message._id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};
