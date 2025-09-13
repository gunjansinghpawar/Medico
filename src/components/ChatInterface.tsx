import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Plus, Stethoscope, LogIn } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatInterfaceProps {
  onToggleSidebar: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onToggleSidebar }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentSession, sendMessage, createNewSession, isLoading } = useChat();
  const { isAuthenticated, user, setShowLoginModal } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');

    try {
      await sendMessage(message);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Failed to send message:', error);
      setInput(message); // Restore input if failed
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';

    return `${greeting}! Main HealthBot hun, aapka personal health assistant. Aap mujhse koi bhi health-related question पूछ सकते हैं. Kya main आपकी कैसे help कर सकता हूं?`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

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
        </div>

        {/* Right side: Login/Signup OR User + New Chat */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <span className="text-gray-300 text-sm font-medium">
              Hi, {user?.name || 'User'}
            </span>
            <button
              onClick={createNewSession}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:bg-green-600 rounded-lg transition-colors"
          >
            <LogIn size={16} />
            <span>Login / Signup</span>
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!currentSession?.messages?.length && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to{' '}
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
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">{getWelcomeMessage()}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              {[
                'मुझे सिरदर्द हो रहा है, क्या करूं?',
                'Healthy diet plan suggest करें',
                'Exercise routine के बारे में बताएं',
                'BP normal range क्या होता है?',
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700 hover:border-gray-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentSession?.messages?.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 bg-gray-700 rounded-lg border border-gray-600 focus-within:border-blue-600 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="अपना health question यहाँ type करें..."
              className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-pink-600 hover:bg-pink-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send size={20} className="text-white" />
          </button>
        </form>

        {!isAuthenticated && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Better experience के लिए login करें • Full chat history save होगा
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
