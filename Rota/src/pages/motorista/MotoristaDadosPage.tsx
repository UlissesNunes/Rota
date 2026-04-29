// src/pages/motorista/MotoristaDadosPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../../components/PageShell/PageShell";
import { useMotoristaCtx } from "../../contexts/useMotoristaCtx";
import { motoristaService } from "./Service/motoristaService";
import type { MotoristaUpdatePayload } from "./Types/motoristaTypes";
import { useEmpresa } from "../../contexts/useEmpresa";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Remove tudo que não for dígito */
const apenasDigitos = (v: string) => v.replace(/\D/g, "");

/**
 * Aplica máscara (XX) XXXXX-XXXX enquanto o usuário digita.
 * O valor salvo no form é sempre só dígitos (sanitizado no handleSalvar).
 */
const mascaraTelefone = (valor: string): string => {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 7)  return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  return valor;
};

/** Formata CPF: 000.000.000-00 */
const mascaraCPF = (valor: string): string => {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length <= 3)  return d;
  if (d.length <= 6)  return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9)  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
};

// ── Tipos internos ────────────────────────────────────────────────────────────

type FormState = Omit<MotoristaUpdatePayload, "empresa_id"> & {
  telefoneDisplay: string; // valor mascarado só para o input
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

// ── Componente principal ──────────────────────────────────────────────────────

export const MotoristaDadosPage = () => {
  const { motoristas, loading, error, refetch } = useMotoristaCtx();
  const { empresa } = useEmpresa();
  const navigate    = useNavigate();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form,      setForm]      = useState<FormState | null>(null);
  const [salvando,  setSalvando]  = useState(false);
  const [feedback,  setFeedback]  = useState<{ tipo: "erro" | "sucesso"; msg: string } | null>(null);

  // ── Ações ────────────────────────────────────────────────

  const startCreate = () => {
    if (!empresa) return;
    setFeedback(null);
    setEditIndex(-1);
    setForm(formVazio());
  };

  const startEdit = (index: number) => {
    setFeedback(null);
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

  const cancelar = () => {
    setEditIndex(null);
    setForm(null);
    setFeedback(null);
  };

  const handleSalvar = async () => {
    if (!form || !empresa) return;
    setSalvando(true);
    setFeedback(null);
    try {
      // Payload limpo: telefone só dígitos, empresa_id vem do contexto
      const payload: MotoristaUpdatePayload = {
        empresa_id:      empresa.id,
        nome:            form.nome.trim(),
        cpf:             apenasDigitos(form.cpf),
        cnh:             form.cnh.trim(),
        telefone:        apenasDigitos(form.telefone), // ← garante só dígitos
        ativo:           form.ativo,
        modelo_caminhao: form.modelo_caminhao.trim(),
        ano_caminhao:    form.ano_caminhao,
        cor_caminhao:    form.cor_caminhao.trim(),
        placa_caminhao:  form.placa_caminhao.trim().toUpperCase(),
      };

      if (editIndex === -1) {
        await motoristaService.create(payload, empresa.id);
      } else if (editIndex !== null) {
        await motoristaService.update(motoristas[editIndex].id, payload, empresa.id);
      }

      await refetch();
      setEditIndex(null);
      setForm(null);
      setFeedback({ tipo: "sucesso", msg: "Motorista salvo com sucesso!" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado";
      setFeedback({ tipo: "erro", msg });
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async (id: string) => {
    if (!empresa) return;
    try {
      await motoristaService.delete(id, empresa.id);
      await refetch();
      setFeedback({ tipo: "sucesso", msg: "Motorista removido." });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao excluir";
      setFeedback({ tipo: "erro", msg });
    }
  };

  // ── Render ───────────────────────────────────────────────

  if (loading) return <Skeleton />;
  if (error)   return <FeedbackBanner tipo="erro" msg={error} />;

  return (
    <PageShell
      titulo="Motoristas"
      subtitulo="Gerencie os motoristas vinculados à empresa."
      acao={
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/home")}
            className={btnCls("outline")}
          >
            ← Voltar
          </button>
          <button
            onClick={startCreate}
            className={btnCls("primary")}
          >
            + Adicionar Motorista
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-5">

        {/* Feedback global */}
        {feedback && (
          <FeedbackBanner tipo={feedback.tipo} msg={feedback.msg} />
        )}

        {/* Formulário (criar / editar) */}
        {editIndex !== null && form ? (
          <div className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6 flex flex-col gap-5">
            <p className="text-orange-500 font-semibold text-sm">
              {editIndex === -1 ? "Novo Motorista" : "Editar Motorista"}
            </p>

            {/* Campos texto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nome completo">
                <input
                  className={inputCls}
                  placeholder="João da Silva"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </Field>

              <Field label="CPF">
                <input
                  className={inputCls}
                  placeholder="000.000.000-00"
                  value={form.cpfDisplay}
                  onChange={(e) => {
                    const display = mascaraCPF(e.target.value);
                    setForm({ ...form, cpfDisplay: display, cpf: apenasDigitos(display) });
                  }}
                />
              </Field>

              <Field label="CNH">
                <input
                  className={inputCls}
                  placeholder="Número da CNH"
                  value={form.cnh}
                  onChange={(e) => setForm({ ...form, cnh: e.target.value })}
                />
              </Field>

              <Field label="Telefone (WhatsApp)">
                <input
                  className={inputCls}
                  placeholder="(71) 99999-0000"
                  value={form.telefoneDisplay}
                  onChange={(e) => {
                    const display = mascaraTelefone(e.target.value);
                    setForm({
                      ...form,
                      telefoneDisplay: display,
                      telefone: apenasDigitos(display),
                    });
                  }}
                />
              </Field>

              <Field label="Modelo do caminhão">
                <input
                  className={inputCls}
                  placeholder="Volvo FH 460"
                  value={form.modelo_caminhao}
                  onChange={(e) => setForm({ ...form, modelo_caminhao: e.target.value })}
                />
              </Field>

              <Field label="Ano do caminhão">
                <input
                  className={inputCls}
                  type="number"
                  min={1980}
                  max={new Date().getFullYear() + 1}
                  value={form.ano_caminhao}
                  onChange={(e) => setForm({ ...form, ano_caminhao: Number(e.target.value) })}
                />
              </Field>

              <Field label="Cor do caminhão">
                <input
                  className={inputCls}
                  placeholder="Branco"
                  value={form.cor_caminhao}
                  onChange={(e) => setForm({ ...form, cor_caminhao: e.target.value })}
                />
              </Field>

              <Field label="Placa do caminhão">
                <input
                  className={inputCls}
                  placeholder="ABC-1234"
                  value={form.placa_caminhao}
                  onChange={(e) =>
                    setForm({ ...form, placa_caminhao: e.target.value.toUpperCase() })
                  }
                />
              </Field>
            </div>

            {/* Status ativo */}
            <Field label="Status">
              <div className="flex gap-3">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setForm({ ...form, ativo: val })}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors
                      ${form.ativo === val
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-black text-orange-500 border-orange-500/40 hover:border-orange-500"
                      }`}
                  >
                    {val ? "Ativo" : "Inativo"}
                  </button>
                ))}
              </div>
            </Field>

            {/* Ações do form */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold
                           bg-orange-500 text-white hover:bg-orange-600
                           disabled:opacity-50 transition-colors"
              >
                {salvando ? "Salvando…" : "Salvar"}
              </button>
              <button
                onClick={cancelar}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold
                           bg-black text-red-500 border border-red-500
                           hover:bg-red-600 hover:text-white transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>

        ) : (

          /* Lista de motoristas */
          motoristas.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-neutral-500 text-sm">
              Nenhum motorista cadastrado. Clique em &quot;+ Adicionar Motorista&quot; para começar.
            </div>
          ) : (
            motoristas.map((m, index) => (
              <div
                key={m.id}
                className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <InfoItem label="Nome"    value={m.nome} />
                  <InfoItem label="CPF"     value={mascaraCPF(m.cpf ?? "")} />
                  <InfoItem label="CNH"     value={m.cnh} />
                  <InfoItem label="Telefone" value={mascaraTelefone(m.telefone ?? "")} />
                  <InfoItem label="Placa"   value={m.placa_caminhao} />
                  <InfoItem label="Modelo"  value={m.modelo_caminhao} />
                  <InfoItem label="Cor"     value={m.cor_caminhao} />
                  <InfoItem label="Ano"     value={String(m.ano_caminhao)} />
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                    ${m.ativo
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                    {m.ativo ? "Ativo" : "Inativo"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(index)}
                      className={btnCls("outline")}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(m.id)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold
                                 bg-black text-red-500 border border-red-500
                                 hover:bg-red-600 hover:text-white transition-colors"
                    >
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
  );
};

// ── Sub-componentes ───────────────────────────────────────────────────────────

const inputCls = `
  w-full px-3 py-2 rounded-lg text-sm
  bg-black text-orange-500
  border border-orange-500/50
  placeholder:text-gray-600
  focus:outline-none focus:ring-2 focus:ring-orange-500/40
  focus:border-orange-500
  transition
`;

const btnCls = (variant: "primary" | "outline") =>
  variant === "primary"
    ? "px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
    : "px-4 py-2 rounded-lg text-sm font-semibold bg-black text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white transition-colors";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-orange-500/70">
      {label}
    </label>
    {children}
  </div>
);

const InfoItem = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-500/60 mb-0.5">
      {label}
    </p>
    <p className="text-sm text-white">{value || "—"}</p>
  </div>
);

const FeedbackBanner = ({ tipo, msg }: { tipo: "erro" | "sucesso"; msg: string }) => (
  <p className={`text-[12px] rounded-lg px-3 py-2 border
    ${tipo === "erro"
      ? "text-red-400 bg-red-500/10 border-red-500/20"
      : "text-green-400 bg-green-500/10 border-green-500/20"
    }`}>
    {msg}
  </p>
);

const Skeleton = () => (
  <div className="max-w-2xl mx-auto px-5 py-8 animate-pulse flex flex-col gap-4">
    <p className="text-center text-gray-500 dark:text-neutral-400">Carregando dados...</p>
    <div className="h-6 w-48 rounded bg-neutral-800" />
    <div className="h-64 rounded-xl bg-neutral-800" />
  </div>
);