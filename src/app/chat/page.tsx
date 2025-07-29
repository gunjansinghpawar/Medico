import React from 'react';
import { useAuth } from '@/context/auth-context';
import { ChatContainer } from '@/components/ChatContainer';

function Page() {
  const { user } = useAuth();
  return <ChatContainer user={user} />;
}

export default Page;