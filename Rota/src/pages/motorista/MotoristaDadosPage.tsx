// src/pages/motorista/MotoristaDadosPage.tsx
import { useState, useEffect } from "react";
import { PageShell } from "../../components/PageShell/PageShell";
import { useMotoristaCtx } from "../../contexts/useMotoristaCtx";
import { motoristaService } from "./Service/motoristaService";
import type { MotoristaUpdatePayload } from "./Types/motoristaTypes";
import { useEmpresa } from "../../contexts/useEmpresa";

// ── Helpers ───────────────────────────────────────────────────────────────────

const apenasDigitos = (v: string) => v.replace(/\D/g, "");

const mascaraTelefone = (valor: string): string => {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 7)  return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  return valor;
};

const placaCaminhao = (valor: string): string => {
  const d = valor.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0,3)}-${d.slice(3)}`;
  return `${d.slice(0,3)}-${d.slice(3)}`;
};

const mascaraCnh = (valor: string): string => {
  const d = apenasDigitos(valor).slice(0, 11);
  return d;
};

const mascaraCPF = (valor: string): string => {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length <= 3)  return d;
  if (d.length <= 6)  return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9)  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
};

// ── Tipos internos ────────────────────────────────────────────────────────────

type FormState = Omit<MotoristaUpdatePayload, "empresa_id"> & {
  telefoneDisplay: string;
  cpfDisplay:      string;
};

const formVazio = (): FormState => ({
  nome:            "",
  cpf:             "",
  cpfDisplay:      "",
  cnh:             "",
  telefone:        "",
  telefoneDisplay: "",
  ativo:           true,
  modelo_caminhao: "",
  ano_caminhao:    new Date().getFullYear(),
  cor_caminhao:    "",
  placa_caminhao:  "",
});

// ── Toast ─────────────────────────────────────────────────────────────────────

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

export const MotoristaDadosPage = () => {
  const { motoristas, loading, error, refetch } = useMotoristaCtx();
  const { empresa } = useEmpresa();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form,      setForm]      = useState<FormState | null>(null);
  const [salvando,  setSalvando]  = useState(false);
  const [toast,     setToast]     = useState<{ tipo: "sucesso" | "erro"; msg: string } | null>(null);

  const showToast = (tipo: "sucesso" | "erro", msg: string) => setToast({ tipo, msg });

  const startCreate = () => {
    if (!empresa) return;
    setEditIndex(-1);
    setForm(formVazio());
  };

  const startEdit = (index: number) => {
    const m = motoristas[index];
    setEditIndex(index);
    setForm({
      nome:            m.nome            ?? "",
      cpf:             m.cpf             ?? "",
      cpfDisplay:      mascaraCPF(m.cpf  ?? ""),
      cnh:             m.cnh             ?? "",
      telefone:        m.telefone        ?? "",
      telefoneDisplay: mascaraTelefone(m.telefone ?? ""),
      ativo:           m.ativo           ?? true,
      modelo_caminhao: m.modelo_caminhao ?? "",
      ano_caminhao:    m.ano_caminhao    ?? new Date().getFullYear(),
      cor_caminhao:    m.cor_caminhao    ?? "",
      placa_caminhao:  m.placa_caminhao  ?? "",
    });
  };

  const cancelar = () => { setEditIndex(null); setForm(null); };

  const handleSalvar = async () => {
    if (!form || !empresa) return;
    setSalvando(true);
    try {
      const payload: MotoristaUpdatePayload = {
        empresa_id:      empresa.id,
        nome:            form.nome.trim(),
        cpf:             apenasDigitos(form.cpf),
        cnh:             form.cnh.trim(),
        telefone:        apenasDigitos(form.telefone),
        ativo:           form.ativo,
        modelo_caminhao: form.modelo_caminhao.trim(),
        ano_caminhao:    form.ano_caminhao,
        cor_caminhao:    form.cor_caminhao.trim(),
        placa_caminhao:  form.placa_caminhao.trim().toUpperCase(),
      };

      if (editIndex === -1) {
        await motoristaService.create(payload, empresa.id);
        showToast("sucesso", "Motorista adicionado com sucesso!");
      } else if (editIndex !== null) {
        await motoristaService.update(motoristas[editIndex].id, payload, empresa.id);
        showToast("sucesso", "Dados do motorista atualizados!");
      }

      await refetch();
      setEditIndex(null);
      setForm(null);
    } catch (err) {
      showToast("erro", err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async (id: string) => {
    if (!empresa) return;
    try {
      await motoristaService.delete(id, empresa.id);
      await refetch();
      showToast("sucesso", "Motorista removido.");
    } catch (err) {
      showToast("erro", err instanceof Error ? err.message : "Erro ao excluir");
    }
  };

  if (loading) return <Skeleton />;
  if (error)   return <InlineError msg={error} />;

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
        titulo="Motoristas"
        subtitulo="Gerencie os motoristas vinculados à empresa."
        acao={
          <button onClick={startCreate} className={btnCls("primary")}>
            + Adicionar Motorista
          </button>
        }
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-5">

          {editIndex !== null && form ? (
            <div className="bg-white dark:bg-neutral-900 border border-[#FE751B]/25 rounded-xl p-6 flex flex-col gap-5">
              <p className="text-[#FE751B] font-semibold text-sm">
                {editIndex === -1 ? "Novo Motorista" : "Editar Motorista"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nome completo">
                  <input className={inputCls} placeholder="João da Silva"
                    value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                </Field>
                <Field label="CPF">
                  <input className={inputCls} placeholder="000.000.000-00"
                    value={form.cpfDisplay}
                    onChange={(e) => {
                      const d = mascaraCPF(e.target.value);
                      setForm({ ...form, cpfDisplay: d, cpf: apenasDigitos(d) });
                    }} />
                </Field>
                <Field label="CNH">
                  <input className={inputCls} placeholder="Número da CNH"
                    value={form.cnh} onChange={(e) => {
                      const d = mascaraCnh(e.target.value);
                      setForm({ ...form, cnh: d });
                    }} />
                </Field>
                <Field label="Telefone (WhatsApp)">
                  <input className={inputCls} placeholder="(71) 99999-0000"
                    value={form.telefoneDisplay}
                    onChange={(e) => {
                      const d = mascaraTelefone(e.target.value);
                      setForm({ ...form, telefoneDisplay: d, telefone: apenasDigitos(d) });
                    }} />
                </Field>
                <Field label="Modelo do caminhão">
                  <input className={inputCls} placeholder="Volvo FH 460"
                    value={form.modelo_caminhao}
                    onChange={(e) => setForm({ ...form, modelo_caminhao: e.target.value })} />
                </Field>
                <Field label="Ano do caminhão">
                  <input className={inputCls} type="number" min={1980} max={new Date().getFullYear() + 1}
                    value={form.ano_caminhao}
                    onChange={(e) => setForm({ ...form, ano_caminhao: Number(e.target.value) })} />
                </Field>
                <Field label="Cor do caminhão">
                  <input className={inputCls} placeholder="Branco"
                    value={form.cor_caminhao}
                    onChange={(e) => setForm({ ...form, cor_caminhao: e.target.value })} />
                </Field>
                <Field label="Placa do caminhão">
                  <input className={inputCls} placeholder="ABC-1234"
                    value={form.placa_caminhao}
                    onChange={(e) => {
                      const d = placaCaminhao(e.target.value);
                      setForm({ ...form, placa_caminhao: d });
                    }}
                     
                     />
                </Field>
              </div>

              <Field label="Status">
                <div className="flex gap-3">
                  {[true, false].map((val) => (
                    <button key={String(val)} type="button"
                      onClick={() => setForm({ ...form, ativo: val })}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors
                        ${form.ativo === val
                          ? "bg-[#FE751B] text-white border-[#FE751B]"
                          : "bg-white dark:bg-neutral-900 text-[#FE751B] border-[#FE751B]/30 hover:border-[#FE751B]"
                        }`}>
                      {val ? "Ativo" : "Inativo"}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="flex gap-2 pt-1">
                <button onClick={handleSalvar} disabled={salvando}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold
                             bg-[#FE751B] text-white hover:bg-orange-600
                             disabled:opacity-50 transition-colors">
                  {salvando ? "Salvando…" : "Salvar"}
                </button>
                <button onClick={cancelar}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold
                             bg-white dark:bg-neutral-900 text-red-500 border border-red-500
                             hover:bg-red-600 hover:text-white transition-colors">
                  Cancelar
                </button>
              </div>
            </div>

          ) : (
            motoristas.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-neutral-500 text-sm">
                Nenhum motorista cadastrado. Clique em &quot;+ Adicionar Motorista&quot; para começar.
              </div>
            ) : (
              motoristas.map((m, index) => (
                <div key={m.id}
                  className="bg-white dark:bg-neutral-900
                             border border-black/[0.06] dark:border-white/[0.05]
                             rounded-xl p-5 hover:border-[#FE751B]/30 transition-colors">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <InfoItem label="Nome"     value={m.nome} />
                    <InfoItem label="CPF"      value={mascaraCPF(m.cpf ?? "")} />
                    <InfoItem label="CNH"      value={m.cnh} />
                    <InfoItem label="Telefone" value={mascaraTelefone(m.telefone ?? "")} />
                    <InfoItem label="Placa"    value={m.placa_caminhao} />
                    <InfoItem label="Modelo"   value={m.modelo_caminhao} />
                    <InfoItem label="Cor"      value={m.cor_caminhao} />
                    <InfoItem label="Ano"      value={String(m.ano_caminhao)} />
                  </div>
                  <div className="flex items-center justify-between pt-3
                                  border-t border-black/[0.05] dark:border-white/[0.05]">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                      ${m.ativo
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20"
                      }`}>
                      {m.ativo ? "Ativo" : "Inativo"}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(index)} className={btnCls("outline")}>
                        Editar
                      </button>
                      <button onClick={() => handleExcluir(m.id)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold
                                   bg-white dark:bg-neutral-900 text-red-500 border border-red-500
                                   hover:bg-red-600 hover:text-white transition-colors">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
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

const InlineError = ({ msg }: { msg: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-sm text-red-400">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    {msg}
  </div>
);

const Skeleton = () => (
  <div className="max-w-5xl mx-auto w-full px-5 py-8 animate-pulse flex flex-col gap-4">
    <div className="h-6 w-48 rounded bg-gray-200 dark:bg-neutral-800" />
    <div className="h-64 rounded-xl bg-gray-200 dark:bg-neutral-800" />
  </div>
);