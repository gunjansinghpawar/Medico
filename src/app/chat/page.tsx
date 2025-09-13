'use client';
import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import LoginModal from '@/components/LoginModal';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/Toaster';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { sessions, currentSession, loadChatHistory, loadSession } = useChat();
  const { isAuthenticated } = useAuth();

  // 🔹 On refresh or load → fetch last session
  useEffect(() => {
    const fetchLastSession = async () => {
      if (isAuthenticated) {
        await loadChatHistory();
        console.log("I m Working");
        console.log("Current Session",currentSession)
        // if no currentSession, pick the last active one
        if (!currentSession && sessions.length > 0) {
          const last = sessions.sort(
            (a, b) =>
              new Date(b.lastActivity).getTime() -
              new Date(a.lastActivity).getTime()
          )[0];
          if (last) {
            await loadSession(last.sessionId);
          }
        }
      }
    };

    fetchLastSession();
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <ChatInterface onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      <LoginModal />
      <Toaster />
    </div>
  );
}

export default Chat;
