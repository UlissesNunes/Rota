// src/pages/viagens/Service/ViagensService.ts

import { supabase } from "../../../infra/superBaseClient";
import type { Viagem, ViagemCreateInput, ViagemUpdateInput, ViagensStatus } from "../Types/TypesViagens";

// ── Tipo interno do payload de update ────────────────────────────────────────
// Espelha exatamente as colunas do banco — sem any, sem Record genérico.

type ViagemUpdatePayload = {
  origem?:       string;
  destino?:      string;
  motorista_id?: string | null;
  status?:       ViagensStatus;
  data_agendada?: string;
};

// ── Mapper: linha do banco → Viagem ──────────────────────────────────────────

function rowToViagem(row: {
  id:                   string;
  origem:               string;
  destino:              string;
  status:               string;
  motorista_id:         string | null;
  data_agendada:        string | null;
  lembrete_enviado_em:  string | null;
  created_at:           string;
}): Viagem {
  return {
    id:                row.id,
    origem:            row.origem,
    destino:           row.destino,
    status:            row.status as ViagensStatus,
    motoristaId:       row.motorista_id,
    dataAgendada:      row.data_agendada,
    lembreteEnviadoEm: row.lembrete_enviado_em,
    criadoEm:          row.created_at,
  };
}

// ── fetch ─────────────────────────────────────────────────────────────────────

async function fetch(empresaId: string): Promise<Viagem[]> {
  const { data, error } = await supabase
    .from("viagens")
    .select("id, origem, destino, status, motorista_id, data_agendada, lembrete_enviado_em, created_at")
    .eq("empresa_id", empresaId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`viagensService.fetch: ${error.message}`);

  return (data ?? []).map(rowToViagem);
}

// ── create ────────────────────────────────────────────────────────────────────

async function create(input: ViagemCreateInput, empresaId: string): Promise<Viagem> {
  const { data, error } = await supabase
    .from("viagens")
    .insert({
      empresa_id:    empresaId,
      origem:        input.origem,
      destino:       input.destino,
      motorista_id:  input.motoristaId ?? null,  // undefined → null no banco
      data_agendada: input.dataAgendada,
      status:        "pendente" satisfies ViagensStatus,
    })
    .select("id, origem, destino, status, motorista_id, data_agendada, lembrete_enviado_em, created_at")
    .single();

  if (error) throw new Error(`viagensService.create: ${error.message}`);

  return rowToViagem(data);
}

// ── update ────────────────────────────────────────────────────────────────────

async function update(
  id:        string,
  input:     ViagemUpdateInput,
  empresaId: string,
): Promise<void> {
  // Constrói payload apenas com os campos presentes no input
  const payload: ViagemUpdatePayload = {};

  if (input.origem       !== undefined) payload.origem        = input.origem;
  if (input.destino      !== undefined) payload.destino       = input.destino;
  if (input.motoristaId  !== undefined) payload.motorista_id  = input.motoristaId;
  if (input.status       !== undefined) payload.status        = input.status;
  if (input.dataAgendada !== undefined) payload.data_agendada = input.dataAgendada;

  const { error } = await supabase
    .from("viagens")
    .update(payload)
    .eq("id", id)
    .eq("empresa_id", empresaId);

  if (error) throw new Error(`viagensService.update: ${error.message}`);
}

// ── delete (soft) ─────────────────────────────────────────────────────────────

async function deleteViagem(id: string, empresaId: string): Promise<void> {
  const { error } = await supabase
    .from("viagens")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .eq("empresa_id", empresaId);

  if (error) throw new Error(`viagensService.delete: ${error.message}`);
}

// ── export ────────────────────────────────────────────────────────────────────

export const viagensService = {
  fetch,
  create,
  update,
  delete: deleteViagem,
};