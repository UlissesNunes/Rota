// src/hooks/useDashboardData.ts
import { useEffect, useState, useCallback } from "react";

import {
  mapEmpresaDTO,
  mapViagensDTO,
  mapMotoristaDTO,
  mapOnboardingDTO,
  compact,
} from "../mappers/DashboardMappers";
import { buildDashboardData, type DashboardViewModel } from "../useCases/DashboarduUeCases";
import { fetchEmpresa } from "../services/DashboardEmpresaService";
import { fetchMotoristas } from "../services/DashboardMotoristaService";
import { fetchOnboardingSteps } from "../services/DashboardOnboardingServices";
import { fetchViagens } from "../services/DashboardViagensService";

type UseDashboardDataReturn = {
  data:    DashboardViewModel | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
};

export const useDashboardData = (): UseDashboardDataReturn => {
  const [data,    setData]    = useState<DashboardViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [empresaDTO, viagensDTO, motoristasDTO, onboardingDTO] = await Promise.all([
        fetchEmpresa(),
        fetchViagens(),
        fetchMotoristas(),
        fetchOnboardingSteps(),
      ]);

      setData(buildDashboardData(
        mapEmpresaDTO(empresaDTO),
        compact(viagensDTO.map(mapViagensDTO)),
        compact(motoristasDTO.map(mapMotoristaDTO)),
        compact(onboardingDTO.map(mapOnboardingDTO)),
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};