import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface UserInfo {
  name: string;
  email: string;
  picture: string | null;
  role: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  login: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get('/api/spring/owner/info');
        if (res.data) {
          setUserInfo(res.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Not logged in or session expired
        console.log("No active session detected.");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (credential: string) => {
    setLoading(true);
    try {
      // 1. Send Google credential to backend to establish session cookies
      await api.post('/auth/google', { token: credential });

      // 2. Fetch user information from the newly established session
      const res = await api.get('/api/spring/owner/info');
      
      setUserInfo(res.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Auth Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error("Logout error (likely already logged out):", e);
    } finally {
      setIsLoggedIn(false);
      setUserInfo(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
