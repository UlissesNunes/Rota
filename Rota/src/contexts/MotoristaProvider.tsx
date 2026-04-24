// src/contexts/MotoristaProvider.tsx
import { type ReactNode, useState, useCallback, useEffect} from "react";
import { supabase } from "../infra/superBaseClient";
import { MotoristaContext, type MotoristaDb, type MotoristaEstado } from "./MotoristaContext";

import { useEmpresa } from "./useEmpresa";
// 🔑 para pegar empresa atual

export const MotoristaProvider = ({ children }: { children: ReactNode }) => {
  const { empresa } = useEmpresa(); // pega empresa logada
  const [motoristas, setMotoristas] = useState<MotoristaEstado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotoristas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!empresa) {
        setMotoristas([]);
        return;
      }

      const { data, error: motoristaErr } = await supabase
        .from("motoristas")
        .select("id, nome, cnh, telefone, empresa_id, cpf, placa_caminhao, cor_caminhao, ano_caminhao, modelo_caminhao, ativo")
        .eq("empresa_id", empresa.id); // 🔑 filtro correto

      if (motoristaErr) throw new Error(motoristaErr.message);

      const motoristasDb: MotoristaDb[] = data ?? [];

      const motoristasEstado: MotoristaEstado[] = motoristasDb.map((m) => ({
        ...m,
        configurado: m.nome !== "Novo Motorista" && m.cnh.trim().length > 0,
      }));

      setMotoristas(motoristasEstado);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar motoristas");
      setMotoristas([]);
    } finally {
      setLoading(false);
    }
  }, [empresa]);

  useEffect(() => {
    fetchMotoristas();
  }, [fetchMotoristas]);

  return (
    <MotoristaContext.Provider
      value={{
        motoristas,
        loading,
        error,
        refetch: fetchMotoristas,
      }}
    >
      {children}
    </MotoristaContext.Provider>
  );
};
