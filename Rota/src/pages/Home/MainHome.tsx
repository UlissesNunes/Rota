// src/pages/Home/MainHome.tsx
import { useEffect, useState, useCallback } from "react";
import { DashboardHome } from "./DashboardHome";
import { OnboardingHome } from "./OnboardingHome";
import { useAuth } from "../../contexts/useAuth";
import type { OnboardingState } from "../../types/Onboarding";

export const MainHome = () => {
  const { state } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOnboardingStatus = useCallback(async () => {
    if (!state?.user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("https://rhxmpvxkvneiaojprykq.supabase.co");
      if (!response.ok) throw new Error("Falha ao buscar status do onboarding");
      const data = await response.json();
      if (!data.onboarding) throw new Error("Resposta inválida da API");
      setOnboardingData(data.onboarding);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }, [state?.user]);

  useEffect(() => {
    fetchOnboardingStatus();
  }, [fetchOnboardingStatus]);

  if (loading) return <p>Carregando ambiente...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;
  if (!onboardingData) return <p className="text-red-600">Dados de onboarding indisponíveis.</p>;

  const onboardingCompleto = Object.values(onboardingData).every((section) =>
    Object.values(section).every((item) => item === true)
  );

  return onboardingCompleto ? (
    <DashboardHome user={state.user} />
  ) : (
    <OnboardingHome onboarding={onboardingData} />
  );
};