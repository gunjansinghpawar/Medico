import React from 'react';
import { Bot } from 'lucide-react'; // Ensure this is installed

function IsTyping() {
    return (
        <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl rounded-tl-md p-4 shadow-lg border border-white/20 dark:border-gray-700">
                <div className="flex space-x-2">
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
            </div>
        </div>
    );
}

export default IsTyping;
