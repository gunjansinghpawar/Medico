'use client';
import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/lib/api';
import { decryptMessage } from '../lib/encryption';
import { Message,User } from '../types';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    loadMessages();
  }, [user]);

  const loadMessages = async () => {
    try {
      const response = await apiClient.getMessages();
      if (response.success && response.messages) {
        const decryptedMessages = response.messages.map((msg: Message) => ({
          ...msg,
          content: msg.encrypted ? decryptMessage(msg.content) : msg.content,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(decryptedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const getChatResponse = async (userMessage: string) => {
    try {
      const response = await apiClient.getChatResponse(userMessage);
      return response.success ? response.response : "I'm having trouble processing your request right now.";
    } catch (error) {
      console.error('Error calling health bot:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again later or consult with a healthcare professional for immediate concerns.";
    }
  };

  const handleSendMessage = async (content: string) => {
    // Add user message to UI immediately
    const userMessage: Message = {
      _id: uuidv4(),
      content,
      role: 'user',
      userId: user._id,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Save encrypted user message to database
    try {
      await apiClient.sendMessage(content);
    } catch (error) {
      console.error('Failed to save user message:', error);
    }

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await getChatResponse(content);

      // Add AI message to UI
      const aiMessage: Message = {
        _id: uuidv4(),
        content: aiResponse,
        role: 'assistant',
        userId: user._id,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Save encrypted AI message to database
      try {
        await apiClient.sendMessage(aiResponse);
      } catch (error) {
        console.error('Failed to save AI message:', error);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader userEmail={user.email} />
      
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
        
        {messages.map((message:Message) => (
          <MessageBubble key={message._id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};