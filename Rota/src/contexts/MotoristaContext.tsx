// src/contexts/MotoristaContext.tsx
import { createContext } from "react";

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
  id: string;
};

export type MotoristaContextType = {
  motoristas: Motorista[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const MotoristaContext = createContext<MotoristaContextType | null>(null);
