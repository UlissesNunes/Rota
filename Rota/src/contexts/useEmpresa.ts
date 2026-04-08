// ── Hook de acesso ────────────────────────────────────────────────────────────

import { useContext } from "react";
import { EmpresaContext, type EmpresaContextType } from "./EmpresaContext";


export const useEmpresa = (): EmpresaContextType => {
  const ctx = useContext(EmpresaContext);
  if (!ctx) throw new Error("useEmpresa deve ser usado dentro de <EmpresaProvider>");
  return ctx;
};