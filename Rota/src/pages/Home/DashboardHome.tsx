// src/pages/Home/DashboardHome.tsx
import type { User } from "@supabase/supabase-js";

type DashboardHomeProps = {
  user: User | null;
};

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#FF6A00] mb-4">Dashboard</h1>
      {user ? (
        <p className="text-gray-700 dark:text-gray-300">
          Bem-vindo, <strong>{user.email}</strong>
        </p>
      ) : (
        <p className="text-gray-500">Usuário não autenticado.</p>
      )}
    </div>
  );
};