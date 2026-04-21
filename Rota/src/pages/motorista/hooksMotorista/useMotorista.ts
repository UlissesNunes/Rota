import { useState } from "react";

import type { Motorista, MotoristaUpdateInput } from "../Types/motoristaTypes";
import { updateMotoristaUseCase } from "../useCase/updateMotoristaUseCase";
import { deleteMotoristaUseCase } from "../Service/motoristaDelete";
import { useMotoristaCtx } from "../../../contexts/useMotoristaCtx";

export const useMotoristaForm = () => {
  const { motoristas, refetch } = useMotoristaCtx();

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
