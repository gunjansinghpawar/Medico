'use client';

import React from 'react';
import { Stethoscope } from 'lucide-react';
import ThemeToggleSwitch from './ThemeToggleSwitch';

const AuthHeader = () => {
    return (
        <header className="w-full px-4 py-3 md:px-8 md:py-4 bg-background text-foreground border-b border-border shadow-md transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo + Brand */}
                <div className="flex items-center space-x-3 group">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
                        <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
                            Medico
                            <span className="text-base ml-1 text-muted-foreground font-medium">
                                AI
                            </span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium leading-none">
                            Medical Healthbot
                        </p>
                    </div>
                </div>
                {/* Theme Switch */}
                <div className="flex-shrink-0">
                    <ThemeToggleSwitch />
                </div>
            </div>
        </header>
    );
};

export default AuthHeader;
