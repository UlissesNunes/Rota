// src/services/ProdutosService.ts
import type { UnidadeProduto } from "../domain/DashboardDomain";
import { supabase } from "../infra/superBaseClient";
import type { ProdutoDTO } from "../types/DashboardDto";

/** Lista todos os produtos da empresa. */
export async function fetchProdutos(empresaId: string): Promise<ProdutoDTO[]> {
  const { data, error } = await supabase
    .from("produtos")
    .select("id, nome, unidade, deleted_at")
    .eq("empresa_id", empresaId)
    .is("deleted_at", null)
    .order("nome", { ascending: true });

  if (error) throw new Error(`ProdutosService.fetchProdutos: ${error.message}`);
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