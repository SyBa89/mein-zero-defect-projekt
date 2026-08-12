'use client';
// src/hooks/useAuth.ts
// ✅ ZERO-DEFECT: Auth-Hook auf echtem System (/api/admin/users)
// Session-Cookie ist HttpOnly -> Server-Check statt Client-Cookie-Lesen

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/users', { method: 'GET', credentials: 'include' });
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = async (password: string, username = 'admin') => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'login', username, password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        return { success: true };
      }
      const data = await res.json().catch(() => null);
      return { success: false, error: data?.error || 'Falsches Passwort' };
    } catch {
      return { success: false, error: 'Verbindungsfehler' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'logout' }),
      });
    } finally {
      setIsAuthenticated(false);
      router.push('/admin');
    }
  };

  return { isAuthenticated, isLoading, login, logout };
}