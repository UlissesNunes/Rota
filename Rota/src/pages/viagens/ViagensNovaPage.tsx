// src/pages/viagens/ViagemNovaPage.tsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motoristaService } from "../motorista/Service/motoristaService";
import { useEmpresa } from "../../contexts/useEmpresa";
import type { Motorista } from "../motorista/Types/motoristaTypes";
import { useViagensForm } from "./HooksViagens/useViagens";
import type { ViagemCreateInput } from "./Types/TypesViagens";

// ── Tipos internos ────────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof ViagemCreateInput, string>>;
type TouchedFields = Partial<Record<keyof ViagemCreateInput, boolean>>;

// ── Validação pura — sem any ──────────────────────────────────────────────────

function validate(
  field: keyof ViagemCreateInput,
  value: string | undefined,
): string | undefined {
  switch (field) {
    case "origem":
    case "destino":
      if (!value || value.trim().length < 3) return "Mínimo 3 caracteres";
      return undefined;

    case "dataAgendada":
      if (!value) return "Campo obrigatório";
      if (new Date(value) < new Date()) return "Data não pode ser no passado";
      return undefined;

    case "motoristaId":
      return undefined; // opcional

    default:
      return undefined;
  }
}

// ── Componente ────────────────────────────────────────────────────────────────

