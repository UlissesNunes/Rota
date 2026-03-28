// src/pages/EsqueciSenha/EsqueciSenhaRota.tsx
import React from "react";
import { Template } from "../../templates/template";
import { EsqueciSenhaForm } from "./EsqueciSenhaForm";

export const EsqueciSenhaRota: React.FC = () => {
  return (
    <Template>
      <main className="flex min-h-screen w-full items-center justify-center px-4">
        <section
          className="w-full max-w-md rounded-lg border border-[#FE751B]/40 
                     bg-white/70 p-8 shadow-lg backdrop-blur 
                     dark:bg-black/40"
        >
          <h1 className="text-3xl font-semibold text-black dark:text-white text-center">
            Recuperar Senha
          </h1>

          <p className="mt-2 text-sm text-slate-600 dark:text-white/70 text-center">
            Informe seu email para receber instruções de redefinição.
          </p>

          <EsqueciSenhaForm />

          <nav className="mt-4 flex flex-col items-center space-y-2 text-sm">
            <a href="/" className="text-[#FE751B] hover:underline">
              Voltar ao Login
            </a>
            <a href="/cadastro" className="text-[#FE751B] hover:underline">
              Criar nova conta
            </a>
          </nav>
        </section>
      </main>
    </Template>
  );
};