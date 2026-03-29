// src/pages/Login/LoginRota.tsx

import { Template } from "../../templates/template";
import { LoginForm } from "./LoginForm";

export const LoginRota = () => {
  return (
    <Template>
      <main className="flex min-h-screen w-full items-center justify-center px-4">
        <section
          className="w-full max-w-md rounded-lg border border-[#FE751B]/40 
                     bg-white/60 p-8 shadow-lg backdrop-blur 
                     dark:bg-black/40"
          aria-labelledby="login-title"
        >
          <h1
            id="login-title"
            className="text-3xl font-semibold text-black dark:text-white text-center"
          >
            Login
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-white/70 text-center">
            Acesse sua conta para continuar.
          </p>

          {/* Formulário de login */}
          <LoginForm />

          {/* Links auxiliares */}
          <nav className="mt-4 flex flex-col items-center space-y-2 text-sm">
            <a
              href="/cadastro"
              className="text-[#FE751B] hover:underline focus:outline-none focus:ring-2 focus:ring-[#FE751B]"
            >
              Não tenho conta
            </a>
            <a
              href="/EsqueciSenha"
              className="text-[#FE751B] hover:underline focus:outline-none focus:ring-2 focus:ring-[#FE751B]"
            >
              Esqueci minha senha
            </a>
          </nav>
        </section>
      </main>
    </Template>
  );
};