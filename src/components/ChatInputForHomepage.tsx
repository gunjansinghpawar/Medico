"use client";

import React, { useState, FormEvent } from "react";
import { MessageCircle, ChevronRight, SendHorizonal } from "lucide-react";

const ChatInputForHomepage: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("User Query:", query); // TODO: Replace with chat logic
    setQuery("");
  };

  return (
    <>
      {/* Desktop Input - visible on md and above */}
      <div className="hidden md:block fixed bottom-15 left-0 right-0 bg-background/95 backdrop-blur-md border border-[rgb(var(--border))] mx-auto max-w-4xl rounded-2xl px-4 py-3 shadow-2xl z-50">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your health issue... (e.g., I have a fever, experiencing a headache)"
              aria-label="Health concern input"
              className="w-full px-6 py-3 rounded-2xl border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500 dark:placeholder-gray-400 bg-background text-foreground shadow"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <MessageCircle className="w-5 h-5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={!query.trim()}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow flex items-center space-x-2"
          >
            <span>Chat Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Mobile Input - visible only below md */}
      <div className="block md:hidden fixed bottom-15 left-4 right-4 z-50">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-full px-4 py-2 shadow-lg space-x-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your concern..."
            className="flex-1 bg-transparent text-[rgb(var(--foreground))] placeholder-gray-500 dark:placeholder-gray-400 text-base focus:outline-none"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInputForHomepage;
