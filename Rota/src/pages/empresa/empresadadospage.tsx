import { useState } from "react";
import { useEmpresaForm } from "./hooksEmpresa/useEmpresa";
import { PageShell } from "../../components/PageShell/PageShell";
import type { Empresa, EmpresaUpdateInput } from "./Types/EmpresaTypes";
import { DashboardLayout } from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

export const EmpresaDadosPage = () => {
  const { empresa, salvando, erro, sucesso, salvar } = useEmpresaForm();
  const navigate = useNavigate();

  // ✅ Inicializa direto no useState, sem useEffect
  const [form, setForm] = useState<EmpresaUpdateInput>(() => ({
    nome: empresa?.nome ?? "",
    email: empresa?.email ?? "",
    whatsapp: empresa?.whatsapp ?? "",
    cnpj: empresa?.cnpj ?? "",
    endereco: empresa?.endereco ?? "",
  }));

  const [feedbackLocal, setFeedbackLocal] = useState<string | null>(null);

  if (!empresa) return <Skeleton />;

  const handleSalvar = () => {
    const payload = buildPayload(empresa, form);
    if (Object.keys(payload).length === 0) {
      setFeedbackLocal("Nenhuma alteração detectada.");
      return;
    }
    salvar(payload);
  };




  return (
    <DashboardLayout>
      <PageShell
        titulo="Dados da empresa"
        subtitulo="Essas informações são usadas nas automações e relatórios."
        acao={
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
          >
            ← Voltar ao Dashboard
          </button>
        }
      >
        <div className="bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.06] rounded-xl p-6 flex flex-col gap-5">

          <Field label="Nome da empresa *">
            <input
              type="text"
              value={form.nome ?? ""}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: Transportadora Alpha"
              className={inputCls}
            />
          </Field>

          <Field label="CNPJ *">
            <input
              type="text"
              value={form.cnpj ?? ""}
              onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
              placeholder="00.000.000/0001-00"
              className={inputCls}
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contato@empresa.com"
              className={inputCls}
            />
          </Field>

      

          <Field label="WhatsApp (com DDD) *">
            <input
              type="tel"
              value={form.whatsapp ?? ""}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="11999999999"
              className={inputCls}
            />
          </Field>

      

          <Field label="Endereço completo">
            <textarea
              value={form.endereco ?? ""}
              onChange={(e) => setForm({ ...form, endereco: e.target.value })}
              placeholder="Rua, número, bairro, cidade, estado, CEP"
              className={inputCls}
            />
          </Field>

        

          {erro && <Feedback tipo="erro" msg={erro} />}
          {sucesso && <Feedback tipo="sucesso" msg="✓ Dados salvos com sucesso." />}
          {feedbackLocal && <Feedback tipo="erro" msg={feedbackLocal} />}

          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="w-full py-2.5 rounded-lg text-sm font-semibold bg-[#FE751B] text-white hover:bg-[#e56510] disabled:opacity-50 transition-colors"
          >
            {salvando ? "Salvando..." : "Salvar dados"}
          </button>
        </div>
      </PageShell>
    </DashboardLayout>
  );
};
// ── Helpers ──────────────────────────────────────────────────────────────────

function normalizeNome(nome: string) {
  const trimmed = nome.trim();
  return trimmed.length >= 2 ? trimmed : undefined;
}

function normalizeEmail(email: string) {
  const trimmed = email.trim();
  if (trimmed === "") return null;
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return regex.test(trimmed) ? trimmed : undefined;
}

function normalizeWhatsapp(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  if (digits === "") return null;
  return digits.length >= 10 && digits.length <= 15 ? digits : undefined;
}

function buildPayload(empresa: Empresa, form: EmpresaUpdateInput): EmpresaUpdateInput {
  const payload: EmpresaUpdateInput = {
    cnpj: "",
    endereco: ""
  };

  const nome = normalizeNome(form.nome ?? "");
  if (nome && nome !== empresa.nome) payload.nome = nome;

  const email = normalizeEmail(form.email ?? "");
  if (email !== undefined && email !== empresa.email) payload.email = email;
  else if (email === null && empresa.email !== null) payload.email = null;

  const whatsapp = normalizeWhatsapp(form.whatsapp ?? "");
  if (whatsapp !== undefined && whatsapp !== empresa.whatsapp) payload.whatsapp = whatsapp;
  else if (whatsapp === null && empresa.whatsapp !== null) payload.whatsapp = null;
 if (form.cnpj !== empresa.cnpj) payload.cnpj = form.cnpj;
  if (form.endereco !== empresa.endereco) payload.endereco = form.endereco;

  return payload;
}

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