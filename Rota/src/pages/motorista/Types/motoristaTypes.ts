export type Motorista = {
 placa_caminhao: string ;
  cor_caminhao: string;
  ano_caminhao: number;
  cpf: string;
  modelo_caminhao: string;
  nome: string;
  cnh: string;
  telefone: string;
  ativo: boolean;
  id : string;
};


export type MotoristaUpdateInput = {
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
export type MotoristaUpdatePayload = {
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

