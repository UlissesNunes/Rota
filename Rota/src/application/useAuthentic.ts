import { useEffect, useReducer, useCallback } from "react";
import { isValidSession } from "../domain/auth";
import type { User, Session, AuthResponse } from "@supabase/supabase-js";
import { supabase } from "../services/authService";


type State = {

  loading: boolean;
  user: User | null;
  session: Session | null;
  error: string | null;
};

type Action =
  | { type: "APPLY_SESSION"; session: Session | null }
  | { type: "CLEAR_SESSION" }
  | { type: "SET_ERROR"; error: string }
  | { type: "SET_LOADING"; loading: boolean };

const initialState: State = { loading: true, user: null, session: null, error: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "APPLY_SESSION":
      return {
        ...state,
        loading: false,
        session: action.session,
        user: action.session?.user ?? null,
        error: null,
      };
    case "CLEAR_SESSION":
      return { ...state, loading: false, session: null, user: null, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.error };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}

export function useAuthentic() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const applySession = (session: Session | null) => {
    if (isValidSession(session)) {
      dispatch({ type: "APPLY_SESSION", session });
    } else {
      dispatch({ type: "CLEAR_SESSION" });
    }
  };

  const clearSession = () => dispatch({ type: "CLEAR_SESSION" });

  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error) {
        dispatch({ type: "SET_ERROR", error: error.message });
        return;
      }
      applySession(data.session);
    };

    hydrate();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      switch (event) {
        case "SIGNED_IN":
        case "TOKEN_REFRESHED":
          applySession(session);
          break;
        case "SIGNED_OUT":
          clearSession();
          break;
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      dispatch({ type: "SET_LOADING", loading: true });
      const result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        dispatch({ type: "SET_ERROR", error: result.error.message });
      } else {
        applySession(result.data.session);
      }
      return result;
    },
    []
  );

  const register = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      dispatch({ type: "SET_LOADING", loading: true });
      const result = await supabase.auth.signUp({ email, password });
      if (result.error) {
        dispatch({ type: "SET_ERROR", error: result.error.message });
      } else {
        applySession(result.data.session);
      }
      return result;
    },
    []
  );

  const logout = useCallback(async () => {
    dispatch({ type: "SET_LOADING", loading: true });
    const { error } = await supabase.auth.signOut();
    if (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
      return;
    }
    clearSession();
  }, []);


  return { state, login, register, logout };
}

