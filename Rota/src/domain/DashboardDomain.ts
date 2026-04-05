// src/types/domain.ts
// Modelos de negócio estáveis — a UI e os hooks dependem daqui

export type PlanoTipo = 'gratuito' | 'pro' | 'enterprise';

export type Empresa = {
  id:       string;
  nome:     string;
  email:    string;
  whatsapp: string;
  plano:    PlanoTipo;
};

export type ViagensStatus = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';

export type Viagens = {
  id:          string;
  origem:      string;
  destino:     string;
  status:      ViagensStatus;
  motoristaId: string | null;
  criadoEm:    string; // ISO — created_at
};

export type MotoristaStatus = 'Ativo' | 'Inativo';

export type Motorista = {
  id:       string;
  nome:     string;
  telefone: string;
  status:   MotoristaStatus;
};

export type UnidadeProduto = 'un' | 'kg' | 'ton' | 'cx' | 'pallet' | 'lt' | 'm3';

export type Produto = {
  id:      string;
  nome:    string;
  unidade: UnidadeProduto;
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