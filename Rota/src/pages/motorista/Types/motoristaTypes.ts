export type Motorista = {
 placaCaminhao: string ;
  corCaminhao: string;
  anoCaminhao: number;
  cpf: number;
  modeloCaminhao: string;
  nome?: string;
  cnh?: number;
  telefone?: number;
  ativo?: boolean;
  id : string;
};

export type MotoristaUpdateInput = {
  placaCaminhao: string ;
  corCaminhao: string;
  anoCaminhao: number;
  cpf: number;
  modeloCaminhao: string;
  nome?: string;
  cnh?: number;
  telefone?: number;
  ativo?: boolean;
  id : string;
};

export type MotoristaUpdatePayload = {
   placaCaminhao: string;
  corCaminhao: string;
  anoCaminhao: number;
  cpf: number;
  modeloCaminhao: string;
  nome?: string;
  cnh?: number;
  telefone?: number;
  ativo?: boolean;
  id : string;
};
