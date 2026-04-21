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

export type MotoristaUpdateInput = Omit<Motorista, "id"> & { id?: string };
export type MotoristaUpdatePayload = Omit<Motorista, "id">;
