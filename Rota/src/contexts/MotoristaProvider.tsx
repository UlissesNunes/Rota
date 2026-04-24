// src/contexts/MotoristaProvider.tsx
import { type ReactNode, useState, useCallback, useEffect } from "react";
import { supabase } from "../infra/superBaseClient";
import { MotoristaContext, type MotoristaDb, type MotoristaEstado } from "./MotoristaContext";

export const MotoristaProvider = ({ children }: { children: ReactNode }) => {
  const [motoristas, setMotoristas] = useState<MotoristaEstado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotoristas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw new Error(userErr.message);

      const user = userData?.user;
      if (!user) {
        setMotoristas([]); // limpa ao deslogar
        return;
      }

      const { data, error: motoristaErr } = await supabase
        .from("motoristas")
        .select("id, nome, cnh, telefone, empresa_id, cpf, placa_caminhao, cor_caminhao, ano_caminhao, modelo_caminhao, ativo")
        .eq("user_id", user.id);

      if (motoristaErr) throw new Error(motoristaErr.message);

      const motoristasDb: MotoristaDb[] = data ?? [];

      // converte para MotoristaEstado
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
  }, []);

  useEffect(() => {
    fetchMotoristas();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setMotoristas([]); // limpa ao deslogar
      } else {
        fetchMotoristas();
      }
    });

    return () => subscription?.subscription.unsubscribe();
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
