// src/types/domain.ts
// Modelos de negócio — fonte de verdade da aplicação

export type Empresa = {
  id: string;
  nome: string;
  email: string;
};

export type Viagem = {
  id: string;
  categoria: string;
  total: number;
  data: string;
};

export type MotoristaStatus = "Ativo" | "Inativo";

export type Motorista = {
  id: string;
  nome: string;
  status: MotoristaStatus;
};

export type OnboardingStep = {
  id: string;
  titulo: string;
  descricao: string;
  rota: string;
  acao: string;
  concluido: boolean;
};