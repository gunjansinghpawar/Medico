'use client';

import React from 'react';
import { Menu, Bot, LogIn, User } from 'lucide-react';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';

interface ChatHeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  setIsSidebarOpen,
  onBack,
  showBackButton = false,
}) => {
  const { user, isLoggedIn } = useAuth();

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-border transition-colors bg-background/85 text-foreground"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Sidebar Toggle or Back Button + Branding */}
        <div className="flex items-center space-x-4 min-w-0">
          {/* Sidebar Toggle (Mobile) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Optional Back Button */}
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Go back"
              type="button"
            >
              {/* Use lucide-react ArrowLeft icon if needed */}
              {/* <ArrowLeft className="w-6 h-6" /> */}
              {/* Placeholder: can replace with proper icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Branding - Hidden on mobile */}
          <div className="hidden sm:flex items-center space-x-3 group min-w-0">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md flex-shrink-0">
              <Bot className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="truncate">
              <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
                Medico
                <span className="text-sm ml-1 text-muted-foreground font-medium">AI</span>
              </h1>
              <p className="text-xs text-muted-foreground font-medium leading-none truncate">
                Health Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Right: Status & Login */}
        <div className="flex items-center space-x-4 min-w-0">
          <ThemeToggleSwitch />

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 border-2 rounded-full text-sm font-semibold text-foreground hover:text-white hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-max truncate"
              aria-label="User Profile"
            >
              <User className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline truncate">{user?.firstname || 'User'}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition shadow-sm space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Login"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
