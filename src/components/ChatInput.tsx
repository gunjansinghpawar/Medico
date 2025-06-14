"use client";

import React, { useState, FormEvent } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";

const ChatInput: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log("User Query:", query); // TODO: Replace with chat logic
    setQuery("");
  };

  return (
    <>
      {/* Chat Input Fixed Bottom */}
      <div className="fixed bottom-15 left-0 right-0 bg-background/95 backdrop-blur-md border border-[rgb(var(--border))] mx-auto max-w-4xl rounded-2xl px-4 py-3 shadow-2xl z-50">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Apne health concern batayiye... (e.g., mujhe bukhar hai, headache ho raha hai)"
              aria-label="Health concern input"
              className="w-full px-6 py-3 rounded-2xl border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-muted-foreground bg-background text-foreground shadow"
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
    </>
  );
};

export default ChatInput;
