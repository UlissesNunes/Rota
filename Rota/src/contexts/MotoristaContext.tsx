// src/contexts/MotoristaContext.tsx
import { createContext } from "react";

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
  id: string;
};

export type MotoristaContextType = {
  motoristas: Motorista[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const MotoristaContext = createContext<MotoristaContextType | null>(null);
