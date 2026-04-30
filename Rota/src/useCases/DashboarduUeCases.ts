// src/useCases/dashboardUseCase.ts

import type { Empresa, OnboardingStep, Viagens, Motorista } from "../domain/DashboardDomain";
import type { KPIViewModel, ChartViagensViewModel, ChartMotoristaViewModel } from "../types/DashboardViewModel";

export type DashboardViewModel = {
  empresa:         Empresa;
  kpis:            KPIViewModel[];
  chartViagens:    ChartViagensViewModel[];
  chartMotoristas: ChartMotoristaViewModel[];
  onboarding:      OnboardingStep[];
};

const STATUS_LABEL: Record<string, string> = {
  pendente:     "Pendente",
  em_andamento: "Em andamento",
  concluida:    "Concluída",
  cancelada:    "Cancelada",
};

export function buildDashboardData(
  empresa:    Empresa,
  viagens:    Viagens[],
  motoristas: Motorista[],
  onboarding: OnboardingStep[],
): DashboardViewModel {

  const viagensAtivas     = viagens.filter((v) => v.status === "em_andamento").length;
  const viagensConcluidas = viagens.filter((v) => v.status === "concluida").length;
  const viagensFinalizadas = viagens.filter(
    (v) => v.status === "concluida" || v.status === "cancelada"
  ).length;

  // Taxa de conclusão = concluídas / (concluídas + canceladas) × 100
  // Retorna 0 quando não há viagens finalizadas para evitar NaN
  const taxaConclusao = viagensFinalizadas > 0
    ? Math.round((viagensConcluidas / viagensFinalizadas) * 100)
    : 0;

  const kpis: KPIViewModel[] = [
    {
      label: "Viagens ativas",
      value: viagensAtivas || 0,
      hint:  "Em andamento agora",
    },
    {
      label: "Motoristas",
      value: motoristas.length || 0,
      hint:  "Equipe cadastrada",
    },
    {
      label: "Entregas concluídas",
      value: viagensConcluidas || 0,
      hint:  "Total histórico",
    },
    {
      label: "Taxa de conclusão",
      value: taxaConclusao,
      hint:  viagensFinalizadas > 0
        ? `${viagensConcluidas} de ${viagensFinalizadas} finalizadas`
        : "Nenhuma viagem finalizada",
    },
  ];

  // Agrupa viagens por status para o gráfico de barras
  const porStatus = viagens.reduce<Record<string, number>>((acc, v) => {
    const label = STATUS_LABEL[v.status] ?? v.status;
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});

  const chartViagens: ChartViagensViewModel[] = Object.entries(porStatus)
    .map(([categoria, total]) => ({ categoria, total }));

  // Agrupa motoristas por status para o gráfico de rosca
  const porStatusMot = motoristas.reduce<Record<string, number>>((acc, m) => {
    acc[m.status] = (acc[m.status] ?? 0) + 1;
    return acc;
  }, {});

  const chartMotoristas: ChartMotoristaViewModel[] = Object.entries(porStatusMot)
    .map(([name, value]) => ({ name, value }));

  return { empresa, kpis, chartViagens, chartMotoristas, onboarding };
}