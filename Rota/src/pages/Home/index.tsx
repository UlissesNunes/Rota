// src/pages/Home/HomeRota.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./componentsHome/Sidebar";
import { HeaderHome } from "./componentsHome/HeaderHome";
import { useAuth } from "../../contexts/useAuth";
import { FooterRota } from "../../components/FooterRota";
import { MainHome } from "./MainHome";

export const Home = () => {
  const { state } = useAuth();
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Renderiza MainHome só em /home; nas sub-rotas usa <Outlet>
  const isDashboard = pathname === "/home";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-[#0f0f0e]">

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderHome
          user={state.user}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <main className="flex-1 overflow-y-auto">
          {isDashboard ? <MainHome /> : <Outlet />}
          <FooterRota />
        </main>

      </div>
    </div>
  );
};