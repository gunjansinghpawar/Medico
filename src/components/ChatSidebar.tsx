'use client';

import React from 'react';
import {
  Plus,
  MessageSquare,
  Trash2,
  X,
  Stethoscope,
  Menu,
} from 'lucide-react';

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
  const sidebarWidth = isSidebarCollapsed ? 'w-[80px]' : 'w-80';
  const collapseTransition = 'transition-all duration-500 ease-in-out';

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-background/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50
          ${sidebarWidth}
          border-r border-border
          shadow-xl backdrop-blur-md
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapseTransition}
        `}
        style={{
          background: 'rgb(var(--background) / 0.95)',
          color: 'rgb(var(--foreground))',
        }}
      >
        <div className="flex flex-col h-full relative">
          {/* Collapse toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex absolute top-4 right-[-16px] bg-gradient-to-r from-blue-600 to-green-600 text-white border border-border rounded-full p-1 shadow z-50"
            title="Collapse Sidebar"
          >
            <Menu className="w-4 h-4 text-white" />
          </button>

          {isSidebarCollapsed ? (
            <div className="flex flex-col items-center mt-6 space-y-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b border-border bg-background text-foreground relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                      <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white shadow"
                    title="Close Sidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={createNewChat}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Chat</span>
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {chatHistory.length === 0 ? (
                    <p className="text-xl text-center border-1 py-5 rounded-2xl text-muted-foreground animate-pulse fade-in">
                      No chats yet.
                    </p>
                  ) : (
                    chatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => loadChat(chat.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all border-1 duration-200 group ${
                          currentChatId === chat.id
                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              <h3 className="text-sm font-medium truncate">
                                {chat.title}
                              </h3>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {chat.lastMessage}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {chat.timestamp.toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id, e);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-all duration-200"
                            title="Delete Chat"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
