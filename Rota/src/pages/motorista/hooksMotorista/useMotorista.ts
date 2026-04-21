import { useState, useEffect, useCallback } from "react";
import type { Motorista, MotoristaUpdateInput } from "../Types/motoristaTypes";
import { motoristaService } from "../Service/motoristaService";
import { useEmpresa } from "../../../contexts/useEmpresa";

export const useMotoristaForm = () => {
  const { empresa } = useEmpresa();
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  // refetch estabilizado e sempre filtrando por empresa
  const refetch = useCallback(async () => {
    if (!empresa) return;
    try {
      const data = await motoristaService.fetch(empresa.id);
      setMotoristas(data);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado ao buscar motoristas.");
    }
  }, [empresa]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const salvar = async (input: MotoristaUpdateInput, motorista?: Motorista) => {
    if (!empresa) return;
    setSalvando(true);
    setErro(null);
    setSucesso(false);

    try {
      if (motorista) {
        await motoristaService.update(motorista.id, input, empresa.id);
      } else {
        await motoristaService.create(input, empresa.id);
      }
      setSucesso(true);
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado ao salvar motorista.");
    } finally {
      setSalvando(false);
    }
  };

  const excluir = async (id: string) => {
    if (!empresa) return;
    setSalvando(true);
    setErro(null);
    setSucesso(false);

    try {
      await motoristaService.delete(id, empresa.id);
      setSucesso(true);
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado ao excluir motorista.");
    } finally {
      setSalvando(false);
    }
  };

  return { motoristas, salvando, erro, sucesso, salvar, excluir, refetch };
};
