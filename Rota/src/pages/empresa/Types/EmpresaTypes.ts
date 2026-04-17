// src/domains/empresa/types/empresa.types.ts

export type PlanoTipo = "gratuito" | "pro" | "enterprise";

export type Empresa = {
  id:       string;
  nome:     string;
  email:    string;
  whatsapp: string;
  plano:    PlanoTipo;
};

// FIX #1: todos os campos opcionais — permite PATCH real
// Nenhum campo obrigatório — o useCase normaliza e valida o que foi enviado
export type EmpresaUpdateInput = {
  nome?:     string;
  email?:    string | null;
  whatsapp?: string | null;
};

// O que realmente é enviado ao banco após normalização no useCase
// Campos undefined são excluídos — nunca sobrescrevem dados existentes
export type EmpresaUpdatePayload = {
  nome?:     string;
  email?:    string | null;
  whatsapp?: string | null;
};