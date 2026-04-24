export type PlanoTipo = "gratuito" | "pro" | "enterprise";

export type Empresa = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cnpj: string;
  endereco: string;
  plano: PlanoTipo;
};

// Formulário controlado: todos os campos obrigatórios
export type EmpresaUpdateInput = {
  nome: string;
  email: string;
  whatsapp: string;
  cnpj: string;
  endereco: string;
};

// Payload para API: PATCH real

export type EmpresaUpdatePayload = Partial<
  Pick<Empresa, "nome" | "cnpj" | "email" | "whatsapp" | "endereco" | "plano">
>;