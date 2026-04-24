// src/pages/motorista/MotoristaDadosPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../../components/PageShell/PageShell";
import { useMotoristaForm } from "./hooksMotorista/useMotorista";
import type { MotoristaUpdatePayload } from "./Types/motoristaTypes";


export const MotoristaDadosPage = () => {
  const { motoristas, salvando, erro, sucesso, salvar, excluir } = useMotoristaForm();
  const navigate = useNavigate();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<MotoristaUpdatePayload | null>(null);

  const startEdit = (index: number) => {
    setEditIndex(index);
    setForm({ ...motoristas[index] });
  };

  const handleSalvar = async () => {
    if (!form) return;
    await salvar(form);
    setEditIndex(null);
    setForm(null);
  };

  const handleCancelar = () => {
    setEditIndex(null);
    setForm(null);
  };

 
  if (!motoristas) {
    return <Skeleton />;
  }

  return (
    <PageShell
      titulo="Motoristas"
      subtitulo="Gerencie os motoristas vinculados às viagens."
      acao={
        <button
          onClick={() => navigate("/home")}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-black text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
        >
          ← Voltar ao Dashboard
        </button>
      }
    >
      {erro && <Feedback tipo="erro" msg={erro} />}
      {sucesso && <Feedback tipo="sucesso" msg="✓ Dados salvos com sucesso." />}

      <div className="flex flex-col gap-6">
        {motoristas.map((m, index) =>
          editIndex === index && form ? (
            <div key={m.id} className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6 flex flex-col gap-5">
              <Field label="Nome">
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="CPF">
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="CNH">
                <input
                  type="text"
                  value={form.cnh}
                  onChange={(e) => setForm({ ...form, cnh: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Telefone">
                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Placa do caminhão">
                <input
                  type="text"
                  value={form.placa_caminhao}
                  onChange={(e) => setForm({ ...form, placa_caminhao: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Modelo do caminhão">
                <input
                  type="text"
                  value={form.modelo_caminhao}
                  onChange={(e) => setForm({ ...form, modelo_caminhao: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Cor do caminhão">
                <input
                  type="text"
                  value={form.cor_caminhao}
                  onChange={(e) => setForm({ ...form, cor_caminhao: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Ano do caminhão">
                <input
                  type="number"
                  value={form.ano_caminhao}
                  onChange={(e) => setForm({ ...form, ano_caminhao: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>

              <div className="flex gap-2">
                <button
                  onClick={handleSalvar}
                  disabled={salvando}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </button>
                <button
                  onClick={handleCancelar}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-black text-red-500 border border-red-500 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div key={m.id} className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6">
              <p className="text-orange-500 font-semibold">Nome: <span className="text-white">{m.nome}</span></p>
              <p className="text-orange-500 font-semibold">CPF: <span className="text-white">{m.cpf}</span></p>
              <p className="text-orange-500 font-semibold">CNH: <span className="text-white">{m.cnh}</span></p>
              <p className="text-orange-500 font-semibold">Telefone: <span className="text-white">{m.telefone}</span></p>
              <p className="text-orange-500 font-semibold">Placa: <span className="text-white">{m.placa_caminhao}</span></p>
              <p className="text-orange-500 font-semibold">Modelo: <span className="text-white">{m.modelo_caminhao}</span></p>
              <p className="text-orange-500 font-semibold">Cor: <span className="text-white">{m.cor_caminhao}</span></p>
              <p className="text-orange-500 font-semibold">Ano: <span className="text-white">{m.ano_caminhao}</span></p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => startEdit(index)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-black text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(m.id)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-black text-red-500 border border-red-500 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          )
        )}
      </div>
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
