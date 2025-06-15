'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import ChatInput from '@/components/ChatInput';
import EmergencyBanner from '@/components/EmergencyBanner';
import IsTyping from '@/components/IsTyping';
import ChatHeader from '@/components/ChatHeader';
import ChatSidebar from '@/components/ChatSidebar';
import { useRouter } from 'next/navigation';

const sampleMessages = [
    {
        id: '1',
        text: 'Hello! How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['Fever', 'Cold', 'Back pain'],
    },
    {
        id: '2',
        text: 'I have been having a headache since morning.',
        sender: 'user',
        timestamp: new Date(),
    },
];

const sampleHistory = [
    {
        id: 'a1',
        title: 'Fever consultation',
        lastMessage: 'Please drink plenty of fluids.',
        timestamp: new Date(),
    },
    {
        id: 'a2',
        title: 'Back pain tips',
        lastMessage: 'Try hot compression and rest.',
        timestamp: new Date(),
    },
];

const ChatPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [chatHistory, setChatHistory] = useState(sampleHistory);
    const [currentChatId, setCurrentChatId] = useState<string | null>('a1');
    const [messages, setMessages] = useState(sampleMessages);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const createNewChat = () => {
        const newId = Date.now().toString();
        const newChat = {
            id: newId,
            title: 'New Chat',
            lastMessage: '',
            timestamp: new Date(),
        };
        setChatHistory([newChat, ...chatHistory]);
        setMessages([]);
        setCurrentChatId(newId);
    };

    const loadChat = (id: string) => {
        setCurrentChatId(id);
        setMessages(sampleMessages); // Placeholder
    };

    const deleteChat = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setChatHistory(chatHistory.filter(chat => chat.id !== id));
        if (currentChatId === id) setCurrentChatId(null);
    };

    const handleSuggestionClick = (text: string) => {
        const newMsg = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMsg]);
    };

    const handleSend = (text: string) => {
        const newMsg = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMsg]);
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString() + '_bot',
                    text: 'Thanks for your message. We’ll get back shortly.',
                    sender: 'bot',
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);
        }, 1500);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <ChatSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                chatHistory={chatHistory}
                currentChatId={currentChatId}
                createNewChat={createNewChat}
                loadChat={loadChat}
                deleteChat={deleteChat}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
            />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <ChatHeader
                    setIsSidebarOpen={setIsSidebarOpen}
                    showBackButton={true}
                    onBack={() => router.push('/')}
                />

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                    {messages.map(message => (
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
                                                            onClick={() => handleSuggestionClick(s)}
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

                    {isTyping && <IsTyping />}
                    <div ref={messagesEndRef} />
                </div>

                <EmergencyBanner />
                <ChatInput onSend={handleSend} />
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default ChatPage;
