import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

interface ToasterContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToasterContext = React.createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = React.useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-green-500" />;
      case 'error': return <XCircle size={20} className="text-red-500" />;
      case 'warning': return <AlertCircle size={20} className="text-yellow-500" />;
      case 'info': return <Info size={20} className="text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      case 'warning': return 'bg-yellow-600';
      case 'info': return 'bg-blue-600';
    }
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getBackgroundColor(toast.type)} text-white p-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[320px] animate-slide-in`}
          >
            {getIcon(toast.type)}
            <p className="flex-1 text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
};