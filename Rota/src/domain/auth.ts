// src/domain/auth.ts
import { useEffect, useState } from "react";
import { supabase, login, register, logout } from "../services/authService";
import type { User } from "@supabase/supabase-js"; 
const KEY = "loginTimestamp";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h

function setLoginTimestamp() {
  localStorage.setItem(KEY, Date.now().toString());
}
function clearLoginTimestamp() {
  localStorage.removeItem(KEY);
}
function isSessionValid(): boolean {
  const ts = localStorage.getItem(KEY);
  if (!ts) return false;
  return Date.now() - parseInt(ts, 10) < SESSION_DURATION;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

export function useAuthDomain() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  // Inicialização determinística
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      if (sessionUser && isSessionValid()) {
        setState({ user: sessionUser, isAuthenticated: true, loading: false, error: null });
      } else {
        clearLoginTimestamp();
        setState({ user: null, isAuthenticated: false, loading: false, error: null });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setLoginTimestamp();
        setState({ user: session.user, isAuthenticated: true, loading: false, error: null });
      } else {
        clearLoginTimestamp();
        setState({ user: null, isAuthenticated: false, loading: false, error: null });
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const user = await login(email, password);
      setLoginTimestamp();
      setState({ user: user.user, isAuthenticated: true, loading: false, error: null });
    } catch {
      setState({ user: null, isAuthenticated: false, loading: false, error: "Não foi possível autenticar." });
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      await register(email, password);
      clearLoginTimestamp();
      setState({ user: null, isAuthenticated: false, loading: false, error: null });
    } catch {
      setState({ user: null, isAuthenticated: false, loading: false, error: "Não foi possível cadastrar." });
    }
  };

  const handleLogout = async () => {
    await logout();
    clearLoginTimestamp();
    setState({ user: null, isAuthenticated: false, loading: false, error: null });
  };

  return { state, login: handleLogin, register: handleRegister, logout: handleLogout };
}