'use client';

import React, { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import IsTyping from './IsTyping';

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

    // Scroll to bottom when messages or typing state changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 pb-32 space-y-6 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-500 scrollbar-track-transparent">
            {messages.map((message) => {
                const isUser = message.sender === 'user';

                return (
                    <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'
                            }`}
                        role="listitem"
                        aria-live={isUser ? undefined : 'polite'}
                    >
                        {/* Avatar */}
                        {!isUser && (
                            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                                <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                            </div>
                        )}

                        {/* Message bubble and suggestions */}
                        <div className={`flex flex-col space-y-1 max-w-[90%]`}>
                            <div
                                className={`rounded-2xl p-4 shadow-md border w-fit whitespace-pre-wrap text-sm leading-relaxed
                  ${isUser
                                        ? 'bg-white/90 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700 rounded-tl-md ml-auto'
                                        : 'bg-white/90 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700 rounded-tr-md'
                                    }
                `}
                                tabIndex={0}
                            >
                                {message.text}

                                {message.suggestions && message.suggestions.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {message.suggestions.map((suggestion, i) => (
                                            <button
                                                key={i}
                                                onClick={() => onSuggestionClick(suggestion)}
                                                className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                type="button"
                                                aria-label={`Send suggestion: ${suggestion}`}
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Timestamp */}
                            <time
                                className={`text-xs text-gray-500 dark:text-gray-400 ${isUser ? 'self-end' : 'ml-2'
                                    }`}
                                dateTime={message.timestamp.toISOString()}
                                title={message.timestamp.toLocaleString()}
                            >
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </time>
                        </div>

                        {/* User avatar */}
                        {isUser && (
                            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                                <User className="w-5 h-5 text-white" aria-hidden="true" />
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Typing Indicator */}
            {isTyping && (
                <div className="flex items-start space-x-3" role="status" aria-live="polite" aria-label="Bot is typing">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" aria-hidden="true" />
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
