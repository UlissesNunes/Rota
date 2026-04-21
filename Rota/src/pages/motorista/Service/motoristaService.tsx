// src/domains/motorista/Service/motoristaService.ts
import { supabase } from "../../../infra/superBaseClient";
import type { Motorista, MotoristaUpdatePayload } from "../Types/motoristaTypes";

export const motoristaService = {
  async fetch(empresaId: string): Promise<Motorista[]> {
    const { data, error } = await supabase
      .from("motoristas")
      .select("*")
      .eq("empresa_id", empresaId) // 🔑 filtro por empresa
      .is("deleted_at", null);     // opcional: se usar soft delete
    if (error) throw new Error(error.message);
    return data as Motorista[];
  },

  async create(payload: MotoristaUpdatePayload, empresaId: string): Promise<Motorista> {
    const { data, error } = await supabase
      .from("motoristas")
      .insert({ ...payload, empresa_id: empresaId }) // 🔑 força empresa_id
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Motorista;
  },

  async update(id: string, payload: MotoristaUpdatePayload, empresaId: string): Promise<void> {
    const { error } = await supabase
      .from("motoristas")
      .update(payload)
      .eq("id", id)
      .eq("empresa_id", empresaId); // 🔑 garante isolamento
    if (error) throw new Error(error.message);
  },

  async delete(id: string, empresaId: string): Promise<void> {
    const { error } = await supabase
      .from("motoristas")
      .delete()
      .eq("id", id)
      .eq("empresa_id", empresaId); // 🔑 garante isolamento
    if (error) throw new Error(error.message);
  },
};
