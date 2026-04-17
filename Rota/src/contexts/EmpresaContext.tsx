// src/contexts/EmpresaContext.tsx
// Estado global da empresa — usado por dashboard, sidebar e guards de rota
// Carrega UMA VEZ e distribui via context

import { createContext } from "react";



// ── Tipos ─────────────────────────────────────────────────────────────────────

export type EmpresaEstado = {
  cnpj: string;
  endereco: string;
  id:             string;
  nome:           string;
  email:          string;
  whatsapp:       string;
  plano:          "gratuito" | "pro" | "enterprise";

  // Estado derivado — usado por guards e sidebar
  temMotoristas:  boolean;
  temProdutos:    boolean;
  temViagens:     boolean;
  configurada:    boolean;  // nome != "Nova Empresa" && whatsapp preenchido
  temPlanoAtivo:  boolean;  // plano != "gratuito"
};

export type EmpresaContextType = {
  empresa:  EmpresaEstado | null;
  loading:  boolean;
  error:    string | null;
  refetch:  () => void;
};

// ── Context ───────────────────────────────────────────────────────────────────

export const EmpresaContext = createContext<EmpresaContextType | null>(null);




