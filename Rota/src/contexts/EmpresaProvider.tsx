// src/contexts/EmpresaProvider.tsx

import { type ReactNode, useState, useCallback, useEffect } from "react";
import { supabase } from "../infra/superBaseClient";
import { EmpresaContext, type EmpresaEstado } from "./EmpresaContext";

export const EmpresaProvider = ({ children }: { children: ReactNode }) => {
  const [empresa, setEmpresa] = useState<EmpresaEstado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresa = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔑 Primeiro pega o usuário logado
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw new Error(userErr.message);
      if (!userData?.user) throw new Error("Usuário não autenticado");

      // 🔑 Busca a empresa vinculada ao usuário
      const { data: emp, error: empErr } = await supabase
        .from("empresas")
        .select("id, nome, email, whatsapp, plano, cnpj, endereco")
        .eq("user_id", userData.user.id) // filtro pela empresa do usuário
        .single();

      if (empErr) throw new Error(empErr.message);
      if (!emp) throw new Error("Empresa não encontrada");

      // 🔑 Agora busca os counts filtrando por empresa_id
      const [{ count: cMotoristas }, { count: cProdutos }, { count: cViagens }] =
        await Promise.all([
          supabase
            .from("motoristas")
            .select("id", { count: "exact", head: true })
            .eq("empresa_id", emp.id)
            .is("deleted_at", null),
          supabase
            .from("produtos")
            .select("id", { count: "exact", head: true })
            .eq("empresa_id", emp.id)
            .is("deleted_at", null),
          supabase
            .from("viagens")
            .select("id", { count: "exact", head: true })
            .eq("empresa_id", emp.id)
            .is("deleted_at", null),
        ]);

      // 🔑 Monta o estado da empresa
      setEmpresa({
        id: emp.id,
        nome: emp.nome ?? "Nova Empresa",
        email: emp.email ?? "",
        whatsapp: emp.whatsapp ?? "",
        cnpj: emp.cnpj ?? "",
        endereco: emp.endereco ?? "",
        plano: emp.plano ?? "gratuito",
        temMotoristas: (cMotoristas ?? 0) > 0,
        temProdutos: (cProdutos ?? 0) > 0,
        temViagens: (cViagens ?? 0) > 0,
        configurada: emp.nome !== "Nova Empresa" && !!emp.whatsapp,
        temPlanoAtivo: emp.plano !== "gratuito",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar empresa");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmpresa();
  }, [fetchEmpresa]);

  return (
    <EmpresaContext.Provider value={{ empresa, loading, error, refetch: fetchEmpresa }}>
      {children}
    </EmpresaContext.Provider>
  );
};
