// src/contexts/MotoristaContext.tsx
import { createContext } from "react";

// Estrutura vinda do banco
export type MotoristaDb = {
  id: string;
  empresa_id: string;
  placa_caminhao: string;
  cor_caminhao: string;
  ano_caminhao: number;
  cpf: string;
  modelo_caminhao: string;
  nome: string;
  cnh: string;
  telefone: string;
  ativo: boolean;
};

// Estado derivado — usado em guards e UI
export type MotoristaEstado = MotoristaDb & {
  configurado: boolean; // nome != "Novo Motorista" && cnh preenchido
};

export type MotoristaContextType = {
  motoristas: MotoristaEstado[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const MotoristaContext = createContext<MotoristaContextType | null>(null);
