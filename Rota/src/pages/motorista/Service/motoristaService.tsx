// src/domains/motorista/services/motorista.service.ts
import { supabase } from "../../../infra/superBaseClient";
import type { Motorista, MotoristaUpdateInput } from "../Types/motoristaTypes";

export const motoristaService = {
  async fetch(): Promise<Motorista[]> {
    const { data, error } = await supabase.from("motoristas").select("*");
    if (error) throw new Error(error.message);
    return data as Motorista[];
  },

  async create(payload: MotoristaUpdateInput): Promise<Motorista> {
    const { data, error } = await supabase
      .from("motoristas")
      .insert({
        nome: payload.nome,
        cpf: String(payload.cpf),          // garantir string
        cnh: String(payload.cnh),          // garantir string
        telefone: String(payload.telefone),// garantir string
        ativo: payload.ativo,
        modelo_caminhao: payload.modelo_caminhao,
        ano_caminhao: payload.ano_caminhao,
        cor_caminhao: payload.cor_caminhao,
        placa_caminhao: payload.placa_caminhao,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Motorista;
  },

  async update(id: string, payload: MotoristaUpdateInput): Promise<void> {
    const { error } = await supabase
      .from("motoristas")
      .update({
        nome: payload.nome,
        cpf: String(payload.cpf),
        cnh: String(payload.cnh),
        telefone: String(payload.telefone),
        ativo: payload.ativo,
        modelo_caminhao: payload.modelo_caminhao,
        ano_caminhao: payload.ano_caminhao,
        cor_caminhao: payload.cor_caminhao,
        placa_caminhao: payload.placa_caminhao,
      })
      .eq("id", id);

    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("motoristas").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
