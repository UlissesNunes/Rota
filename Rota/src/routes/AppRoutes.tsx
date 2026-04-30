// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { LoginRota } from "../pages/Login/LoginRota";
import { CadastroRota } from "../pages/Login/CadastroRota";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { EsqueciSenhaRota } from "../pages/RecuperarSenha/EsqueciSenhaRota";
import { NovaSenhaRota } from "../pages/RecuperarSenha/NovaSenhaRota";
import { EmpresaDadosPage } from "../pages/empresa/empresadadospage";
import { EmpresaProvider } from "../contexts/EmpresaProvider";
import { MotoristaDadosPage } from "../pages/motorista/MotoristaDadosPage";
import { MotoristaProvider } from "../contexts/MotoristaProvider";
import RotaTermosDeUso from "../pages/RotaTermosDeUso/RotaTermosDeUso";
import RotaPoliticaDePrivacidade from "../pages/RotaPoliticaDePrivacidade/RotaPoliticaDePrivacidade";

export function AppRoutes() {
  const { state } = useAuth();
  const isAuthenticated = !!state.user;

  return (
    <BrowserRouter>
      <Routes>

        {/* ── Rotas públicas ──────────────────────────────── */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginRota />}
        />
        <Route
          path="/cadastro"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <CadastroRota />}
        />
        <Route path="/esqueci-senha"   element={<EsqueciSenhaRota />} />
        <Route path="/nova-senha"      element={<NovaSenhaRota />} />
        <Route path="/rotaTermos"      element={<RotaTermosDeUso />} />
        <Route path="/rotaPrivacidade" element={<RotaPoliticaDePrivacidade />} />

        {/* ── Rotas protegidas — dentro do layout Home ────── */}
        {/* Todas as rotas aqui herdam Header + Sidebar + Footer */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {/* Dashboard principal */}
          <Route path="home" element={null} />

          {/* Empresa */}
          <Route
            path="empresa/dados"
            element={
              <EmpresaProvider>
                <EmpresaDadosPage />
              </EmpresaProvider>
            }
          />

          {/* Motoristas */}
          <Route
            path="motorista/Inicial"
            element={
              <MotoristaProvider>
                <MotoristaDadosPage />
              </MotoristaProvider>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}