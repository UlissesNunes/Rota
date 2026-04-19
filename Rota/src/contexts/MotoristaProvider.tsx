// src/contexts/MotoristaProvider.tsx
import { useState, useCallback, useEffect, type ReactNode } from "react";
import { supabase } from "../infra/superBaseClient";
import { MotoristaContext, type Motorista } from "./MotoristaContext";

export const MotoristaProvider = ({ children }: { children: ReactNode }) => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotoristas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.from("motoristas").select("*");
      if (error) throw new Error(error.message);

      setMotoristas(data as Motorista[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar motoristas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMotoristas(); }, [fetchMotoristas]);

  return (
    <MotoristaContext.Provider value={{ motoristas, loading, error, refetch: fetchMotoristas }}>
      {children}
    </MotoristaContext.Provider>
  );
};
