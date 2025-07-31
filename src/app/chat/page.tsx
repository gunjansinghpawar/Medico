'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('chat_session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID(); // modern UUID generation
        localStorage.setItem('chat_session_id', sessionId);
      }
      router.replace(`/chat/${sessionId}`);
    }
  }, [router]);

  return <div>Loading your chat session...</div>;
}
