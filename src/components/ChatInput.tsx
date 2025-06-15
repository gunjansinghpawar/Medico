'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = () => {
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        setIsTyping(true);

        // Simulate sending message
        console.log("Sending message:", inputText);

        setTimeout(() => {
            setInputText('');
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className=" bg-background text-foreground backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}
                className="flex items-center space-x-4"
            >
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your concern..."
                    className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 bg-transparent text-[rgb(var(--foreground))] placeholder-gray-500 dark:placeholder-gray-400 text-base focus:outline transition-all duration-300"
                    disabled={isTyping}
                />
                <button
                    type="submit"
                    disabled={!inputText.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
