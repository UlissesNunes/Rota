// src/contexts/useMotoristaCtx.ts
import { useContext } from "react";
import { MotoristaContext } from "./MotoristaContext";

export function useMotoristaCtx() {
  const context = useContext(MotoristaContext);

  if (!context) {
    throw new Error("useMotoristaCtx deve ser usado dentro de um MotoristaProvider.");
  }

  return context;
}
