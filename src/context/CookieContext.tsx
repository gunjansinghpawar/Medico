'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  hasConsented: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  hideBanner: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookiePreferences');
    const consent = localStorage.getItem('cookieConsent');
    
    if (stored && consent) {
      setPreferences(JSON.parse(stored));
      setHasConsented(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const updatePreferences = (prefs: Partial<CookiePreferences>) => {
    const newPrefs = { ...preferences, ...prefs };
    setPreferences(newPrefs);
    localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
    localStorage.setItem('cookieConsent', 'true');
    setHasConsented(true);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    updatePreferences(allAccepted);
    setShowBanner(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    updatePreferences(onlyNecessary);
    setShowBanner(false);
  };

  const hideBanner = () => {
    setShowBanner(false);
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        updatePreferences,
        hasConsented,
        showBanner,
        acceptAll,
        rejectAll,
        hideBanner,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
};