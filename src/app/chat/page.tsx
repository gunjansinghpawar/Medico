'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import ChatInput from '@/components/ChatInput';
import ChatHeader from '@/components/ChatHeader';
import ChatSidebar from '@/components/ChatSidebar';
import ChatMessagesContainer from '@/components/ChatMessagesContainer';

import {
  Message,
  ChatHistoryItem,
  loadChatHistory,
  saveChatHistory,
  loadMessages,
  saveMessages,
  saveCurrentChatId,
  loadCurrentChatId,
  deleteChatFromStorage,
} from '@/utils/chatHelpers';

const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const history = loadChatHistory();
    setChatHistory(history);

    const savedId = loadCurrentChatId();
    if (savedId) {
      setCurrentChatId(savedId);
      const msgs = loadMessages(savedId);
      setMessages(msgs);
    }
  }, []);

  useEffect(() => {
    saveChatHistory(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    if (currentChatId) {
      saveCurrentChatId(currentChatId);
    }
  }, [currentChatId]);

  useEffect(() => {
    if (currentChatId) {
      saveMessages(currentChatId, messages);
    }
  }, [messages, currentChatId]);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat: ChatHistoryItem = {
      id: newId,
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
    };
    setChatHistory([newChat, ...chatHistory]);
    setMessages([]);
    setCurrentChatId(newId);
    saveMessages(newId, []);
  };

  const loadChat = (id: string) => {
    setCurrentChatId(id);
    const msgs = loadMessages(id);
    setMessages(msgs);
  };

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const updatedHistory = chatHistory.filter(chat => chat.id !== id);
    setChatHistory(updatedHistory);
    deleteChatFromStorage(id);

    if (currentChatId === id) {
      localStorage.removeItem('currentChatId');

      if (updatedHistory.length > 0) {
        const nextChat = updatedHistory[0];
        setCurrentChatId(nextChat.id);
        const msgs = loadMessages(nextChat.id);
        setMessages(msgs);
      } else {
        setCurrentChatId(null);
        setMessages([]);
      }
    }
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

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    // ✅ Update chat title if it's the first user message
    if (currentChatId && messages.length === 0) {
      setChatHistory(prev =>
        prev.map(chat =>
          chat.id === currentChatId && chat.title === 'New Chat'
            ? {
              ...chat,
              title: text.length > 30 ? text.slice(0, 30) + '...' : text,
            }
            : chat
        )
      );
    }

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now().toString() + '_bot',
        text: 'Thanks for your message. We’ll get back shortly.',
        sender: 'bot',
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);
      setIsTyping(false);

      // ✅ Update last message in sidebar
      if (currentChatId) {
        const last = finalMessages[finalMessages.length - 1];
        setChatHistory(prev =>
          prev.map(chat =>
            chat.id === currentChatId
              ? {
                ...chat,
                lastMessage: `${last.sender === 'user' ? 'You' : 'Bot'}: ${last.text}`,
                timestamp: new Date(),
              }
              : chat
          )
        );
      }
    }, 1500);
  };


  return (
    <div className="max-h-screen min-h-[100dvh] bg-background text-foreground flex">
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

        <ChatInput onSend={handleSend} />
      </div>

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
