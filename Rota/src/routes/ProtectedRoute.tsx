// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();

  if (state.loading) return <p>Carregando...</p>;
  if (!state.isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}