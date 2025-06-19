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
    if (key === 'necessary') return;
    setTempPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t shadow-lg bg-[rgb(var(--background))] border-[rgb(var(--border))] text-[rgb(var(--foreground))] transition-colors fade-in">
      {!showSettings ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-start space-x-3">
              <Cookie className="h-6 w-6 text-[rgb(var(--accent))] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold">We use cookies</h3>
                <p className="text-sm mt-1 text-[rgb(var(--muted-foreground))]">
                  We use cookies to enhance your experience, analyze site traffic, and provide personalized content. 
                  Your medical data is always protected under HIPAA compliance.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium border rounded-md transition-colors border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]"
              >
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium border rounded-md transition-colors border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors bg-[rgb(var(--primary))] hover:bg-opacity-90"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-lg bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Cookie Preferences</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cookie types */}
            {[
              {
                key: 'necessary',
                title: 'Necessary Cookies',
                desc: 'Essential for the website to function properly. Cannot be disabled.',
                toggle: false
              },
              {
                key: 'analytics',
                title: 'Analytics Cookies',
                desc: 'Help us understand how visitors interact with our website.',
                toggle: true
              },
              {
                key: 'marketing',
                title: 'Marketing Cookies',
                desc: 'Used to track visitors and display relevant ads and content.',
                toggle: true
              },
              {
                key: 'functional',
                title: 'Functional Cookies',
                desc: 'Enable enhanced functionality and personalization features.',
                toggle: true
              }
            ].map(({ key, title, desc, toggle }) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-[rgb(var(--muted))]">
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="text-sm mt-1 text-[rgb(var(--muted-foreground))]">{desc}</p>
                </div>
                {toggle ? (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempPreferences[key as keyof typeof tempPreferences]}
                      onChange={() => togglePreference(key as keyof typeof tempPreferences)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--primary))]"></div>
                  </label>
                ) : (
                  <Check className="h-5 w-5 text-green-600" />
                )}
              </div>
            ))}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium border rounded-md transition-colors border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors bg-[rgb(var(--primary))] hover:bg-opacity-90"
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
