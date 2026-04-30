// src/pages/viagens/Types/viagensTypes.ts

import type { ViagensStatus } from "../../../domain/DashboardDomain";

/**
 * Tipo do formulário de criar viagem
 */
export type ViagemCreateInput = {
  origem: string;
  destino: string;
  motoristaId?: string;     // opcional
  dataAgendada: string;     // obrigatório: ISO "2026-05-22T14:00"
};

/**
 * Tipo do formulário de atualizar viagem
 */
export type ViagemUpdateInput = {
  origem?: string;
  destino?: string;
  motoristaId?: string | null;
  status?: ViagensStatus;
  dataAgendada?: string;
};

/**
 * Viagem completa (retornada do banco)
 */
export type Viagem = {
  id: string;
  origem: string;
  destino: string;
  status: ViagensStatus;
  motoristaId: string | null;
  dataAgendada: string | null;
  lembreteEnviadoEm: string | null;
  criadoEm: string;
};