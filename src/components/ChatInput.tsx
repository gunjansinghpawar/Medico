'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    const message = inputText.trim();
    if (!message || isTyping) return;
    setIsTyping(true);
    onSend(message);
    setInputText('');
    setTimeout(() => setIsTyping(false), 300);
  };

  return (
    <div className="sticky bottom-0 left-0 z-30 w-full bg-background/90 backdrop-blur-md border-t border-border p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-4"
        aria-label="Chat message input"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your concern..."
          className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 bg-transparent text-[rgb(var(--foreground))] placeholder-gray-500 dark:placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          disabled={isTyping}
          aria-label="Chat message input"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
