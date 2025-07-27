'use client';

import React, { useMemo, useCallback } from 'react';
import {
  Plus,
  MessageSquare,
  Trash2,
  X,
  Stethoscope,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  chatHistory: ChatHistoryItem[];
  currentChatId: string | null;
  createNewChat: () => void;
  loadChat: (id: string) => void;
  deleteChat: (id: string, e: React.MouseEvent) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapse: boolean) => void;
}

interface SidebarContentProps
  extends Omit<ChatSidebarProps, 'isSidebarOpen'> {
  sidebarWidth: number;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  setIsSidebarOpen,
  chatHistory,
  currentChatId,
  createNewChat,
  loadChat,
  deleteChat,
}) => {
  const toggleCollapse = useCallback(() => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }, [isSidebarCollapsed, setIsSidebarCollapsed]);

  return (
    <div className="flex flex-col h-full relative bg-background text-foreground">
      {/* Collapse toggle (large screens only) */}
      <button
        type="button"
        onClick={toggleCollapse}
        aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        className="hidden lg:flex absolute top-4 right-[-16px] bg-gradient-to-r from-blue-600 to-green-600 text-white border border-border rounded-full p-1 shadow z-50 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Menu className="w-4 h-4" />
      </button>

      {isSidebarCollapsed ? (
        // Collapsed sidebar UI
        <div className="flex flex-col items-center mt-6 space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="p-4 border-b border-border bg-background flex flex-col gap-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold select-none">Chats</h2>
              </div>

              {/* Close sidebar button (mobile only) */}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close Sidebar"
                className="lg:hidden p-2 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white shadow hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={createNewChat}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-colors flex items-center justify-center space-x-2 select-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Create New Chat"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New Chat</span>
            </button>
          </header>

          {/* Chat History */}
          <nav
            aria-label="Chat History"
            className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-blue-500 scrollbar-track-transparent"
          >
            {chatHistory.length === 0 ? (
              <p className="text-xl text-center border border-border py-5 rounded-2xl text-muted-foreground animate-pulse select-none">
                No chats yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {chatHistory.map((chat) => {
                  const isActive = currentChatId === chat.id;
                  return (
                    <li key={chat.id}>
                      <button
                        type="button"
                        onClick={() => loadChat(chat.id)}
                        className={`group w-full p-3 rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-start
                          ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                              : 'hover:bg-muted text-foreground'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center space-x-2 mb-1">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium truncate">
                              {chat.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {chat.lastMessage}
                          </p>
                          <time
                            className="text-xs text-muted-foreground mt-1 block"
                            dateTime={chat.timestamp.toISOString()}
                            title={chat.timestamp.toLocaleString()}
                          >
                            {chat.timestamp.toLocaleString(undefined, {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </time>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteChat(chat.id, e);
                          }}
                          aria-label={`Delete chat ${chat.title}`}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-opacity duration-200 ml-3 self-start focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </>
      )}
    </div>
  );
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  chatHistory,
  currentChatId,
  createNewChat,
  loadChat,
  deleteChat,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
}) => {
  const sidebarWidth = useMemo(() => (isSidebarCollapsed ? 80 : 320), [
    isSidebarCollapsed,
  ]);

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-background/30 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Animated Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 block lg:hidden border-r border-border shadow-xl backdrop-blur-md focus:outline-none"
            style={{
              width: sidebarWidth,
              background: 'rgb(var(--background) / 0.95)',
              color: 'rgb(var(--foreground))',
            }}
            aria-label="Chat sidebar"
          >
            <SidebarContent
              sidebarWidth={sidebarWidth}
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
              setIsSidebarOpen={setIsSidebarOpen}
              chatHistory={chatHistory}
              currentChatId={currentChatId}
              createNewChat={createNewChat}
              loadChat={loadChat}
              deleteChat={deleteChat}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Static Sidebar */}
      <aside
        className="hidden lg:block fixed inset-y-0 left-0 z-50 border-r border-border shadow-xl backdrop-blur-md focus:outline-none"
        style={{
          width: sidebarWidth,
          background: 'rgb(var(--background) / 0.95)',
          color: 'rgb(var(--foreground))',
          transition: 'width 0.5s ease-in-out',
        }}
        aria-label="Chat sidebar"
      >
        <SidebarContent
          sidebarWidth={sidebarWidth}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          setIsSidebarOpen={setIsSidebarOpen}
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          createNewChat={createNewChat}
          loadChat={loadChat}
          deleteChat={deleteChat}
        />
      </aside>
    </>
  );
};

export default ChatSidebar;
