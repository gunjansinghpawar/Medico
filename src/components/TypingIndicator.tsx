import React from 'react';
import { Heart } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
        <Heart size={16} className="text-white" />
      </div>
      
      <div className="bg-gray-700 rounded-2xl px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="text-gray-400 text-sm">HealthBot typing</div>
          <div className="flex space-x-1 ml-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;