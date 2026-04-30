// src/pages/viagens/hooksViagens/useViagens.ts

import { useState, useEffect, useCallback } from "react";
import type { Viagem, ViagemCreateInput, ViagemUpdateInput } from "../Types/viagensTypes";
import { viagensService } from "../Service/viagensService";
import { useEmpresa } from "../../../contexts/useEmpresa";

export const useViagensForm = () => {
  const { empresa } = useEmpresa();
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  // Busca viagens da empresa
  const refetch = useCallback(async () => {
    if (!empresa) return;
    try {
      const data = await viagensService.fetch(empresa.id);
      setViagens(data);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado ao buscar viagens.");
    }
  }, [empresa]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Criar ou atualizar viagem
  const salvar = async (input: ViagemCreateInput | ViagemUpdateInput, viagem?: Viagem) => {
    if (!empresa) return;

    setSalvando(true);
    setErro(null);
    setSucesso(false);

    try {
      if (viagem) {
        await viagensService.update(viagem.id, input as ViagemUpdateInput, empresa.id);
      } else {
        await viagensService.create(input as ViagemCreateInput, empresa.id);
      }
      setSucesso(true);
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado ao salvar viagem.");
    } finally {
      setSalvando(false);
    }
  };

  // Excluir viagem
  const excluir = async (id: string) => {
    if (!empresa) return;

    setSalvando(true);
    setErro(null);
    setSucesso(false);

    try {
      await viagensService.delete(id, empresa.id);
      setSucesso(true);
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado ao excluir viagem.");
    } finally {
      setSalvando(false);
    }
  };

  return { viagens, salvando, erro, sucesso, salvar, excluir, refetch };
};