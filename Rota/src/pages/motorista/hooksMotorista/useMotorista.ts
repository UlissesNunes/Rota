// src/domains/motorista/hooks/useMotoristaForm.ts
import { useState, useContext } from "react";
import { MotoristaContext } from "../../../contexts/MotoristaContext";


import type { Motorista, MotoristaUpdateInput } from "../Types/motoristaTypes";
import { updateMotoristaUseCase } from "../useCase/updateMotoristaUseCase";
import { deleteMotoristaUseCase } from "../Service/motoristaDelete";

export const useMotoristaForm = () => {
  const context = useContext(MotoristaContext);
  if (!context) throw new Error("useMotoristaForm deve ser usado dentro de um MotoristaProvider.");
  const { motoristas, refetch } = context;

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const salvar = async (input: MotoristaUpdateInput, motorista?: Motorista) => {
    setSalvando(true);
    setErro(null);
    setSucesso(false);

    const result = await updateMotoristaUseCase(motorista ?? null, input);

    if (result.error) setErro(result.error);
    else {
      setSucesso(true);
      refetch();
    }

    setSalvando(false);
  };

  const excluir = async (id: string) => {
    setSalvando(true);
    setErro(null);
    setSucesso(false);

    const result = await deleteMotoristaUseCase(id);

    if (result.error) setErro(result.error);
    else {
      setSucesso(true);
      refetch();
    }

    setSalvando(false);
  };

  return { motoristas, salvando, erro, sucesso, salvar, excluir };
};
