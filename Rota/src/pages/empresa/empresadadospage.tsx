// src/domains/empresa/pages/EmpresaDadosPage.tsx
import { useState, useEffect } from "react";
import { useEmpresaForm } from "./hooksEmpresa/useEmpresa";
import { PageShell } from "../../components/PageShell/PageShell";


export const EmpresaDadosPage = () => {
  const { empresa, salvando, erro, sucesso, salvar } = useEmpresaForm();
  const [form, setForm] = useState(() => ({
    nome: empresa?.nome ?? "",
    email: empresa?.email ?? "",
    whatsapp: empresa?.whatsapp ?? "",
  }));

  useEffect(() => {
    // Apenas log ou operações externas aqui, SEM setState
    if (empresa?.nome) {
      console.log("Empresa carregada:", empresa);
      // Sincronize com sistemas externos se necessário
    }
  }, [empresa]);

  if (!empresa) return <Skeleton />;

  const handleSalvar = () => {
    const payload: Record<string, string | null> = {};

    // Nome
    const nomeTrimmed = form.nome.trim();
    if (nomeTrimmed !== empresa.nome) {
      if (nomeTrimmed.length > 0) {
        payload.nome = nomeTrimmed;
      }
    }

    // Email
    const emailTrimmed = form.email.trim();
    const normalizedEmail = emailTrimmed === "" ? null : emailTrimmed;
    if (normalizedEmail !== empresa.email) {
      payload.email = normalizedEmail;
    }

    // WhatsApp
    const digits = form.whatsapp.replace(/\D/g, "");
    const normalizedWhatsapp = digits === "" ? null : digits;
    if (normalizedWhatsapp !== empresa.whatsapp) {
      payload.whatsapp = normalizedWhatsapp;
    }

    // Prevenção de envio vazio
    if (Object.keys(payload).length === 0) {
      alert("Nenhuma alteração detectada."); // feedback simples
      return;
    }

    salvar(payload); // ✅ envia apenas campos alterados
  };

  return (
    <PageShell
      titulo="Dados da empresa"
      subtitulo="Essas informações são usadas nas automações e relatórios."
    >
      <div className="bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.06] rounded-xl p-6 flex flex-col gap-5">
        <Field label="Nome da empresa *">
          <input
            type="text"
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            placeholder="Ex: Transportadora Alpha"
            className={inputCls}
          />
        </Field>

        <Field label="E-mail">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="contato@empresa.com"
            className={inputCls}
          />
        </Field>

        <Field label="WhatsApp (com DDD) *">
          <input
            type="tel"
            value={form.whatsapp}
            onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
            placeholder="11999999999"
            className={inputCls}
          />
          <p className="text-[11px] text-gray-400 dark:text-neutral-500 mt-1">
            Usado para automações via n8n. Apenas números.
          </p>
        </Field>

        {erro && <Feedback tipo="erro" msg={erro} />}
        {sucesso && <Feedback tipo="sucesso" msg="✓ Dados salvos com sucesso." />}

        <button
          onClick={handleSalvar}
          disabled={salvando}
          className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#FE751B] text-white hover:bg-[#e56510] disabled:opacity-50 transition-colors"
        >
          {salvando ? "Salvando..." : "Salvar dados"}
        </button>
      </div>
    </PageShell>
  );
};

// ── Atoms ─────────────────────────────────────────────────────────────────────

const inputCls = `
  w-full px-3 py-2 rounded-lg text-sm
  bg-gray-50 dark:bg-neutral-800
  border border-black/[0.08] dark:border-white/[0.08]
  text-gray-900 dark:text-neutral-100
  placeholder:text-gray-400 dark:placeholder:text-neutral-600
  focus:outline-none focus:ring-2 focus:ring-[#FE751B]/30 transition
`;

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
      {label}
    </label>
    {children}
  </div>
);

const Feedback = ({ tipo, msg }: { tipo: "erro" | "sucesso"; msg: string }) => (
  <p
    className={`text-[12px] rounded-lg px-3 py-2 border ${
      tipo === "erro"
        ? "text-red-600 bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400"
        : "text-green-600 bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400"
    }`}
  >
    {msg}
  </p>
);

const Skeleton = () => (
  <div className="max-w-2xl mx-auto px-5 py-8 animate-pulse flex flex-col gap-4">
    <div className="h-6 w-48 rounded bg-gray-200 dark:bg-neutral-800" />
    <div className="h-64 rounded-xl bg-gray-200 dark:bg-neutral-800" />
  </div>
);