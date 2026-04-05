// src/services/viagensService.ts
import { supabase } from "../infra/superBaseClient";
import type { ViagensDTO } from "../types/DashboardDto";
import type { ViagensStatus } from "../domain/DashboardDomain";

/** Lista todas as viagens não deletadas da empresa. */
export async function fetchViagens(): Promise<ViagensDTO[]> {
  const { data, error } = await supabase
    .from("viagens")
    .select("id, origem, destino, status, motorista_id, created_at, deleted_at")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`viagensService.fetchViagens: ${error.message}`);
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
  empresa_id:   string;
  origem:       string;
  destino:      string;
  motorista_id?: string;
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