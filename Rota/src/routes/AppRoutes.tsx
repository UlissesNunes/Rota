// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { LoginRota } from "../pages/Login/LoginRota";

import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { CadastroRota } from "../pages/Login/CadastroRota";


export function AppRoutes() {
  const { state } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/login"
          element={
            state.isAuthenticated ? <Navigate to="/home" replace /> : <LoginRota />
          }
        />
        <Route
          path="/cadastro"
          element={
            state.isAuthenticated ? <Navigate to="/home" replace /> : <CadastroRota />
          }
        />

        {/* Rotas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
             <Home/>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}