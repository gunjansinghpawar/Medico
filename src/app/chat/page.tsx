'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import ChatInput from '@/components/ChatInput';
// import EmergencyBanner from '@/components/EmergencyBanner';
// import IsTyping from '@/components/IsTyping';
import ChatHeader from '@/components/ChatHeader';
import ChatSidebar from '@/components/ChatSidebar';
import ChatMessagesContainer from '@/components/ChatMessagesContainer'; // New component

const ChatPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    type ChatHistoryItem = {
        id: string;
        title: string;
        lastMessage: string;
        timestamp: Date;
    };
    type Message = {
        id: string;
        text: string;
        sender: 'user' | 'bot';
        timestamp: Date;
    };
    const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
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
        // TODO: Load messages for selected chat from backend/store
        setMessages([]); // Placeholder
    };

    const deleteChat = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setChatHistory(chatHistory.filter(chat => chat.id !== id));
        if (currentChatId === id) setCurrentChatId(null);
    };

    const handleSuggestionClick = (text: string) => {
        const newMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMsg]);
    };

    const handleSend = (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate bot reply
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

    return (
        <div className="max-h-screen min-h-[100vh] bg-background text-foreground flex">
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

                <ChatMessagesContainer
                    messages={messages}
                    onSuggestionClick={handleSuggestionClick}
                    isTyping={isTyping}
                />
                {/* <EmergencyBanner /> */}
                <ChatInput onSend={handleSend} />
            </div>

            {/* Mobile overlay */}
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
