// src/mappers/dashboardMappers.ts
// Transforma dados brutos do Supabase em modelos de negócio estáveis

import type {
  EmpresaDTO, ViagensDTO, MotoristaDTO,
  ProdutoDTO, OnboardingStepDTO,
} from "../types/DashboardDto";
import type {
  Empresa, PlanoTipo,
  Viagens, ViagensStatus,
  Motorista, MotoristaStatus,
  Produto, UnidadeProduto,
  OnboardingStep,
} from "../domain/DashboardDomain";

// ── Guards ──────────────────────────────────────────────────

const PLANOS:           PlanoTipo[]        = ['gratuito', 'pro', 'enterprise'];
const VIAGENS_STATUS:    ViagensStatus[]     = ['pendente', 'em_andamento', 'concluida', 'cancelada'];
const MOTORISTA_STATUS: MotoristaStatus[]  = ['Ativo', 'Inativo'];
const UNIDADES:         UnidadeProduto[]   = ['un', 'kg', 'ton', 'cx', 'pallet', 'lt', 'm3'];

const toPlano   = (v: string | null): PlanoTipo       => PLANOS.includes(v as PlanoTipo)           ? (v as PlanoTipo)       : 'gratuito';
const toVStatus = (v: string | null): ViagensStatus    => VIAGENS_STATUS.includes(v as ViagensStatus) ? (v as ViagensStatus)   : 'pendente';
const toMStatus = (v: string | null): MotoristaStatus => MOTORISTA_STATUS.includes(v as MotoristaStatus) ? (v as MotoristaStatus) : 'Inativo';
const toUnidade = (v: string | null): UnidadeProduto  => UNIDADES.includes(v as UnidadeProduto)    ? (v as UnidadeProduto)  : 'un';

// ── Mappers ─────────────────────────────────────────────────

export function mapEmpresaDTO(dto: EmpresaDTO): Empresa {
  return {
    id:       dto.id,
    nome:     dto.nome     ?? 'Nova Empresa',
    email:    dto.email    ?? '',
    whatsapp: dto.whatsapp ?? '',
    plano:    toPlano(dto.plano),
  };
}

export function mapViagensDTO(dto: ViagensDTO): Viagens | null {
  if (!dto.id) return null;
  return {
    id:          dto.id,
    origem:      dto.origem  ?? '',
    destino:     dto.destino ?? '',
    status:      toVStatus(dto.status),
    motoristaId: dto.motorista_id ?? null,
    criadoEm:    dto.created_at ?? new Date().toISOString(),
  };
}

export function mapMotoristaDTO(dto: MotoristaDTO): Motorista | null {
  if (!dto.id) return null;
  return {
    id:       dto.id,
    nome:     dto.nome     ?? 'Motorista sem nome',
    telefone: dto.telefone ?? '',
    status:   toMStatus(dto.status),
  };
}

export function mapProdutoDTO(dto: ProdutoDTO): Produto | null {
  if (!dto.id) return null;
  return {
    id:      dto.id,
    nome:    dto.nome ?? 'Produto sem nome',
    unidade: toUnidade(dto.unidade),
  };
}

export function mapOnboardingDTO(dto: OnboardingStepDTO): OnboardingStep | null {
  if (!dto.id) return null;
  return {
    id:        dto.id,
    titulo:    dto.titulo    ?? '',
    descricao: dto.descricao ?? '',
    rota:      dto.rota      ?? '/',
    acao:      dto.acao      ?? 'Acessar',
    concluido: dto.concluido ?? false,
    ordem:     dto.ordem     ?? 0,
  };
}

// ── Helpers de filtragem ─────────────────────────────────────

/** Remove nulos de arrays mapeados — use após qualquer .map(mapper) */
export function compact<T>(arr: (T | null)[]): T[] {
  return arr.filter((v): v is T => v !== null);
}