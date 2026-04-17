// src/domains/empresa/hooks/useEmpresa.ts
// FIX #4: hook NÃO passa userId nem empresaId ao useCase
// Contrato limpo: hook entrega input → useCase valida → service persiste

import { useState } from "react";
import type { EmpresaUpdateInput } from "../Types/EmpresaTypes";
import { updateEmpresaUseCase } from "../UseCase/EmpresaUpdateUseCase";
import { useContext } from "react";
import { EmpresaContext } from "../../../contexts/EmpresaContext";


export const useEmpresaForm = () => {
  const { empresa, refetch } = useEmpresaCtx();
  const [salvando, setSalvando] = useState(false);
  const [erro,     setErro]     = useState<string | null>(null);
  const [sucesso,  setSucesso]  = useState(false);

  const salvar = async (input: EmpresaUpdateInput) => {
    setSalvando(true);
    setErro(null);
    setSucesso(false);

    // FIX #4: apenas input — sem userId, sem empresaId
    const result = await updateEmpresaUseCase(input);

    if (result.error) {
      setErro(result.error);
    } else {
      setSucesso(true);
      refetch(); // atualiza EmpresaContext com os novos dados
    }

    setSalvando(false);
  };

  return { empresa, salvando, erro, sucesso, salvar };
};

function useEmpresaCtx() {
  const context = useContext(EmpresaContext);
  
  if (!context) {
    throw new Error("useEmpresaForm deve ser usado dentro de um EmpresaProvider.");
  }

  return context;
}
