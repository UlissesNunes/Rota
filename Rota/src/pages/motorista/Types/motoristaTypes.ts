// src/pages/motorista/Types/MotoristaTypes.ts

export type Motorista = {
  id: string;
  empresa_id: string; // obrigatório
  nome: string;
  cpf: string;
  cnh: string;
  telefone: string;
  ativo: boolean;
  modelo_caminhao: string;
  ano_caminhao: number;
  cor_caminhao: string;
  placa_caminhao: string;
};

// usado em formulários (id opcional)
export type MotoristaUpdateInput = {
  id?: string;
  empresa_id: string;
  nome: string;
  cpf: string;
  cnh: string;
  telefone: string;
  ativo: boolean;
  modelo_caminhao: string;
  ano_caminhao: number;
  cor_caminhao: string;
  placa_caminhao: string;
};

// payload para update no banco (id nunca incluído)
export type MotoristaUpdatePayload = Omit<Motorista, "id">;
