'use client';

import React, { useEffect, useReducer, useCallback } from 'react';
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

type State = {
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  chatHistory: ChatHistoryItem[];
  currentChatId: string | null;
  messages: Message[];
  isTyping: boolean;
};

type Action =
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'SET_SIDEBAR_COLLAPSED'; payload: boolean }
  | { type: 'SET_CHAT_HISTORY'; payload: ChatHistoryItem[] }
  | { type: 'SET_CURRENT_CHAT'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'ADD_CHAT'; payload: ChatHistoryItem }
  | { type: 'UPDATE_CHAT_TITLE'; payload: { id: string; title: string } }
  | { type: 'UPDATE_CHAT_LAST_MESSAGE'; payload: { id: string; lastMessage: string; timestamp: Date } }
  | { type: 'DELETE_CHAT'; payload: string };

const initialState: State = {
  isSidebarOpen: false,
  isSidebarCollapsed: false,
  chatHistory: [],
  currentChatId: null,
  messages: [],
  isTyping: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SIDEBAR_OPEN':
      return { ...state, isSidebarOpen: action.payload };
    case 'SET_SIDEBAR_COLLAPSED':
      return { ...state, isSidebarCollapsed: action.payload };
    case 'SET_CHAT_HISTORY':
      return { ...state, chatHistory: action.payload };
    case 'SET_CURRENT_CHAT':
      return { ...state, currentChatId: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'ADD_CHAT':
      return { ...state, chatHistory: [action.payload, ...state.chatHistory] };
    case 'UPDATE_CHAT_TITLE':
      return {
        ...state,
        chatHistory: state.chatHistory.map((chat) =>
          chat.id === action.payload.id
            ? { ...chat, title: action.payload.title }
            : chat
        ),
      };
    case 'UPDATE_CHAT_LAST_MESSAGE':
      return {
        ...state,
        chatHistory: state.chatHistory.map((chat) =>
          chat.id === action.payload.id
            ? {
                ...chat,
                lastMessage: action.payload.lastMessage,
                timestamp: action.payload.timestamp,
              }
            : chat
        ),
      };
    case 'DELETE_CHAT':
      return {
        ...state,
        chatHistory: state.chatHistory.filter((chat) => chat.id !== action.payload),
      };
    default:
      return state;
  }
}

const ChatPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // Load chat history and current chat on mount
  useEffect(() => {
    const history = loadChatHistory();
    dispatch({ type: 'SET_CHAT_HISTORY', payload: history });

    const savedId = loadCurrentChatId();
    if (savedId) {
      dispatch({ type: 'SET_CURRENT_CHAT', payload: savedId });
      const msgs = loadMessages(savedId);
      dispatch({ type: 'SET_MESSAGES', payload: msgs });
    }
  }, []);

  // Persist chat history
  useEffect(() => {
    saveChatHistory(state.chatHistory);
  }, [state.chatHistory]);

  // Persist current chat id
  useEffect(() => {
    if (state.currentChatId) {
      saveCurrentChatId(state.currentChatId);
    } else {
      localStorage.removeItem('currentChatId');
    }
  }, [state.currentChatId]);

  // Persist messages
  useEffect(() => {
    if (state.currentChatId) {
      saveMessages(state.currentChatId, state.messages);
    }
  }, [state.messages, state.currentChatId]);

  const createNewChat = useCallback(() => {
    const newId = Date.now().toString();
    const newChat: ChatHistoryItem = {
      id: newId,
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_CHAT', payload: newChat });
    dispatch({ type: 'SET_MESSAGES', payload: [] });
    dispatch({ type: 'SET_CURRENT_CHAT', payload: newId });
    saveMessages(newId, []);
  }, []);

  const loadChat = useCallback(
    (id: string) => {
      const msgs = loadMessages(id);
      dispatch({ type: 'SET_CURRENT_CHAT', payload: id });
      dispatch({ type: 'SET_MESSAGES', payload: msgs });
    },
    []
  );

  const deleteChat = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      deleteChatFromStorage(id);

      dispatch({ type: 'DELETE_CHAT', payload: id });

      // If deleted is current chat, select next or clear
      if (state.currentChatId === id) {
        const remainingChats = state.chatHistory.filter((chat) => chat.id !== id);
        if (remainingChats.length > 0) {
          const nextChat = remainingChats[0];
          dispatch({ type: 'SET_CURRENT_CHAT', payload: nextChat.id });
          dispatch({ type: 'SET_MESSAGES', payload: loadMessages(nextChat.id) });
        } else {
          dispatch({ type: 'SET_CURRENT_CHAT', payload: null });
          dispatch({ type: 'SET_MESSAGES', payload: [] });
        }
      }
    },
    [state.currentChatId, state.chatHistory]
  );

  const handleSuggestionClick = useCallback((text: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    dispatch({ type: 'SET_MESSAGES', payload: [...state.messages, newMsg] });
  }, [state.messages]);

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      const updatedMessages = [...state.messages, userMsg];
      dispatch({ type: 'SET_MESSAGES', payload: updatedMessages });
      dispatch({ type: 'SET_TYPING', payload: true });

      // Update title if default
      if (state.currentChatId && state.messages.length === 0) {
        const newTitle = text.length > 30 ? text.slice(0, 30) + '...' : text;
        dispatch({
          type: 'UPDATE_CHAT_TITLE',
          payload: { id: state.currentChatId, title: newTitle },
        });
      }

      setTimeout(() => {
        const botMsg: Message = {
          id: Date.now().toString() + '_bot',
          text: 'Thanks for your message. We’ll get back shortly.',
          sender: 'bot',
          timestamp: new Date(),
        };

        const finalMessages = [...updatedMessages, botMsg];
        dispatch({ type: 'SET_MESSAGES', payload: finalMessages });
        dispatch({ type: 'SET_TYPING', payload: false });

        if (state.currentChatId) {
          dispatch({
            type: 'UPDATE_CHAT_LAST_MESSAGE',
            payload: {
              id: state.currentChatId,
              lastMessage: `${botMsg.sender === 'user' ? 'You' : 'Bot'}: ${botMsg.text}`,
              timestamp: new Date(),
            },
          });
        }
      }, 1500);
    },
    [state.messages, state.currentChatId]
  );

  return (
    <div className="max-h-screen min-h-[100dvh] bg-background text-foreground flex overflow-hidden">
      <ChatSidebar
        isSidebarOpen={state.isSidebarOpen}
        setIsSidebarOpen={(open) => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open })}
        chatHistory={state.chatHistory}
        currentChatId={state.currentChatId}
        createNewChat={createNewChat}
        loadChat={loadChat}
        deleteChat={deleteChat}
        isSidebarCollapsed={state.isSidebarCollapsed}
        setIsSidebarCollapsed={(collapse) => dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: collapse })}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          setIsSidebarOpen={(open) => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open })}
          showBackButton={true}
          onBack={() => router.push('/')}
        />

        <ChatMessagesContainer
          messages={state.messages}
          onSuggestionClick={handleSuggestionClick}
          isTyping={state.isTyping}
        />

        <ChatInput onSend={handleSend} />
      </div>

      {/* Mobile backdrop */}
      {state.isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => dispatch({ type: 'SET_SIDEBAR_OPEN', payload: false })}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ChatPage;
