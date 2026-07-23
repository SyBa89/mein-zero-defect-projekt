// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(c => c.trim().startsWith('admin-session='));
      if (sessionCookie && sessionCookie.includes('authenticated')) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = async (password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        document.cookie = 'admin-session=authenticated; path=/; max-age=3600; SameSite=Lax; Secure';
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Falsches Passwort' };
    } catch {
      return { success: false, error: 'Verbindungsfehler' };
    }
  };

  const logout = () => {
    document.cookie = 'admin-session=; path=/; max-age=0';
    setIsAuthenticated(false);
    router.push('/admin-login');
  };

  return { isAuthenticated, isLoading, login, logout };
}