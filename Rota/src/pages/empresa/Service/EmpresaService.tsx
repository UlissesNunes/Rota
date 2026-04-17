// src/domains/empresa/services/empresa.service.ts
// FIX #2: update() NÃO recebe userId — RLS filtra por user_id = auth.uid() automaticamente
// A política "empresas_update" no banco garante que só a própria empresa é atualizada


import { supabase } from "../../../infra/superBaseClient";
import type { Empresa, EmpresaUpdatePayload } from "../Types/EmpresaTypes";
export const empresaService = {
  // Leitura: RLS filtra por user_id = auth.uid() — sem parâmetros necessários
  async fetch(): Promise<Empresa> {
    const { data, error } = await supabase
      .from("empresas")
      .select("id, nome, email, whatsapp, plano")
      .single();
    if (error) throw new Error(error.message);
    return data as Empresa;
  },

  // FIX #2: sem userId — RLS da policy "empresas_update" garante isolamento
  // payload contém apenas os campos que foram explicitamente alterados (PATCH real)
  async update(payload: EmpresaUpdatePayload): Promise<void> {
    const { error } = await supabase
      .from("empresas")
      .update(payload);
    if (error) throw new Error(error.message);
  },
};