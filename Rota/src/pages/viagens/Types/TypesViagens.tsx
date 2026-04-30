// src/pages/viagens/Types/TypesViagens.ts

// ── Status ────────────────────────────────────────────────────────────────────
// Co-localizado aqui em vez de importar do DashboardDomain para evitar
// acoplamento entre domínios. DashboardDomain pode importar daqui se precisar.

export type ViagensStatus =
  | "pendente"
  | "em_andamento"
  | "concluida"
  | "cancelada";

// ── Payload de criação ────────────────────────────────────────────────────────
// motoristaId é opcional — undefined omite o campo no insert.
// Nunca usar null aqui: o banco recebe null via service quando undefined.

export type ViagemCreateInput = {
  origem:       string;
  destino:      string;
  motoristaId?: string;          // undefined = sem motorista
  dataAgendada: string;          // ISO "2026-05-22T14:00"
};

// ── Payload de atualização parcial ────────────────────────────────────────────
// Todos os campos são opcionais — só os presentes são enviados ao banco.

export type ViagemUpdateInput = {
  origem?:       string;
  destino?:      string;
  motoristaId?:  string | null;  // null = remover motorista explicitamente
  status?:       ViagensStatus;
  dataAgendada?: string;
};

// ── Entidade completa (retornada do banco) ────────────────────────────────────

export type Viagem = {
  id:                 string;
  origem:             string;
  destino:            string;
  status:             ViagensStatus;
  motoristaId:        string | null;
  dataAgendada:       string | null;
  lembreteEnviadoEm:  string | null;
  criadoEm:           string;
};