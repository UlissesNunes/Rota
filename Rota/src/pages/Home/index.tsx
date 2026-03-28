// src/pages/Home/HomeRota.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./componentsHome/Sidebar";
import { HeaderHome } from "./componentsHome/HeaderHome";
import { useAuth } from "../../contexts/useAuth";
import { FooterRota } from "../../components/FooterRota";


export const Home = () => {
  const { state } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen dark:bg-black">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <HeaderHome onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
          <h1 className="text-3xl font-bold text-[#FE751B] mb-4 text-center">
            Bem-vindo(a)
          </h1>
          {state.user && (
            <p className="text-center text-gray-700 dark:text-white/80 mb-6">
              Você está logado como <strong>{state.user.email}</strong>
            </p>
          )}
          <Outlet />
        </main>
        <FooterRota />
      </div>
    </div>
  );
};