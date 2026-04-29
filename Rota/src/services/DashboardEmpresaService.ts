// src/services/DashboardEmpresaService.ts
import { supabase } from "../infra/superBaseClient";
import type { EmpresaDTO } from "../types/DashboardDto";

/** Busca dados da empresa pelo ID. */
export async function fetchEmpresa(empresaId: string): Promise<EmpresaDTO> {
  const { data, error } = await supabase
    .from("empresas")
    .select("id, nome, email, whatsapp, plano, deleted_at")
    .eq("id", empresaId)
    .single();

  if (error) throw new Error(`DashboardEmpresaService.fetchEmpresa: ${error.message}`);
  return data as EmpresaDTO;
}

/** Atualiza dados da empresa do usuário logado. */
export async function updateEmpresa(
  empresaId: string,
  campos: Partial<Pick<EmpresaDTO, "nome" | "email" | "whatsapp">>
): Promise<void> {
  const { error } = await supabase
    .from("empresas")
    .update(campos)
    .eq("id", empresaId);

  if (error) throw new Error(`empresaService.updateEmpresa: ${error.message}`);
}