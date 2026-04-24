// src/contexts/EmpresaProvider.tsx
import { type ReactNode, useState, useCallback, useEffect } from "react";
import { supabase } from "../infra/superBaseClient";
import { EmpresaContext, type EmpresaDb, type EmpresaEstado } from "./EmpresaContext";
import type { EmpresaUpdatePayload } from "../pages/empresa/Types/EmpresaTypes";

export const EmpresaProvider = ({ children }: { children: ReactNode }) => {
  const [empresa, setEmpresa] = useState<EmpresaEstado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresa = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw new Error(userErr.message);

      const user = userData?.user;
      if (!user) {
        setEmpresa(null);
        return;
      }

      const { data, error: empresaErr } = await supabase
        .from("empresas")
        .select("id, nome, email, whatsapp, plano, cnpj, endereco")
        .eq("user_id", user.id)
        .single();

      if (empresaErr && empresaErr.code !== "PGRST116") {
        throw new Error(empresaErr.message);
      }

      let empresaDb: EmpresaDb | null = data;

      if (!empresaDb) {
        const { data: novaEmpresa, error: createErr } = await supabase
          .from("empresas")
          .insert({
            user_id: user.id,
            nome: "Nova Empresa",
            email: user.email ?? "",
            whatsapp: "",
            plano: "gratuito",
            cnpj: "",
            endereco: "",
          })
          .select()
          .single();

        if (createErr) throw new Error(createErr.message);
        if (!novaEmpresa) throw new Error("Falha ao criar empresa");

        empresaDb = novaEmpresa;
      }

      // Narrowing explícito: garante que empresaDb não é null
      if (!empresaDb) {
        throw new Error("Empresa não encontrada ou não criada corretamente");
      }

      const [{ count: cMotoristas }, { count: cProdutos }, { count: cViagens }] =
        await Promise.all([
          supabase.from("motoristas").select("id", { count: "exact", head: true }).eq("empresa_id", empresaDb.id),
          supabase.from("produtos").select("id", { count: "exact", head: true }).eq("empresa_id", empresaDb.id),
          supabase.from("viagens").select("id", { count: "exact", head: true }).eq("empresa_id", empresaDb.id),
        ]);

      const estado: EmpresaEstado = {
        id: empresaDb.id,
        nome: empresaDb.nome || "Nova Empresa",
        email: empresaDb.email || "",
        whatsapp: empresaDb.whatsapp || "",
        cnpj: empresaDb.cnpj || "",
        endereco: empresaDb.endereco || "",
        plano: empresaDb.plano ?? "gratuito",
        temMotoristas: (cMotoristas ?? 0) > 0,
        temProdutos: (cProdutos ?? 0) > 0,
        temViagens: (cViagens ?? 0) > 0,
        configurada: empresaDb.nome !== "Nova Empresa" && empresaDb.whatsapp.trim().length > 0,
        temPlanoAtivo: empresaDb.plano !== "gratuito",
      };

      setEmpresa(estado);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar empresa");
      setEmpresa(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmpresa = useCallback(
    async (payload: EmpresaUpdatePayload) => {
      if (!empresa) throw new Error("Empresa não carregada");

      const { data, error } = await supabase
        .from("empresas")
        .update(payload)
        .eq("id", empresa.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Falha ao atualizar empresa");

      setEmpresa({ ...empresa, ...data });
    },
    [empresa]
  );

  useEffect(() => {
    fetchEmpresa();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setEmpresa(null);
      } else {
        fetchEmpresa();
      }
    });

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [fetchEmpresa]);

  return (
    <EmpresaContext.Provider
      value={{
        empresa,
        loading,
        error,
        refetch: fetchEmpresa,
        updateEmpresa,
      }}
    >
      {children}
    </EmpresaContext.Provider>
  );
};
