// src/domains/empresa/types/empresa.types.ts

export type PlanoTipo = "gratuito" | "pro" | "enterprise";

export type Empresa = {
  id:       string;
  nome:     string;
  email:    string;
  whatsapp: string;
  plano:    PlanoTipo;
};

export type EmpresaUpdateInput = {
  nome:     string;
  email:    string;
  whatsapp: string;
};