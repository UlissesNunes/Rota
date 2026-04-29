
// src/types/viewModel.ts
// Modelos prontos para componentes — nunca contêm lógica de negócio

export type KPIViewModel = {
  label: string;
  value: number | string;
  hint:  string;
};

export type ChartViagensViewModel = {
  categoria: string; // label do status (ex: "Em andamento")
  total:     number;
};

export type ChartMotoristaViewModel = {
  name:  string;
  value: number;
};

export type OnboardingStep = {
  id:        string;
  titulo:    string;
  descricao: string;
  rota:      string;
  acao:      string;
  concluido: boolean;
  ordem:     number;
};
