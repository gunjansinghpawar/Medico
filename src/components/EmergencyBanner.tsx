import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react'; // Make sure you have lucide-react installed

const EmergencyBanner = () => {
    return (
        <div className="bg-red-50 dark:bg-red-900 border-t border-red-200 dark:border-red-700 p-3">
            <div className="flex items-center justify-center space-x-2 text-red-700 dark:text-red-200">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-medium">
                    Emergency? Call 102 (Ambulance) or visit nearest hospital immediately
                </span>
                <Phone className="w-4 h-4" />
            </div>
        </div>
    );
};

export default EmergencyBanner;
