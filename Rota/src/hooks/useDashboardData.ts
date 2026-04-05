// src/hooks/useDashboardData.ts
// Orquestra chamadas, mapeia DTOs e entrega ViewModel pronto para a UI

import { useEffect, useState, useCallback } from "react";
import { buildDashboardData, type DashboardViewModel } from "../useCases/DashboarduUeCases";
import { mapEmpresaDTO, mapViagemDTO, mapMotoristaDTO, mapOnboardingDTO } from "../mappers/DashboardMappers";
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

      const empresa    = mapEmpresaDTO(empresaDTO);
      const viagens    = viagensDTO.map(mapViagemDTO).filter(Boolean) as NonNullable<ReturnType<typeof mapViagemDTO>>[];
      const motoristas = motoristasDTO.map(mapMotoristaDTO).filter(Boolean) as NonNullable<ReturnType<typeof mapMotoristaDTO>>[];
      const onboarding = onboardingDTO.map(mapOnboardingDTO).filter(Boolean) as NonNullable<ReturnType<typeof mapOnboardingDTO>>[];

      setData(buildDashboardData(empresa, viagens, motoristas, onboarding));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};