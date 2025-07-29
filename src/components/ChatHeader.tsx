import React from 'react';
import { Heart, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface ChatHeaderProps {
  userEmail: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ userEmail }) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">HealthBot AI</h1>
            <p className="text-sm text-gray-600">Online • Ready to help</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-right mr-3">
            <p className="text-sm font-medium text-gray-900">Welcome!</p>
            <p className="text-xs text-gray-600">{userEmail}</p>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleSignOut}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};