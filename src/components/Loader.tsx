import React from 'react';
import { Stethoscope } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const containerSizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-6">
      <div className="flex items-center space-x-3 group">
        <div className={`bg-gradient-to-r from-blue-600 to-green-600 ${containerSizes[size]} rounded-xl shadow-md animate-pulse`}>
          <Stethoscope className={`${sizeClasses[size]} text-white animate-bounce`} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:animate-pulse transition">
            Medico
            <span className="text-base ml-1 text-gray-500 font-medium">
              AI
            </span>
          </h1>
          <p className="text-sm text-gray-500 font-medium leading-none">
            Medical Healthbot
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;