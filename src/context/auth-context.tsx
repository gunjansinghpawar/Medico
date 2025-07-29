'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface UserType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  // add other fields as needed
}

interface AuthContextType {
  user: UserType | null;
  isLoggedIn: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<{ user: UserType }>('/api/auth/me');
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // signOut method to call API and unset user
  const signOut = useCallback(async () => {
    try {
      await axios.post('/api/signout');
      setUser(null);
    } catch (error) {
      console.error('Failed to sign out:', error);
      // Optionally handle error or notify user
    }
  }, []);

  const value = {
    user,
    isLoggedIn: Boolean(user),
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
