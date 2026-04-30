// src/pages/viagens/HooksViagens/useViagens.ts

import { useState, useEffect, useCallback } from "react";
import { useEmpresa } from "../../../contexts/useEmpresa";
import { viagensService } from "../Service/ViagensService";
import type { Viagem, ViagemCreateInput, ViagemUpdateInput } from "../Types/TypesViagens";

// ── Tipos do hook ─────────────────────────────────────────────────────────────

type HookState = {
  viagens:  Viagem[];
  loading:  boolean;
  salvando: boolean;
  erro:     string | null;
  sucesso:  string | null;   // mensagem descritiva em vez de boolean cego
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useViagensForm = () => {
  const { empresa } = useEmpresa();

  const [state, setState] = useState<HookState>({
    viagens:  [],
    loading:  false,
    salvando: false,
    erro:     null,
    sucesso:  null,
  });

  // ── Helpers de estado ───────────────────────────────────────────────────────

  const setErro    = (erro: string)    => setState((s) => ({ ...s, erro, sucesso: null, salvando: false }));
  const setSucesso = (sucesso: string) => setState((s) => ({ ...s, sucesso, erro: null, salvando: false }));
  const clearFeedback = ()             => setState((s) => ({ ...s, erro: null, sucesso: null }));

  // ── Fetch ───────────────────────────────────────────────────────────────────

  const refetch = useCallback(async () => {
    if (!empresa) return;
    setState((s) => ({ ...s, loading: true, erro: null }));
    try {
      const viagens = await viagensService.fetch(empresa.id);
      setState((s) => ({ ...s, viagens, loading: false }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        erro: err instanceof Error ? err.message : "Erro ao buscar viagens.",
      }));
    }
  }, [empresa]);

  useEffect(() => { refetch(); }, [refetch]);

  // ── Criar ───────────────────────────────────────────────────────────────────
  // Separado de update para eliminar o union type ambíguo no hook anterior.

  const criar = async (input: ViagemCreateInput): Promise<void> => {
    if (!empresa) return;
    setState((s) => ({ ...s, salvando: true, erro: null, sucesso: null }));
    try {
      await viagensService.create(input, empresa.id);
      setSucesso("Viagem criada com sucesso!");
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar viagem.");
    }
  };

  // ── Atualizar ───────────────────────────────────────────────────────────────

  const atualizar = async (id: string, input: ViagemUpdateInput): Promise<void> => {
    if (!empresa) return;
    setState((s) => ({ ...s, salvando: true, erro: null, sucesso: null }));
    try {
      await viagensService.update(id, input, empresa.id);
      setSucesso("Viagem atualizada!");
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao atualizar viagem.");
    }
  };

  // ── Excluir ─────────────────────────────────────────────────────────────────

  const excluir = async (id: string): Promise<void> => {
    if (!empresa) return;
    setState((s) => ({ ...s, salvando: true, erro: null, sucesso: null }));
    try {
      await viagensService.delete(id, empresa.id);
      setSucesso("Viagem removida.");
      await refetch();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao excluir viagem.");
    }
  };

  // ── Manter compatibilidade com ViagemNovaPage ───────────────────────────────
  // ViagemNovaPage usa `salvar(form)` — mantemos o alias apontando para `criar`.

  const salvar = criar;

  return {
    viagens:      state.viagens,
    loading:      state.loading,
    salvando:     state.salvando,
    erro:         state.erro,
    sucesso:      state.sucesso,
    criar,
    atualizar,
    excluir,
    salvar,       // alias para compatibilidade com ViagemNovaPage
    refetch,
    clearFeedback,
  };
};