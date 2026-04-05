// src/services/empresaService.ts

import type { EmpresaDTO } from "../types/DashboardDto";
import { supabase } from "./DashboardSupabase";


export async function fetchEmpresa(): Promise<EmpresaDTO> {
  const { data, error } = await supabase
    .from("empresas")
    .select("id, nome, email")
    .single();

  if (error) throw new Error(`empresaService: ${error.message}`);
  return data as EmpresaDTO;
}