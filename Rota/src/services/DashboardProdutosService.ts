// src/services/produtosService.ts

import type { UnidadeProduto } from "../domain/DashboardDomain";
import type { ProdutoDTO } from "../types/DashboardDto";
import { supabase } from "../infra/superBaseClient";


/** Lista todos os produtos não deletados da empresa. */
export async function fetchProdutos(): Promise<ProdutoDTO[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("id, nome, unidade, deleted_at")
    .is("deleted_at", null)
    .order("nome", { ascending: true });

  if (error) throw new Error(`produtosService.fetchProdutos: ${error.message}`);
  return (data ?? []) as ProdutoDTO[];
}

/** Cria um novo produto. */
export async function createProduto(payload: {
  empresa_id: string;
  nome:       string;
  unidade?:   UnidadeProduto;
}): Promise<ProdutoDTO> {
  const { data, error } = await supabase
    .from("produtos")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`produtosService.createProduto: ${error.message}`);
  return data as ProdutoDTO;
}

/** Soft delete. */
export async function deleteProduto(id: string): Promise<void> {
  const { error } = await supabase
    .from("produtos")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(`produtosService.deleteProduto: ${error.message}`);
}