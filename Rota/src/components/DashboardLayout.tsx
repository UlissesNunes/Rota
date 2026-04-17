// src/shared/components/DashboardLayout.tsx
import { useState } from "react";
import { Sidebar } from "../pages/Home/componentsHome/Sidebar";
import { FooterRota } from "./FooterRota";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Sidebar controlada por estado */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Área principal */}
      <div className="flex flex-col flex-1">
        {/* Header / Menu superior */}
        <header className="h-16 border-b border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-neutral-900 flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
            Dashboard
          </h1>

          {/* Botão para abrir/fechar sidebar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
          >
            ☰
          </button>
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 px-6 py-8">{children}</main>

        {/* Footer */}
        <FooterRota />
      </div>
    </div>
  );
};
