// src/domains/motorista/pages/MotoristaDadosPage.tsx
import { useState } from "react";

import { DashboardLayout } from "../../components/DashboardLayout";
import { PageShell } from "../../components/PageShell/PageShell";
import type { Motorista, MotoristaUpdateInput } from "./Types/motoristaTypes";
import { useMotoristaForm } from "./hooksMotorista/useMotorista";


export const MotoristaDadosPage = () => {
  const { motoristas, salvando, erro, sucesso, salvar, excluir } = useMotoristaForm();
  

  const [formVisible, setFormVisible] = useState(false);
  const [editando, setEditando] = useState<Motorista | null>(null);
  const [form, setForm] = useState<MotoristaUpdateInput>(initialFormState);

  const handleSalvar = () => {
    if (editando) {
      salvar(form, editando);
      setEditando(null);
    } else {
      salvar(form);
    }
    setForm(initialFormState);
    setFormVisible(false);
  };

  const handleEditar = (m: Motorista) => {
    setEditando(m);
    setForm({
      nome: m.nome,
      cpf: m.cpf,
      cnh: m.cnh,
      telefone: m.telefone,
      ativo: m.ativo,
      modelo_caminhao: m.modelo_caminhao,
      ano_caminhao: m.ano_caminhao,
      cor_caminhao: m.cor_caminhao,
      placa_caminhao: m.placa_caminhao,
      id: m.id,
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
        {/* Lista de motoristas */}
        {!formVisible && (
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6">
            {motoristas.length === 0 ? (
              <p className="text-gray-500">
                Nenhum motorista cadastrado. Clique em “Criar Motorista” para adicionar.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
                {motoristas.map((m) => {
                  const motoFormatado: Motorista = {
                    id: m.id,
                    nome: m.nome,
                    cpf: m.cpf ,
                    cnh: m.cnh || "",
                    telefone: m.telefone || "",
                    ativo: m.ativo || true,
                    modelo_caminhao: m.modelo_caminhao || "",
                    ano_caminhao: m.ano_caminhao || 0,
                    cor_caminhao: m.cor_caminhao || "",
                    placa_caminhao: m.placa_caminhao || "",
                  };
                  return (
                    <li key={m.id} className="py-2 flex justify-between items-center">
                      <span>{m.nome} — {m.telefone} — {m.placa_caminhao}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditar(motoFormatado)} className="text-blue-600">Editar</button>
                        <button onClick={() => handleExcluir(m.id)} className="text-red-600">Excluir</button>
                      </div>
                    </li>
                  );
                })}
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

            <Field label="Nome completo *">
              <input type="text" placeholder="exe.: João Garcia Lima" minLength={10} maxLength={40}  value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputCls} />
            </Field>
            <Field label="CPF *">
             <input
               type="text"
              placeholder="123.456.789-00"
              value={form.cpf ?? ""}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
              className={inputCls}
             />
             </Field>

             <Field label="CNH *">
              <input
              type="text"
              placeholder="12345678900"
              value={form.cnh ?? ""}
              onChange={(e) => setForm({ ...form, cnh: e.target.value })}
              className={inputCls}
              />
             </Field>

            <Field label="Telefone *">
             <input
               type="text"
               placeholder="(11) 91234-5678"
               value={form.telefone ?? ""}
               onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className={inputCls}
                />
            </Field>
            <Field label="Ativo">
              <input type="checkbox" checked={form.ativo ?? true} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
            </Field>
            <Field label="Modelo do caminhão *">
              <input type="text" placeholder="exe.: Ford Transit" minLength={10} maxLength={60} value={form.modelo_caminhao ?? ""} onChange={(e) => setForm({ ...form, modelo_caminhao: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Ano do caminhão *">
              <input type="number" placeholder="exe.: 2020" minLength={4} maxLength={4} value={form.ano_caminhao ?? 0} onChange={(e) => setForm({ ...form, ano_caminhao: parseInt(e.target.value) || 0 })} className={inputCls} />
            </Field>
            <Field label="Cor do caminhão *">
              <input type="text" placeholder="exe.: Vermelho" minLength={3} maxLength={20} value={form.cor_caminhao ?? ""} onChange={(e) => setForm({ ...form, cor_caminhao: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Placa do caminhão *">
              <input type="text" placeholder="exe.: ABC-1234" minLength={7} maxLength={8} value={form.placa_caminhao ?? ""} onChange={(e) => setForm({ ...form, placa_caminhao: e.target.value })} className={inputCls} />
            </Field>

            {erro && <Feedback tipo="erro" msg={erro} />}
            {sucesso && <Feedback tipo="sucesso" msg="✓ Operação realizada com sucesso." />}

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

// Estado inicial do formulário
const initialFormState: MotoristaUpdateInput = {
  id: "",
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

// Helpers
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
  <p className={`text-[12px] rounded-lg px-3 py-2 border ${
    tipo === "erro"
      ? "text-red-600 bg-red-50 border-red-200"
      : "text-green-600 bg-green-50 border-green-200"
  }`}>
    {msg}
  </p>
);
