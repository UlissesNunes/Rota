// ── Provider ──────────────────────────────────────────────────────────────────

import { type ReactNode, useState, useCallback, useEffect } from "react";
import { supabase } from "../infra/superBaseClient";
import { EmpresaContext, type EmpresaEstado } from "./EmpresaContext";

export const EmpresaProvider = ({ children }: { children: ReactNode }) => {
  const [empresa, setEmpresa] = useState<EmpresaEstado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetchEmpresa = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Busca empresa + contagens em paralelo — zero chamadas duplicadas
      const [
        { data: emp, error: empErr },
        { count: cMotoristas },
        { count: cProdutos },
        { count: cViagens },
      ] = await Promise.all([
        supabase.from("empresas").select("id, nome, email, whatsapp, plano").single(),
        supabase.from("motoristas").select("id", { count: "exact", head: true }).is("deleted_at", null),
        supabase.from("produtos").select("id", { count: "exact", head: true }).is("deleted_at", null),
        supabase.from("viagens").select("id", { count: "exact", head: true }).is("deleted_at", null),
      ]);

      if (empErr) throw new Error(empErr.message);
      if (!emp)   throw new Error("Empresa não encontrada");

      // Estado derivado calculado uma vez aqui, não espalhado em componentes
      setEmpresa({
        id:            emp.id,
        nome:          emp.nome     ?? "Nova Empresa",
        email:         emp.email    ?? "",
        whatsapp:      emp.whatsapp ?? "",
        plano:         emp.plano    ?? "gratuito",
        temMotoristas: (cMotoristas ?? 0) > 0,
        temProdutos:   (cProdutos   ?? 0) > 0,
        temViagens:    (cViagens    ?? 0) > 0,
        configurada:   emp.nome !== "Nova Empresa" && !!emp.whatsapp,
        temPlanoAtivo: emp.plano !== "gratuito",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar empresa");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEmpresa(); }, [fetchEmpresa]);

  return (
    <EmpresaContext.Provider value={{ empresa, loading, error, refetch: fetchEmpresa }}>
      {children}
    </EmpresaContext.Provider>
  );
};