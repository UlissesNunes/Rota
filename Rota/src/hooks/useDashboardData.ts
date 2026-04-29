// src/hooks/useDashboardData.ts
import { useEffect, useState, useCallback } from "react";
import { useEmpresa } from "../contexts/useEmpresa";

import {
  mapEmpresaDTO,
  mapViagensDTO,
  mapMotoristaDTO,
  mapOnboardingDTO,
  compact,
} from "../mappers/DashboardMappers";


import { fetchEmpresa } from "../services/DashboardEmpresaService";
import { fetchMotoristas } from "../services/DashboardMotoristaService";
import { fetchOnboardingSteps } from "../services/DashboardOnboardingServices";
import { fetchViagens } from "../services/DashboardViagensService";
import { buildDashboardData, type DashboardViewModel } from "../useCases/DashboarduUeCases";

export type UseDashboardDataReturn = {
  data:    DashboardViewModel | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
};

export const useDashboardData = (): UseDashboardDataReturn => {
  const { empresa } = useEmpresa(); // 🔑 hook chamado no topo

  const [data,    setData]    = useState<DashboardViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (!empresa) {
        setData(null);
        return;
      }

      setLoading(true);
      setError(null);

      const [empresaDTO, viagensDTO, motoristasDTO, onboardingDTO] = await Promise.all([
        fetchEmpresa(empresa.id),
        fetchViagens(empresa.id),
        fetchMotoristas(empresa.id),
        fetchOnboardingSteps(empresa.id),
      ]);

      setData(buildDashboardData(
        mapEmpresaDTO(empresaDTO),
        compact(viagensDTO.map(mapViagensDTO)),
        compact(motoristasDTO.map(mapMotoristaDTO)),
        compact(onboardingDTO.map(mapOnboardingDTO)),
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [empresa]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
