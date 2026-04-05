// src/useCases/dashboardUseCase.ts
// Regras de negócio puras — sem efeitos colaterais, sem imports do Supabase

import type { Empresa, Viagem, Motorista, OnboardingStep } from "../domain/DashboardDomain"; ;
import type { KPIViewModel, ChartViagemViewModel, ChartMotoristaViewModel } from "../types/DashboardViewModel";

export type DashboardViewModel = {
  empresa:          Empresa;
  kpis:             KPIViewModel[];
  chartViagens:     ChartViagemViewModel[];
  chartMotoristas:  ChartMotoristaViewModel[];
  onboarding:       OnboardingStep[];
};

export function buildDashboardData(
  empresa:    Empresa,
  viagens:    Viagem[],
  motoristas: Motorista[],
  onboarding: OnboardingStep[],
): DashboardViewModel {

  // KPIs
  const totalViagens       = viagens.reduce((acc, v) => acc + v.total, 0);
  const totalMotoristas    = motoristas.length;
  const onboardingConcluidos = onboarding.filter((s) => s.concluido).length;

  const kpis: KPIViewModel[] = [
    { label: "Viagens ativas",    value: totalViagens,         hint: "Total de viagens registradas"  },
    { label: "Motoristas",        value: totalMotoristas,      hint: "Equipe cadastrada"              },
    { label: "Entregas este mês", value: 0,                    hint: "Dados aparecerão aqui"          },
    { label: "Setup concluído",   value: onboardingConcluidos, hint: `de ${onboarding.length} passos` },
  ];

  // Gráfico de viagens — agrupa por categoria
  const viagensPorCategoria = viagens.reduce<Record<string, number>>((acc, v) => {
    acc[v.categoria] = (acc[v.categoria] ?? 0) + v.total;
    return acc;
  }, {});

  const chartViagens: ChartViagemViewModel[] = Object.entries(viagensPorCategoria).map(
    ([categoria, total]) => ({ categoria, total }),
  );

  // Gráfico de motoristas — agrupa por status
  const motoristasPorStatus = motoristas.reduce<Record<string, number>>((acc, m) => {
    acc[m.status] = (acc[m.status] ?? 0) + 1;
    return acc;
  }, {});

  const chartMotoristas: ChartMotoristaViewModel[] = Object.entries(motoristasPorStatus).map(
    ([name, value]) => ({ name, value }),
  );

  return { empresa, kpis, chartViagens, chartMotoristas, onboarding };
}