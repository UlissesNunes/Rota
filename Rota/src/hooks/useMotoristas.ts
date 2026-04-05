// src/hooks/useMotoristas.ts
// Exemplo de hook reutilizável para a página de motoristas
import { useEffect, useState, useCallback } from "react";
import type { Motorista } from "../domain/DashboardDomain";
import { compact, mapMotoristaDTO } from "../mappers/DashboardMappers";
import { fetchMotoristas } from "../services/DashboardMotoristaService";


type UseMotoristaReturn = {
  motoristas: Motorista[];
  loading:    boolean;
  error:      string | null;
  refetch:    () => void;
};

export const useMotoristas = (): UseMotoristaReturn => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dtos   = await fetchMotoristas();
      setMotoristas(compact(dtos.map(mapMotoristaDTO)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar motoristas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { motoristas, loading, error, refetch: fetchData };
};