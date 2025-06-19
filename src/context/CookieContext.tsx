'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface for cookie preferences
interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
}

// Context type definition
interface CookieContextType {
    preferences: CookiePreferences;
    updatePreferences: (prefs: Partial<CookiePreferences>) => void;
    hasConsented: boolean;
    showBanner: boolean;
    acceptAll: () => void;
    rejectAll: () => void;
    hideBanner: () => void;
    forceSettings: boolean;
    openPreferences: () => void;
    showSettings: boolean;
    setShowSettings: (value: boolean) => void;
}

// Create context
const CookieContext = createContext<CookieContextType | undefined>(undefined);

// Provider Component
export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
    });

    const [hasConsented, setHasConsented] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [forceSettings, setForceSettings] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Load stored preferences on mount
    useEffect(() => {
        const storedPrefs = localStorage.getItem('cookiePreferences');
        const consentGiven = localStorage.getItem('cookieConsent');

        if (storedPrefs && consentGiven) {
            try {
                const parsedPrefs: CookiePreferences = JSON.parse(storedPrefs);
                setPreferences(parsedPrefs);
                setHasConsented(true);
            } catch (e) {
                console.error("Invalid cookiePreferences in localStorage", e);
                localStorage.removeItem('cookiePreferences');
                localStorage.removeItem('cookieConsent');
                setShowBanner(true);
            }
        } else {
            setShowBanner(true);
        }
    }, []);

    // Sync forceSettings with showSettings
    useEffect(() => {
        if (forceSettings) {
            setShowSettings(true);
        }
    }, [forceSettings]);

    // Update preferences
    const updatePreferences = (prefs: Partial<CookiePreferences>) => {
        const newPrefs = { ...preferences, ...prefs };
        setPreferences(newPrefs);
        localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));
        localStorage.setItem('cookieConsent', 'true');
        setHasConsented(true);
    };

    // Open preferences settings
    const openPreferences = () => {
        setForceSettings(true);
        setShowBanner(true);
    };

    // Accept all cookies
    const acceptAll = () => {
        const allPrefs: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
        };
        updatePreferences(allPrefs);
        setShowBanner(false);
        setShowSettings(false);
    };

    // Reject all except necessary
    const rejectAll = () => {
        const minimalPrefs: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            functional: false,
        };
        updatePreferences(minimalPrefs);
        setShowBanner(false);
        setShowSettings(false);
    };

    // Hide banner
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
                forceSettings,
                openPreferences,
                showSettings,
                setShowSettings,
            }}
        >
            {children}
        </CookieContext.Provider>
    );
};

// Custom hook
export const useCookies = () => {
    const context = useContext(CookieContext);
    if (context === undefined) {
        throw new Error('useCookies must be used within a CookieProvider');
    }
    return context;
};
