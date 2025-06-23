'use client';

import React from 'react';
import {
    Menu,
    Bot,
    LogIn,
    // ArrowLeft
} from 'lucide-react';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { User } from "lucide-react"; // you can replace it with an avatar/image


interface ChatHeaderProps {
    setIsSidebarOpen: (open: boolean) => void;
    onBack?: () => void;
    showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    setIsSidebarOpen,
    //   onBack,
    //   showBackButton,
}) => {
    const { user, isLoggedIn } = useAuth();
    return (
        <header
            role="banner"
            className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-border transition-all"
            style={{
                background: 'rgb(var(--background) / 0.85)',
                color: 'rgb(var(--foreground))',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Left: Sidebar Toggle or Back Button + Branding */}
                <div className="flex items-center space-x-4">
                    {/* Sidebar Toggle (Mobile) */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full transition-colors lg:hidden"
                        aria-label="Open sidebar"
                    >
                        <Menu className="w-6 h-6 text-white" />
                    </button>

                    {/* Optional Back Button */}
                    {/* {showBackButton && (
            <button
              onClick={onBack}
              className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )} */}

                    {/* Branding */}
                    {/* Branding - Hidden on mobile */}
                    <div className="hidden sm:flex items-center space-x-3 group">
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
                {/* Right: Status & Login */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <ThemeToggleSwitch />
                    </div>
                    {isLoggedIn ? (
                        <Link
                            href={`/profile`}
                            className="flex items-center gap-2 px-4 py-2  border-2 rounded-full text-sm font-semibold text-foreground hover:text-white hover:bg-black transition"
                        >
                            <User className="w-5 h-5" />
                            <span className="hidden sm:inline">{user?.firstname}</span>
                        </Link>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 transition shadow-sm flex items-center space-x-2"
                            >
                                <LogIn className="w-4 h-4" />
                                <span className="hidden sm:inline">Login</span>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </header >
    );
};

export default ChatHeader;
