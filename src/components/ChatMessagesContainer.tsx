'use client';

import React, { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import IsTyping from './IsTyping'; // Make sure this path is correct

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatMessagesContainerProps {
  messages: Message[];
  onSuggestionClick: (text: string) => void;
  isTyping: boolean;
}

const ChatMessagesContainer: React.FC<ChatMessagesContainerProps> = ({
  messages,
  onSuggestionClick,
  isTyping,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start space-x-3">
          {message.sender === 'bot' ? (
            <>
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl rounded-tl-md p-4 shadow-md border border-gray-200 dark:border-gray-700 max-w-3xl">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 leading-relaxed">
                    {message.text}
                  </div>
                  {message.suggestions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => onSuggestionClick(s)}
                          className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-full text-sm transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1" />
              <div className="flex-1 max-w-2xl">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl rounded-tr-md p-4 shadow-md ml-auto">
                  <div className="whitespace-pre-wrap">{message.text}</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 mr-2 text-right">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full flex-shrink-0">
                <User className="w-5 h-5 text-gray-600 dark:text-white" />
              </div>
            </>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <IsTyping />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessagesContainer;
