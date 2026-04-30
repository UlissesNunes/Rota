// src/pages/empresa/EmpresaDadosPage.tsx
import { useState, useEffect } from "react";
import { PageShell } from "../../components/PageShell/PageShell";
import { useEmpresaForm } from "./hooksEmpresa/useEmpresa";
import type { EmpresaUpdatePayload } from "./Types/EmpresaTypes";

// ── Toast (mesmo padrão do MotoristaDadosPage) ────────────────────────────────

type ToastProps = { tipo: "sucesso" | "erro"; msg: string; onClose: () => void };

const Toast = ({ tipo, msg, onClose }: ToastProps) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 flex items-center gap-3
      px-4 py-3 rounded-xl shadow-lg border text-sm font-medium
      animate-[toast-in_0.25s_ease]
      ${tipo === "sucesso"
        ? "bg-green-500/10 border-green-500/25 text-green-600 dark:text-green-400"
        : "bg-red-500/10 border-red-500/25 text-red-600 dark:text-red-400"
      }
    `}>
      {tipo === "sucesso"
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      }
      <span>{msg}</span>
      <button onClick={onClose} className="ml-1 opacity-50 hover:opacity-100 transition-opacity">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────

export const EmpresaDadosPage = () => {
  const { empresa, salvando, salvar } = useEmpresaForm();

  const [form, setForm] = useState({
    nome:     empresa?.nome     ?? "",
    cnpj:     empresa?.cnpj     ?? "",
    email:    empresa?.email    ?? "",
    whatsapp: empresa?.whatsapp ?? "",
    rua:      "",
    bairro:   "",
    cidade:   "",
    estado:   "",
    cep:      "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<{ tipo: "sucesso" | "erro"; msg: string } | null>(null);

  const showToast = (tipo: "sucesso" | "erro", msg: string) => setToast({ tipo, msg });

  // ── Validação / normalização ──────────────────────────────

  const normalizeWhatsapp = (v: string) => v.replace(/\D/g, "").slice(0, 11);
  const normalizeCnpj     = (v: string) => v.replace(/\D/g, "").slice(0, 14);
  const validateEmail     = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 100;

  // ── Salvar ────────────────────────────────────────────────

  const handleSalvar = async (): Promise<void> => {
    const payload: EmpresaUpdatePayload = {};

    if (form.nome !== empresa?.nome) payload.nome = form.nome.trim();

    if (form.cnpj !== empresa?.cnpj) {
      const cnpj = normalizeCnpj(form.cnpj);
      if (cnpj.length !== 14) { showToast("erro", "CNPJ deve ter exatamente 14 dígitos."); return; }
      payload.cnpj = cnpj;
    }

    if (form.email !== empresa?.email) {
      if (!validateEmail(form.email)) { showToast("erro", "E-mail inválido. Verifique o formato."); return; }
      payload.email = form.email.trim();
    }

    if (form.whatsapp !== empresa?.whatsapp) {
      const w = normalizeWhatsapp(form.whatsapp);
      if (w.length < 10 || w.length > 11) { showToast("erro", "WhatsApp deve ter 10 ou 11 dígitos."); return; }
      payload.whatsapp = w;
    }

    payload.endereco = `${form.rua}, ${form.bairro}, ${form.cidade} - ${form.estado}, ${form.cep}`;

    try {
      await salvar(payload);
      showToast("sucesso", "Dados da empresa atualizados!");
      setIsEditing(false);
    } catch {
      showToast("erro", "Erro ao salvar. Tente novamente.");
    }
  };

  // ── Render ────────────────────────────────────────────────

  if (!empresa) return <Skeleton />;

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {toast && <Toast tipo={toast.tipo} msg={toast.msg} onClose={() => setToast(null)} />}

      <PageShell
        titulo="Dados da empresa"
        subtitulo="Essas informações são usadas nas automações e relatórios."
        acao={
          <div className="flex gap-2">
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className={btnCls("primary")}>
                Editar
              </button>
            )}
            {isEditing && (
              <button onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold
                           bg-white dark:bg-neutral-900 text-red-500 border border-red-500
                           hover:bg-red-600 hover:text-white transition-colors">
                Cancelar
              </button>
            )}
          </div>
        }
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-5">

          {isEditing ? (

            /* ── Formulário de edição ───────────────────────── */
            <div className="bg-white dark:bg-neutral-900 border border-[#FE751B]/25 rounded-xl p-6 flex flex-col gap-5">
              <p className="text-[#FE751B] font-semibold text-sm">Editar empresa</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nome da empresa *">
                  <input type="text" value={form.nome} className={inputCls}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                </Field>
                <Field label="CNPJ *">
                  <input type="text" value={form.cnpj} placeholder="00.000.000/0001-00"
                    className={inputCls} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} />
                </Field>
                <Field label="E-mail">
                  <input type="email" value={form.email} placeholder="contato@empresa.com"
                    className={inputCls} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
                <Field label="WhatsApp (com DDD) *">
                  <input type="tel" value={form.whatsapp} placeholder="(11) 99999-9999"
                    className={inputCls} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
                </Field>
                <Field label="Rua">
                  <input type="text" value={form.rua} className={inputCls}
                    onChange={(e) => setForm({ ...form, rua: e.target.value })} />
                </Field>
                <Field label="Bairro">
                  <input type="text" value={form.bairro} className={inputCls}
                    onChange={(e) => setForm({ ...form, bairro: e.target.value })} />
                </Field>
                <Field label="Cidade">
                  <input type="text" value={form.cidade} className={inputCls}
                    onChange={(e) => setForm({ ...form, cidade: e.target.value })} />
                </Field>
                <Field label="Estado">
                  <input type="text" value={form.estado} className={inputCls}
                    onChange={(e) => setForm({ ...form, estado: e.target.value })} />
                </Field>
                <Field label="CEP">
                  <input type="text" value={form.cep} placeholder="00000-000"
                    className={inputCls} onChange={(e) => setForm({ ...form, cep: e.target.value })} />
                </Field>
              </div>

              <button onClick={handleSalvar} disabled={salvando}
                className="w-full py-2.5 rounded-lg text-sm font-semibold
                           bg-[#FE751B] text-white hover:bg-orange-600
                           disabled:opacity-50 transition-colors">
                {salvando ? "Salvando..." : "Salvar dados"}
              </button>
            </div>

          ) : (

            /* ── Visualização ───────────────────────────────── */
            <div className="bg-white dark:bg-neutral-900
                            border border-black/[0.06] dark:border-white/[0.05]
                            rounded-xl p-5 hover:border-[#FE751B]/30 transition-colors">

              {/* Cabeçalho com avatar e nome */}
              <div className="flex items-center gap-3 mb-4 pb-4
                              border-b border-black/[0.05] dark:border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-[#FE751B]/10
                                flex items-center justify-center
                                text-[#FE751B] font-bold text-lg flex-shrink-0">
                  {empresa.nome?.charAt(0).toUpperCase() ?? "E"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-neutral-100 text-[15px]">
                    {empresa.nome}
                  </p>
                  <p className="text-[11px] text-[#FE751B]/60 uppercase tracking-wider mt-0.5">
                    {empresa.plano ?? "Plano gratuito"}
                  </p>
                </div>
              </div>

              {/* Grid de dados */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <InfoItem label="CNPJ"     value={empresa.cnpj} />
                <InfoItem label="E-mail"   value={empresa.email} />
                <InfoItem label="WhatsApp" value={empresa.whatsapp} />
                <InfoItem label="Endereço" value={empresa.endereco} />
              </div>
            </div>
          )}
        </div>
      </PageShell>
    </>
  );
};

// ── Sub-componentes ───────────────────────────────────────────────────────────

const inputCls = `
  w-full px-3 py-2 rounded-lg text-sm
  bg-white dark:bg-neutral-950 text-gray-900 dark:text-orange-400
  border border-[#FE751B]/40
  placeholder:text-gray-400 dark:placeholder:text-gray-600
  focus:outline-none focus:ring-2 focus:ring-[#FE751B]/30 focus:border-[#FE751B]
  transition
`;

const btnCls = (variant: "primary" | "outline") =>
  variant === "primary"
    ? "px-4 py-2 rounded-lg text-sm font-semibold bg-[#FE751B] text-white hover:bg-orange-600 transition-colors"
    : "px-4 py-2 rounded-lg text-sm font-semibold bg-white dark:bg-neutral-900 text-[#FE751B] border border-[#FE751B]/50 hover:bg-[#FE751B] hover:text-white transition-colors";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#FE751B]/70">
      {label}
    </label>
    {children}
  </div>
);

const InfoItem = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FE751B]/50 mb-0.5">
      {label}
    </p>
    <p className="text-sm text-gray-900 dark:text-neutral-100">{value || "—"}</p>
  </div>
);

const Skeleton = () => (
  <div className="max-w-5xl mx-auto w-full px-5 py-8 animate-pulse flex flex-col gap-4">
    <div className="h-6 w-48 rounded bg-gray-200 dark:bg-neutral-800" />
    <div className="h-64 rounded-xl bg-gray-200 dark:bg-neutral-800" />
  </div>
);