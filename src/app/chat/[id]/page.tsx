'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { ChatContainer } from '@/components/ChatContainer';
import { User } from '@/types';

export default function ChatSessionPage() {
  const params = useParams();
  const sessionId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { user, loading } = useAuth();

  // Sync sessionId into localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionId) {
      localStorage.setItem('chat_session_id', sessionId);
    }
  }, [sessionId]);

  if (loading || !user || !sessionId) {
    return <div>Loading...</div>;
  }

  return <ChatContainer user={user as User} sessionId={sessionId} />;
}
