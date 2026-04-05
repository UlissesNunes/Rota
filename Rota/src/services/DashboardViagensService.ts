// src/services/viagensService.ts

import type { ViagemDTO } from "../types/DashboardDto";
import { supabase } from "./DashboardSupabase";


export async function fetchViagens(): Promise<ViagemDTO[]> {
  const { data, error } = await supabase
    .from("viagens")
    .select("id, categoria, total, data")
    .order("data", { ascending: false });

  if (error) throw new Error(`viagensService: ${error.message}`);
  return (data ?? []) as ViagemDTO[];
}