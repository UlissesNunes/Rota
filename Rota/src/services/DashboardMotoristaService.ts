// src/services/motoristasService.ts

import type { MotoristaStatus } from "../domain/DashboardDomain";
import type { MotoristaDTO } from "../types/DashboardDto";
import { supabase } from "../infra/superBaseClient";


/** Lista todos os motoristas não deletados da empresa. */
export async function fetchMotoristas(id: string): Promise<MotoristaDTO[]> {
  const { data, error } = await supabase
    .from("motoristas")
    .select("id, nome, telefone, status, deleted_at")
    .is("deleted_at", null)
    .order("nome", { ascending: true });

  if (error) throw new Error(`motoristasService.fetchMotoristas: ${error.message}`);
  return (data ?? []) as MotoristaDTO[];
}

/** Cria um novo motorista. */
export async function createMotorista(payload: {
  empresa_id: string;
  nome:       string;
  telefone?:  string;
}): Promise<MotoristaDTO> {
  const { data, error } = await supabase
    .from("motoristas")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`motoristasService.createMotorista: ${error.message}`);
  return data as MotoristaDTO;
}

/** Atualiza status do motorista. */
export async function updateMotoristaStatus(
  id: string,
  status: MotoristaStatus
): Promise<void> {
  const { error } = await supabase
    .from("motoristas")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(`motoristasService.updateMotoristaStatus: ${error.message}`);
}

/** Soft delete. */
export async function deleteMotorista(id: string): Promise<void> {
  const { error } = await supabase
    .from("motoristas")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`motoristasService.deleteMotorista: ${error.message}`);
}