// src/domains/empresa/services/empresa.service.ts
// FIX #2: update() NÃO recebe userId — RLS filtra por user_id = auth.uid() automaticamente
// A política "empresas_update" no banco garante que só a própria empresa é atualizada


import { supabase } from "../../../infra/superBaseClient";
import type { Empresa, EmpresaUpdatePayload } from "../Types/EmpresaTypes";
export const empresaService = {
  // Leitura: RLS filtra por user_id = auth.uid() — sem parâmetros necessários
// src/domains/empresa/services/empresa.service.ts

  async fetch(): Promise<Empresa | null> {
    const { data, error } = await supabase
      .from("empresas")
      .select("id, nome, email, whatsapp, plano, cnpj, endereco")
      .maybeSingle(); // retorna null se não existir
    if (error) throw new Error(error.message);
    return data as Empresa | null;
  },

  async create(payload: EmpresaUpdatePayload): Promise<Empresa> {
    const { data, error } = await supabase
      .from("empresas")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Empresa;
  },

  async update(id: string, payload: EmpresaUpdatePayload): Promise<void> {
    const { error } = await supabase
      .from("empresas")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
