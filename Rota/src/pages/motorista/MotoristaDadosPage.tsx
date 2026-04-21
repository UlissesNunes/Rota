// src/domains/motorista/pages/MotoristaDadosPage.tsx
import { useState } from "react";

import { DashboardLayout } from "../../components/DashboardLayout";
import { PageShell } from "../../components/PageShell/PageShell";
import type { Motorista, MotoristaUpdateInput } from "./Types/motoristaTypes";
import { useMotoristaForm } from "./hooksMotorista/useMotorista";
import { useEmpresa } from "../../contexts/useEmpresa"; // hook correto

export const MotoristaDadosPage = () => {
 const { empresa } = useEmpresa();
const { motoristas, salvando, erro, sucesso, salvar, excluir } = useMotoristaForm();

const [formVisible, setFormVisible] = useState(false);
const [editando, setEditando] = useState<Motorista | null>(null);
const [form, setForm] = useState<MotoristaUpdateInput>(
  getInitialFormState(empresa?.id ?? "") // usa "" se ainda não carregou
);
const [mensagemErro, setMensagemErro] = useState<string | null>(null);

// Bloqueia renderização até empresa estar disponível
if (!empresa) {
  return (
    <DashboardLayout>
      <PageShell titulo="Motoristas" subtitulo="Gerencie motoristas e seus caminhões.">
        <p>Carregando dados da empresa...</p>
      </PageShell>
    </DashboardLayout>
  );
}
  const handleSalvar = async () => {
    if (!form.nome || !form.cpf || !form.cnh || !form.telefone) {
      setMensagemErro("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    setMensagemErro(null);

    try {
      const payload = { ...form, empresa_id: empresa.id }; // empresa_id sempre válido

      if (editando) {
        await salvar(payload, editando);
        setEditando(null);
      } else {
        await salvar(payload);
      }

      setForm(getInitialFormState(empresa.id));
      setFormVisible(false);
    } catch (err) {
      setMensagemErro(err instanceof Error ? err.message : "Erro inesperado ao salvar motorista.");
    }
  };

  const handleEditar = (m: Motorista) => {
    setEditando(m);
    setForm({
      empresa_id: empresa.id,
      nome: m.nome,
      cpf: m.cpf,
      cnh: m.cnh,
      telefone: m.telefone,
      ativo: m.ativo,
      modelo_caminhao: m.modelo_caminhao,
      ano_caminhao: m.ano_caminhao,
      cor_caminhao: m.cor_caminhao,
      placa_caminhao: m.placa_caminhao,
    });
    setFormVisible(true);
  };

  const handleExcluir = (id: string) => excluir(id);

  return (
    <DashboardLayout>
      <PageShell
        titulo="Motoristas"
        subtitulo="Gerencie motoristas e seus caminhões."
        acao={
          <button
            onClick={() => setFormVisible(true)}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FE751B] text-white hover:bg-[#e56510] transition-colors"
          >
            + Criar Motorista
          </button>
        }
      >
        {/* Lista */}
        {!formVisible && (
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6">
            {motoristas.length === 0 ? (
              <p className="text-gray-500">
                Nenhum motorista cadastrado. Clique em “Criar Motorista” para adicionar.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
                {motoristas.map((m) => (
                  <li key={m.id} className="py-2 flex justify-between items-center">
                    <span>{m.nome} — {m.telefone} — {m.placa_caminhao}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditar(m)} className="text-blue-600">Editar</button>
                      <button onClick={() => handleExcluir(m.id)} className="text-red-600">Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Formulário */}
        {formVisible && (
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6 flex flex-col gap-5">
            <h2 className="text-lg font-semibold">
              {editando ? "Editar Motorista" : "Novo Motorista"}
            </h2>

            {/* Campos */}
            <Field label="Nome completo *">
              <input type="text" value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className={inputCls} />
            </Field>
            <Field label="CPF *">
              <input type="text" value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                className={inputCls} />
            </Field>
            <Field label="CNH *">
              <input type="text" value={form.cnh}
                onChange={(e) => setForm({ ...form, cnh: e.target.value })}
                className={inputCls} />
            </Field>
            <Field label="Telefone *">
              <input type="text" value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className={inputCls} />
            </Field>
            <Field label="Ativo">
              <input type="checkbox" checked={form.ativo}
                onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
            </Field>
            <Field label="Modelo do caminhão *">
              <input type="text" value={form.modelo_caminhao}
                onChange={(e) => setForm({ ...form, modelo_caminhao: e.target.value })}
                className={inputCls} />
            </Field>
            <Field label="Ano do caminhão *">
              <input type="number" value={form.ano_caminhao}
                onChange={(e) => setForm({ ...form, ano_caminhao: parseInt(e.target.value) || 0 })}
                className={inputCls} />
            </Field>
            <Field label="Cor do caminhão *">
              <input type="text" value={form.cor_caminhao}
                onChange={(e) => setForm({ ...form, cor_caminhao: e.target.value })}
                className={inputCls} />
            </Field>
            <Field label="Placa do caminhão *">
              <input type="text" value={form.placa_caminhao}
                onChange={(e) => setForm({ ...form, placa_caminhao: e.target.value })}
                className={inputCls} />
            </Field>

            {/* Feedback */}
            {mensagemErro && <Feedback tipo="erro" msg={mensagemErro} />}
            {erro && <Feedback tipo="erro" msg={erro} />}
            {sucesso && <Feedback tipo="sucesso" msg="✓ Motorista salvo com sucesso." />}

            <div className="flex gap-3">
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#FE751B] text-white hover:bg-[#e56510] disabled:opacity-50 transition-colors"
              >
                {salvando ? "Salvando..." : editando ? "Atualizar Motorista" : "Salvar Motorista"}
              </button>
              <button
                onClick={() => { setFormVisible(false); setEditando(null); }}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </PageShell>
    </DashboardLayout>
  );
};

function getInitialFormState(empresaId: string): MotoristaUpdateInput {
  return {
    empresa_id: empresaId,
    nome: "",
    cpf: "",
    cnh: "",
    telefone: "",
    ativo: true,
    modelo_caminhao: "",
    ano_caminhao: 0,
    cor_caminhao: "",
    placa_caminhao: "",
  };
}

const inputCls = `w-full px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-neutral-800 border text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-[#FE751B]/30 transition`;
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
      {label}
    </label>
    {children}
  </div>
);

const Feedback = ({ tipo, msg }: { tipo: "erro" | "sucesso"; msg: string }) => (
  <div
    className={`px-4 py-2 rounded-lg text-sm ${
      tipo === "erro" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
    }`}
  >
    {msg}
  </div>
);