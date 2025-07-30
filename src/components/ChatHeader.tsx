import React from 'react';
import { LogOut, Settings, Stethoscope } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

interface ChatHeaderProps {
  userFirstName: string;
  userLastName: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ userFirstName,userLastName }) => {
  const { signOut } = useAuth(); 
  console.log( userFirstName ,userLastName)
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl shadow-md">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
              Medico
              <span className="text-base ml-1 text-muted-foreground font-medium">AI</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium leading-none">
              Medical Healthbot
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-right mr-3">
            <p className="text-sm font-medium text-gray-900">Welcome!</p>
            <p className="text-xs text-gray-600">{userFirstName} {userLastName}</p>
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