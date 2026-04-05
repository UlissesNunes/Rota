// src/types/viewModel.ts
// Modelos prontos para a UI — nunca contêm lógica de negócio

export type KPIViewModel = {
  label: string;
  value: number | string;
  hint: string;
};

export type ChartViagemViewModel = {
  categoria: string;
  total: number;
};

export type ChartMotoristaViewModel = {
  name: string;
  value: number;
};