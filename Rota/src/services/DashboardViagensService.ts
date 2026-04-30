// src/services/DashboardViagensService.ts
import type { ViagensStatus } from "../domain/DashboardDomain";
import { supabase } from "../infra/superBaseClient";
import type { ViagensDTO } from "../types/DashboardDto";

/** Lista todas as viagens da empresa. */
export async function fetchViagens(empresaId: string): Promise<ViagensDTO[]> {
  const { data, error } = await supabase
    .from("viagens")
    .select("id, origem, destino, status, motorista_id, created_at, deleted_at")
    .eq("empresa_id", empresaId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`DashboardViagensService.fetchViagens: ${error.message}`);
  return (data ?? []) as ViagensDTO[];
}


/** Busca uma viagem específica por ID. */
export async function fetchViagensById(id: string): Promise<ViagensDTO> {
  const { data, error } = await supabase
    .from("viagens")
    .select("id, origem, destino, status, motorista_id, created_at, deleted_at")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) throw new Error(`viagensService.fetchViagemById: ${error.message}`);
  return data as ViagensDTO;
}

/** Cria uma nova viagem. */
export async function createViagens(payload: {
  empresa_id:      string;
  origem:          string;
  destino:         string;
  motorista_id?:   string;
  data_agendada?:  string;  // NOVO: ISO timestamp
}): Promise<ViagensDTO> {
  const { data, error } = await supabase
    .from("viagens")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`viagensService.createViagem: ${error.message}`);
  return data as ViagensDTO;
}

/** Atualiza o status de uma viagem. */
export async function updateViagensStatus(
  id: string,
  status: ViagensStatus
): Promise<void> {
  const { error } = await supabase
    .from("viagens")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(`viagensService.updateViagemStatus: ${error.message}`);
}

/** Soft delete — nunca apaga fisicamente. */
export async function deleteViagens(id: string): Promise<void> {
  const { error } = await supabase
    .from("viagens")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`viagensService.deleteViagem: ${error.message}`);
}