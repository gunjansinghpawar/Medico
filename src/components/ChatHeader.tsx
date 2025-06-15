'use client';

import React from 'react';
import { Menu, Bot, LogIn, ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
    setIsSidebarOpen: (open: boolean) => void;
    onBack?: () => void; // Optional back action
    showBackButton?: boolean; // Toggle back button visibility
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setIsSidebarOpen, onBack, showBackButton }) => {
    return (
        <header
            className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-border transition-all"
            style={{
                background: 'rgb(var(--background) / 0.85)',
                color: 'rgb(var(--foreground))',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Left: Back Arrow or Sidebar Toggle + Branding */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full transition-colors lg:hidden"
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-6 h-6 text-muted-foreground" />
                    </button>
                    {showBackButton && (
                        <button
                            onClick={onBack}
                            className="p-2 bg-gradient-to-r cursor-pointer from-blue-600 to-green-600 text-white rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    )}
                    {/* Branding */}
                    <div className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
                            <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
                                Medico<span className="text-sm ml-1 text-muted-foreground font-medium">AI</span>
                            </h1>
                            <p className="text-xs text-muted-foreground font-medium leading-none">
                                Health Assistant
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Theme Toggle, Online Status, Login */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Online</span>
                    </div>

                    <a
                        href="/login"
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition shadow-sm flex items-center space-x-2"
                    >
                        <LogIn className="w-4 h-4" />
                        <span className="hidden sm:inline">Login</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default ChatHeader;
