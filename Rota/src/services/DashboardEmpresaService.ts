// src/services/empresaService.ts

import type { EmpresaDTO } from "../types/DashboardDto";
import { supabase } from "../infra/superBaseClient";


/** Retorna a empresa do usuário logado.
 *  RLS garante 1 linha — .single() é seguro. */
export async function fetchEmpresa(): Promise<EmpresaDTO> {
  const { data, error } = await supabase
    .from("empresas")
    .select("id, nome, email, whatsapp, plano, deleted_at")
    .single();

  if (error) throw new Error(`empresaService.fetchEmpresa: ${error.message}`);
  return data as EmpresaDTO;
}

/** Atualiza dados da empresa do usuário logado. */
export async function updateEmpresa(
  campos: Partial<Pick<EmpresaDTO, "nome" | "email" | "whatsapp">>
): Promise<void> {
  const { error } = await supabase
    .from("empresas")
    .update(campos)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "");

  if (error) throw new Error(`empresaService.updateEmpresa: ${error.message}`);
}