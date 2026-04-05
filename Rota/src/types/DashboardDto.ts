// src/types/dto.ts
// Tipos brutos vindos do Supabase — nunca usar diretamente na UI

// src/types/dto.ts
// Espelha EXATAMENTE as colunas selecionadas em cada service
// Nunca usar diretamente na UI — sempre mapear para Domain

export type EmpresaDTO = {
  id:         string;
  nome:       string | null;
  email:      string | null;
  whatsapp:   string | null;
  plano:      string | null;
  deleted_at: string | null;
};

export type ViagensDTO = {
  id:           string;
  origem:       string | null;
  destino:      string | null;
  status:       string | null;
  motorista_id: string | null;
  created_at:   string | null;
  deleted_at:   string | null;
};

export type MotoristaDTO = {
  id:         string;
  nome:       string | null;
  telefone:   string | null;
  status:     string | null;
  deleted_at: string | null;
};

export type ProdutoDTO = {
  id:         string;
  nome:       string | null;
  unidade:    string | null;
  deleted_at: string | null;
};

export type OnboardingStepDTO = {
  id:        string;
  titulo:    string | null;
  descricao: string | null;
  rota:      string | null;
  acao:      string | null;
  concluido: boolean | null;
  ordem:     number | null;
};