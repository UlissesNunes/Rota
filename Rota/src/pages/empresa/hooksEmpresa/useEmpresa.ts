// src/hooks/useEmpresaForm.ts
import { useContext } from "react";
import { EmpresaContext } from "../../../contexts/EmpresaContext";
import type { EmpresaUpdatePayload } from "../Types/EmpresaTypes";


export function useEmpresaForm() {
  const ctx = useContext(EmpresaContext);

  if (!ctx) {
    throw new Error("useEmpresaForm deve ser usado dentro de EmpresaProvider");
  }

  const { empresa, loading, error, refetch, updateEmpresa } = ctx;

  // Interface simplificada para o formulário
  async function salvar(payload: EmpresaUpdatePayload) {
    await updateEmpresa(payload);
  }

  return {
    empresa,
    salvando: loading,   // reaproveita o estado de carregamento
    erro: error,
    sucesso: false,      // pode ser controlado no Provider se quiser
    salvar,
    refetch,
  };
}
