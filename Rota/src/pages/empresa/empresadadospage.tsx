import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../../components/PageShell/PageShell";
import { useEmpresaForm } from "./hooksEmpresa/useEmpresa";
import type { EmpresaUpdatePayload } from "./Types/EmpresaTypes";

export const EmpresaDadosPage = () => {
  const { empresa, salvando, erro, sucesso, salvar } = useEmpresaForm();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: empresa?.nome ?? "",
    cnpj: empresa?.cnpj ?? "",
    email: empresa?.email ?? "",
    whatsapp: empresa?.whatsapp ?? "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const normalizeWhatsapp = (value: string): string =>
    value.replace(/\D/g, "").slice(0, 11);

  const normalizeCnpj = (value: string): string =>
    value.replace(/\D/g, "").slice(0, 14);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 100;

  const handleSalvar = async (): Promise<void> => {
    const payload: EmpresaUpdatePayload = {};

    if (form.nome !== empresa?.nome) payload.nome = form.nome.trim();

    if (form.cnpj !== empresa?.cnpj) {
      const cnpj = normalizeCnpj(form.cnpj);
      if (cnpj.length !== 14) {
        alert("CNPJ deve ter exatamente 14 dígitos.");
        return;
      }
      payload.cnpj = cnpj;
    }

    if (form.email !== empresa?.email) {
      if (!validateEmail(form.email)) {
        alert("E-mail inválido. Deve conter @ e domínio válido.");
        return;
      }
      payload.email = form.email.trim();
    }

    if (form.whatsapp !== empresa?.whatsapp) {
      const whatsapp = normalizeWhatsapp(form.whatsapp);
      if (whatsapp.length < 10 || whatsapp.length > 11) {
        alert("WhatsApp deve ter 10 ou 11 dígitos.");
        return;
      }
      payload.whatsapp = whatsapp;
    }

    payload.endereco = `${form.rua}, ${form.bairro}, ${form.cidade} - ${form.estado}, ${form.cep}`;

    await salvar(payload);
    setIsEditing(false); // volta para visualização após salvar
  };

  if (!empresa) return <Skeleton />;

  return (
    <PageShell
      titulo="Dados da empresa"
      subtitulo="Essas informações são usadas nas automações e relatórios."
      acao={
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-black text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
          >
            ← Voltar ao Dashboard
          </button>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-black text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
            >
              Editar
            </button>
          )}
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-black text-red-500 border border-red-500 hover:bg-red-600 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      }
    >
      {erro && <Feedback tipo="erro" msg={erro} />}
      {sucesso && <Feedback tipo="sucesso" msg="✓ Dados salvos com sucesso." />}

      {isEditing ? (
        <div className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6 flex flex-col gap-5">
          <Field label="Nome da empresa *">
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="CNPJ *">
            <input
              type="text"
              value={form.cnpj}
              onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
              placeholder="00.000.000/0001-00"
              className={inputCls}
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="contato@empresa.com"
              className={inputCls}
            />
          </Field>

          <Field label="WhatsApp (com DDD) *">
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              placeholder="(11) 99999-9999"
              className={inputCls}
            />
          </Field>

          <Field label="Rua">
            <input
              type="text"
              value={form.rua}
              onChange={(e) => setForm({ ...form, rua: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Bairro">
            <input
              type="text"
              value={form.bairro}
              onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Cidade">
            <input
              type="text"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="Estado">
            <input
              type="text"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field label="CEP">
            <input
              type="text"
              value={form.cep}
              onChange={(e) => setForm({ ...form, cep: e.target.value })}
              placeholder="00000-000"
              className={inputCls}
            />
          </Field>

          <button
            onClick={handleSalvar}
            disabled={salvando}
            className="w-full py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {salvando ? "Salvando..." : "Salvar dados"}
          </button>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6">
          <p className="text-orange-500 font-semibold">Nome: <span className="text-white">{empresa.nome}</span></p>
          <p className="text-orange-500 font-semibold">CNPJ: <span className="text-white">{empresa.cnpj}</span></p>
          <p className="text-orange-500 font-semibold">E-mail: <span className="text-white">{empresa.email}</span></p>
          <p className="text-orange-500 font-semibold">WhatsApp: <span className="text-white">{empresa.whatsapp}</span></p>
          <p className="text-orange-500 font-semibold">Endereço: <span className="text-white">{empresa.endereco}</span></p>
        </div>
      )}
    </PageShell>
  );
};

const inputCls = `
  w-full px-3 py-2 rounded-lg text-sm
  bg-black text-orange-500
  border border-orange-500
  placeholder:text-gray-400
  focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition
`;

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-orange-500">
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
      <p className="text-center text-gray-500 dark:text-neutral-400">
        Carregando dados...
      </p>
    <div className="h-6 w-48 rounded bg-gray-200 dark:bg-neutral-800" />
    <div className="h-64 rounded-xl bg-gray-200 dark:bg-neutral-800" />
  </div>
);
