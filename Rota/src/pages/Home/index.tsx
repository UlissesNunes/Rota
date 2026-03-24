// src/pages/Home.tsx

import { useAuth } from "../../contexts/useAuth";


export function Home() {
  const { state, logout } = useAuth();
console.log(state)
console.log(import.meta.env);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black/80">
      <div className="w-full max-w-lg rounded-lg border border-[#FE751B]/40 bg-white/80 p-6 shadow-lg backdrop-blur dark:bg-black/40">
        <h1 className="text-3xl font-bold text-center text-[#FE751B] mb-4">
          Bem-vindo(a)
        </h1>

        {state.user && (
          <p className="text-center text-gray-700 dark:text-white/80 mb-6">
            Você está logado como <strong>{state.user.email}</strong>
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={logout}
            className="w-full rounded-md bg-[#FE751B] px-4 py-2 text-white font-semibold shadow-md hover:bg-[#e56715] transition-colors"
          >
            Sair
          </button>

          <a
            href="/perfil"
            className="w-full rounded-md border px-4 py-2 text-center font-medium text-[#FE751B] hover:bg-[#FE751B]/10 transition-colors"
          >
            Meu Perfil
          </a>

          <a
            href="/configuracoes"
            className="w-full rounded-md border px-4 py-2 text-center font-medium text-[#FE751B] hover:bg-[#FE751B]/10 transition-colors"
          >
            Configurações
          </a>
        </div>
      </div>
    </div>
  );
}