// src/pages/viagens/Service/viagensService.ts

import { supabase } from "../../../infra/superBaseClient";
import type { ViagemCreateInput, ViagemUpdateInput, Viagem } from "../Types/viagensTypes";

/**
 * Busca todas as viagens da empresa
 */
async function fetch(empresaId: string): Promise<Viagem[]> {
  const { data, error } = await supabase
    .from("viagens")
    .select("id, origem, destino, status, motorista_id, data_agendada, lembrete_enviado_em, created_at")
    .eq("empresa_id", empresaId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`viagensService.fetch: ${error.message}`);

  return (data ?? []).map((row) => ({
    id: row.id,
    origem: row.origem,
    destino: row.destino,
    status: row.status,
    motoristaId: row.motorista_id,
    dataAgendada: row.data_agendada,
    lembreteEnviadoEm: row.lembrete_enviado_em,
    criadoEm: row.created_at,
  }));
}

/**
 * Cria uma nova viagem
 */
async function create(input: ViagemCreateInput, empresaId: string): Promise<Viagem> {
  const { data, error } = await supabase
    .from("viagens")
    .insert({
      empresa_id: empresaId,
      origem: input.origem,
      destino: input.destino,
      motorista_id: input.motoristaId || null,
      data_agendada: input.dataAgendada,
      status: "pendente",
    })
    .select()
    .single();

  if (error) throw new Error(`viagensService.create: ${error.message}`);

  return {
    id: data.id,
    origem: data.origem,
    destino: data.destino,
    status: data.status,
    motoristaId: data.motorista_id,
    dataAgendada: data.data_agendada,
    lembreteEnviadoEm: data.lembrete_enviado_em,
    criadoEm: data.created_at,
  };
}

/**
 * Atualiza uma viagem existente
 */
async function update(id: string, input: ViagemUpdateInput, empresaId: string): Promise<void> {
  const payload: Record<string, any> = {};
  
  if (input.origem !== undefined) payload.origem = input.origem;
  if (input.destino !== undefined) payload.destino = input.destino;
  if (input.motoristaId !== undefined) payload.motorista_id = input.motoristaId;
  if (input.status !== undefined) payload.status = input.status;
  if (input.dataAgendada !== undefined) payload.data_agendada = input.dataAgendada;

  const { error } = await supabase
    .from("viagens")
    .update(payload)
    .eq("id", id)
    .eq("empresa_id", empresaId);

  if (error) throw new Error(`viagensService.update: ${error.message}`);
}

/**
 * Soft delete - marca como deletado
 */
async function deleteViagem(id: string, empresaId: string): Promise<void> {
  const { error } = await supabase
    .from("viagens")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .eq("empresa_id", empresaId);

  if (error) throw new Error(`viagensService.delete: ${error.message}`);
}

export const viagensService = {
  fetch,
  create,
  update,
  delete: deleteViagem,
};