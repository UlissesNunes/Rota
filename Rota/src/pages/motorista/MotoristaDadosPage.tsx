// src/pages/motorista/MotoristaDadosPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../../components/PageShell/PageShell";
import { useMotoristaCtx } from "../../contexts/useMotoristaCtx";
import { motoristaService } from "./Service/motoristaService";
import type { MotoristaUpdatePayload } from "./Types/motoristaTypes";
import { useEmpresa } from "../../contexts/useEmpresa";


export const MotoristaDadosPage = () => {
  const { motoristas, loading, error, refetch } = useMotoristaCtx();
  const navigate = useNavigate();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<MotoristaUpdatePayload | null>(null);
    const { empresa } = useEmpresa(); 
  const startEdit = (index: number) => {
    setEditIndex(index);
    const m = motoristas[index];
    setForm({
      empresa_id: m.empresa_id,
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
  };

 const startCreate = () => {
    if (!empresa) return; // segurança
    setEditIndex(-1);
    setForm({
      empresa_id: empresa.id, // 🔑 sempre usar empresa.id
      nome: "",
      cpf: "",
      cnh: "",
      telefone: "",
      ativo: true,
      modelo_caminhao: "",
      ano_caminhao: new Date().getFullYear(),
      cor_caminhao: "",
      placa_caminhao: "",
    });
  };

  const handleSalvar = async () => {
    if (!form) return;
    if (editIndex === -1) {
      await motoristaService.create(form, form.empresa_id);
    } else if (editIndex !== null) {
      await motoristaService.update(motoristas[editIndex].id, form, form.empresa_id);
    }
    await refetch();
    setEditIndex(null);
    setForm(null);
  };

  const handleCancelar = () => {
    setEditIndex(null);
    setForm(null);
  };

  const handleExcluir = async (id: string) => {
  if (!empresa) return;
  await motoristaService.delete(id, empresa.id);
  await refetch();
};


  if (loading) return <Skeleton />;
  if (error) return <Feedback tipo="erro" msg={error} />;

  return (
    <PageShell
      titulo="Motoristas"
      subtitulo="Gerencie os motoristas vinculados à empresa."
      acao={
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-black text-orange-500 border border-orange-500 hover:bg-orange-600 hover:text-white transition-colors"
          >
            ← Voltar ao Dashboard
          </button>
          <button
            onClick={startCreate}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-black text-green-500 border border-green-500 hover:bg-green-600 hover:text-white transition-colors"
          >
            + Adicionar Motorista
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {editIndex !== null && form ? (
          <div className="bg-neutral-900 border border-orange-500/30 rounded-xl p-6 flex flex-col gap-5">
            {Object.entries(form).map(([key, value]) => (
              <Field key={key} label={key}>
                <input
                  type={typeof value === "number" ? "number" : "text"}
                  value={value as string | number}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: typeof value === "number" ? Number(e.target.value) : e.target.value,
                    })
                  }
                  className={inputCls}
                />
              </Field>
            ))}
            <div className="flex gap-2">
              <button
                onClick={handleSalvar}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                Salvar
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
          motoristas.map((m, index) => (
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
                  onClick={() => handleExcluir(m.id)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-black text-red-500 border border-red-500 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
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