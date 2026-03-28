// src/pages/Cadastro/CadastroRota.tsx

import { Template } from "../../templates/template";
import { CadastroForm } from "./CadastroForm";

export const CadastroRota = () => {
  return (
    <Template>
      <main className="flex min-h-screen w-full items-center justify-center px-4">
        <section
          className="w-full max-w-md rounded-lg border border-[#FE751B]/40 
                     bg-white/70 p-8 shadow-lg backdrop-blur 
                     dark:bg-black/40"
          aria-labelledby="cadastro-title"
        >
          <h1
            id="cadastro-title"
            className="text-3xl font-semibold text-black dark:text-white text-center"
          >
            Cadastro
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-white/70 text-center">
            Crie sua conta para começar.
          </p>

          {/* Formulário de cadastro */}
          <CadastroForm />

          {/* Links auxiliares */}
          <nav className="mt-4 flex flex-col items-center space-y-2 text-sm">
            <a
              href="/"
              className="text-[#FE751B] hover:underline focus:outline-none focus:ring-2 focus:ring-[#FE751B]"
            >
              Já tenho conta
            </a>
          </nav>
        </section>
      </main>
    </Template>
  );
};