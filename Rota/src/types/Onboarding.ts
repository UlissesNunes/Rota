// src/types/Onboarding.ts
export type OnboardingState = {
  empresa: { dados: boolean; tamanho: boolean; endereco: boolean; telefone: boolean };
  equipe: { motoristas: boolean; funcionarios: boolean };
  produtos: { servicos: boolean; categorias: boolean };
  sistema: { configuracoes: boolean; notificacoes: boolean; tema: boolean };
  financeiro: { plano: boolean; pagamentos: boolean };
  Painel: { CriarRota: boolean; gestaodefrota: boolean; relatorios: boolean };
};