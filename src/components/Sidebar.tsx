'use client';

import React, { useState } from 'react';
import {
  History,
  Settings,
  LogOut,
  User,
  Plus,
  Trash2,
  Stethoscope,
} from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

interface SidebarProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const {
    sessions,
    currentSession,
    loadSession,
    createNewSession,
    deleteSession,
  } = useChat();
  const { user, logout, isAuthenticated } = useAuth();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMM dd');
  };

  const handleDeleteSession = async (
    sessionId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!isAuthenticated) return;

    setIsDeleting(sessionId);
    try {
      await deleteSession(sessionId);
    } catch (error) {
      console.error('Failed to delete session:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  // Collapsed sidebar (icon-only)
  if (!isOpen) {
    return (
      <div className="w-20 bg-background border-r border-border flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => onToggle(true)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent transition">
              Medico
              <span className="text-base ml-1 text-muted-foreground font-medium">
                AI
              </span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium leading-none">
              Medical Healthbot
            </p>
          </div>
          <button
            onClick={() => onToggle(false)}
            className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {/* New Chat Button */}
      <button
        onClick={createNewSession}
        className="w-full flex items-center space-x-2 p-3 bg-muted hover:bg-accent rounded-lg transition-colors"
      >
        <Plus size={16} />
        <span>New Chat</span>
      </button>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {isAuthenticated ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <History size={16} />
              <span>Chat History</span>
            </div>

            {Object.keys(sessions).length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No chat history yet.
                <br />
                Start a conversation!
              </p>
            ) : (
              Object.entries(sessions).map(([date, dateSessions]) => (
                <div key={date} className="space-y-2">
                  <h3 className="text-xs text-muted-foreground font-medium">
                    {formatDate(new Date(date))}
                  </h3>

                  {dateSessions.map((session) => (
                    <div
                      key={session._id}
                      onClick={() => loadSession(session.sessionId)}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors group ${
                        currentSession?.sessionId === session.sessionId
                          ? 'bg-accent'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.messageCount || 0} messages
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleDeleteSession(session.sessionId, e)}
                        disabled={isDeleting === session.sessionId}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded transition-all text-white"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm mb-4">
              Login करें to save your chat history
            </p>
            <button className="text-primary hover:opacity-80 text-sm font-medium">
              Login / Register
            </button>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <User size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1 p-2 text-xs bg-muted hover:bg-accent rounded transition-colors">
                <Settings size={12} />
                <span>Settings</span>
              </button>

              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center space-x-1 p-2 text-xs bg-red-600 hover:bg-red-500 rounded transition-colors text-white"
              >
                <LogOut size={12} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">Guest Mode</p>
            <p className="text-xs text-muted-foreground">
              Messages won&apos;t be saved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
