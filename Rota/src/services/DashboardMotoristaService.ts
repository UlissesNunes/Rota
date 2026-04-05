// src/services/motoristasService.ts

import type { MotoristaDTO } from "../types/DashboardDto";
import { supabase } from "./DashboardSupabase";


export async function fetchMotoristas(): Promise<MotoristaDTO[]> {
  const { data, error } = await supabase
    .from("motoristas")
    .select("id, nome, status");

  if (error) throw new Error(`motoristasService: ${error.message}`);
  return (data ?? []) as MotoristaDTO[];
}