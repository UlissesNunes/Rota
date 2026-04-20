export type Motorista = {
 placa_caminhao: string ;
  cor_caminhao: string;
  ano_caminhao: number;
  cpf: string;
  modelo_caminhao: string;
  nome?: string;
  cnh?: string;
  telefone?: string;
  ativo?: boolean;
  id : string;
};


export type MotoristaUpdateInput = Omit<Motorista, "id"> & { id?: string };
export type MotoristaUpdatePayload = Omit<Motorista, "id">;

