'use client'
import React from 'react';
import { useAuth } from '@/context/auth-context';
import { ChatContainer } from '@/components/ChatContainer';
import { User } from '@/types';

function Page() {
  const { user } = useAuth();
  if (!user) {
    return <div>Loading...</div>;
  }
  const userData: User = user;
  return <ChatContainer user={userData} />;
}

export default Page;