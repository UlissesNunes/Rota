import { supabase } from "../../../infra/superBaseClient";
import type { Motorista, MotoristaUpdatePayload } from "../Types/motoristaTypes";

export const motoristaService = {
  async fetch(): Promise<Motorista[]> {
    const { data, error } = await supabase.from("motoristas").select("*");
    if (error) throw new Error(error.message);
    return data as Motorista[];
  },

  async create(payload: MotoristaUpdatePayload): Promise<Motorista> {
    const { data, error } = await supabase
      .from("motoristas")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Motorista;
  },

  async update(id: string, payload: MotoristaUpdatePayload): Promise<void> {
    const { error } = await supabase
      .from("motoristas")
      .update(payload)
      .eq("id", id);

    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("motoristas").delete().eq("id", id);
    if (error) throw new Error(error.message);
  },
};
