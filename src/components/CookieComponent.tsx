'use client';
import React, { useState } from 'react';
import { Cookie, Settings, X, Check } from 'lucide-react';
import { useCookies } from '@/context/CookieContext';

const CookieConsent: React.FC = () => {
  const { showBanner, acceptAll, rejectAll, hideBanner, preferences, updatePreferences } = useCookies();
  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(preferences);

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    updatePreferences(tempPreferences);
    setShowSettings(false);
    hideBanner();
  };

  const togglePreference = (key: keyof typeof tempPreferences) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    setTempPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      {!showSettings ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-start space-x-3">
              <Cookie className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">We use cookies</h3>
                <p className="text-sm text-gray-600 mt-1">
                  We use cookies to enhance your experience, analyze site traffic, and provide personalized content. 
                  Your medical data is always protected under HIPAA compliance.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Cookie Preferences</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Necessary Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Help us understand how visitors interact with our website.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempPreferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Used to track visitors and display relevant ads and content.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempPreferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Functional Cookies</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Enable enhanced functionality and personalization features.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempPreferences.functional}
                    onChange={() => togglePreference('functional')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;