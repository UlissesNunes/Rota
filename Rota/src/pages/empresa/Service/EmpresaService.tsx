// src/domains/empresa/services/empresa.service.ts
// Apenas queries — sem lógica de negócio

import { supabase } from "../../../infra/superBaseClient";
import type { Empresa, EmpresaUpdateInput } from "../Types/EmpresaTypes";


export const empresaService = {
  async fetch(): Promise<Empresa> {
    const { data, error } = await supabase
      .from("empresas")
      .select("id, nome, email, whatsapp, plano")
      .single();
    if (error) throw new Error(error.message);
    return data as Empresa;
  },

  async update(userId: string, input: EmpresaUpdateInput): Promise<void> {
    const { error } = await supabase
      .from("empresas")
      .update({
        nome:     input.nome.trim(),
        email:    input.email.trim()    || null,
        whatsapp: input.whatsapp.trim() || null,
      })
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
  },
};