export const ViagemNovaPage = () => {
  const navigate        = useNavigate();
  const { empresa }     = useEmpresa();
  const { salvar, salvando, erro, sucesso } = useViagensForm();

  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [form, setForm]             = useState<ViagemCreateInput>({
    origem:       "",
    destino:      "",
    motoristaId:  undefined,
    dataAgendada: "",
  });
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  // ── Effects ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!empresa) return;
    motoristaService.fetch(empresa.id).then(setMotoristas).catch(console.error);
  }, [empresa]);

  useEffect(() => {
    if (sucesso) {
      const t = setTimeout(() => navigate("/home"), 1200);
      return () => clearTimeout(t);
    }
  }, [sucesso, navigate]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = useCallback(
    (field: keyof ViagemCreateInput, value: string | undefined) => {
      setForm((prev) => ({ ...prev, [field]: value || undefined }));
      if (touched[field]) {
        setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
      }
    },
    [touched],
  );

  const handleBlur = useCallback(
    (field: keyof ViagemCreateInput) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({
        ...prev,
        [field]: validate(field, form[field] as string | undefined),
      }));
    },
    [form],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      origem:       validate("origem",       form.origem),
      destino:      validate("destino",      form.destino),
      dataAgendada: validate("dataAgendada", form.dataAgendada),
    };

    setErrors(newErrors);
    setTouched({ origem: true, destino: true, dataAgendada: true });

    if (Object.values(newErrors).some(Boolean)) return;

    await salvar(form);
  };

  const isValid =
    form.origem.trim().length >= 3 &&
    form.destino.trim().length >= 3 &&
    !!form.dataAgendada &&
    !Object.values(errors).some(Boolean);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-black">

      {/* Toast de sucesso */}
      {sucesso && (
        <div className="fixed top-6 right-6 z-50
                        bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl
                        flex items-center gap-3 animate-[toast-in_0.25s_ease]">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold text-sm">{sucesso}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <button
              onClick={() => navigate("/home")}
              className="hover:text-[#FE751B] transition-colors"
            >
              Viagens
            </button>
            <span>›</span>
            <span className="text-gray-900 dark:text-white font-medium">Nova Viagem</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Agendar Nova Viagem
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Preencha os dados abaixo. Lembrete automático será enviado 2 horas após o horário agendado.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#1C1C1C] rounded-xl shadow-sm
                        border border-gray-200 dark:border-[#2a2a2a] overflow-hidden">

          {/* Header do card */}
          <div className="bg-gray-50 dark:bg-[#151515] px-8 py-5
                          border-b border-gray-200 dark:border-[#2a2a2a]">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-4 h-4 text-[#FE751B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Informações da Viagem
            </h2>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="p-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

              {/* Origem */}
              <FieldWrapper
                label="Origem *"
                error={touched.origem ? errors.origem : undefined}
              >
                <input
                  type="text"
                  value={form.origem}
                  placeholder="Ex: São Paulo, SP"
                  onChange={(e) => handleChange("origem", e.target.value)}
                  onBlur={() => handleBlur("origem")}
                  className={inputCls(!!errors.origem && !!touched.origem)}
                />
              </FieldWrapper>

              {/* Destino */}
              <FieldWrapper
                label="Destino *"
                error={touched.destino ? errors.destino : undefined}
              >
                <input
                  type="text"
                  value={form.destino}
                  placeholder="Ex: Rio de Janeiro, RJ"
                  onChange={(e) => handleChange("destino", e.target.value)}
                  onBlur={() => handleBlur("destino")}
                  className={inputCls(!!errors.destino && !!touched.destino)}
                />
              </FieldWrapper>

              {/* Motorista */}
              <FieldWrapper label="Motorista">
                <div className="relative">
                  <select
                    value={form.motoristaId ?? ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        motoristaId: e.target.value || undefined,
                      }))
                    }
                    className={inputCls(false) + " appearance-none cursor-pointer pr-10"}
                  >
                    <option value="">Selecione um motorista</option>
                    {motoristas
                      .filter((m) => m.ativo)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nome} • {m.telefone}
                        </option>
                      ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4
                                  text-gray-400 pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </FieldWrapper>

              {/* Data e hora */}
              <FieldWrapper
                label="Data e Hora de Descarga *"
                error={touched.dataAgendada ? errors.dataAgendada : undefined}
              >
                <input
                  type="datetime-local"
                  value={form.dataAgendada}
                  onChange={(e) => handleChange("dataAgendada", e.target.value)}
                  onBlur={() => handleBlur("dataAgendada")}
                  className={inputCls(!!errors.dataAgendada && !!touched.dataAgendada)}
                />
              </FieldWrapper>

            </div>

            {/* Info box */}
            <div className="bg-blue-50 dark:bg-blue-500/10
                            border border-blue-200 dark:border-blue-500/30
                            rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Lembrete Automático WhatsApp
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    O sistema enviará automaticamente uma mensagem para o motorista{" "}
                    <strong>2 horas</strong> após o horário de descarga agendado,
                    perguntando se a carga já foi descarregada.
                  </p>
                </div>
              </div>
            </div>

            {/* Erro geral */}
            {erro && (
              <div className="bg-red-50 dark:bg-red-500/10
                              border border-red-200 dark:border-red-500/30
                              rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0"
                    fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-400 text-sm">
                      Erro ao criar viagem
                    </p>
                    <p className="text-red-700 dark:text-red-300 text-sm mt-0.5">{erro}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="flex items-center justify-end gap-3 pt-4
                            border-t border-gray-200 dark:border-[#2a2a2a]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={salvando}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold
                           bg-gray-100 dark:bg-gray-800
                           text-gray-700 dark:text-gray-300
                           hover:bg-gray-200 dark:hover:bg-gray-700
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={salvando || !isValid}
                className="px-8 py-2.5 rounded-lg text-sm font-semibold
                           flex items-center gap-2
                           bg-[#FE751B] text-white
                           hover:bg-[#e56510] hover:shadow-lg
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all"
              >
                {salvando && (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {salvando ? "Criando viagem..." : "Criar Viagem"}
              </button>
            </div>

          </form>
        </div>
      </div>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ── Sub-componentes ───────────────────────────────────────────────────────────

const inputCls = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg text-sm
   bg-gray-50 dark:bg-[#0d0d0d]
   border ${hasError
     ? "border-red-500"
     : "border-gray-300 dark:border-[#2a2a2a]"
   }
   text-gray-900 dark:text-white
   placeholder:text-gray-400 dark:placeholder:text-gray-600
   focus:outline-none focus:ring-2 focus:ring-[#FE751B]/50 focus:border-[#FE751B]
   transition-all`;

const FieldWrapper = ({
  label,
  error,
  children,
}: {
  label:    string;
  error?:   string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-[#FE751B] mb-2">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);