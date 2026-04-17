// src/shared/components/DashboardLayout.tsx

import { Sidebar } from "../pages/Home/componentsHome/Sidebar";
import { FooterRota } from "./FooterRota";


type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Sidebar fixa */}
      <Sidebar open={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } />

      {/* Área principal */}
      <div className="flex flex-col flex-1">
        {/* Header / Menu superior */}
        <header className="h-16 border-b border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-neutral-900 flex items-center px-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
            Dashboard
          </h1>
          {/* Aqui você pode colocar botões de ação, perfil, etc. */}
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 px-6 py-8">{children}</main>

        {/* Footer */}
        <FooterRota />
      </div>
    </div>
  );
};