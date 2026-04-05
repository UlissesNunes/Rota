// src/mappers/dashboardMappers.ts
// Transforma DTOs instáveis em modelos de domínio estáveis

import type { EmpresaDTO, ViagemDTO, MotoristaDTO, OnboardingStepDTO } from "../types/DashboardDto";
import type { Empresa, Viagem, Motorista, MotoristaStatus, OnboardingStep } from  "../domain/DashboardDomain";

const VALID_STATUS: MotoristaStatus[] = ["Ativo", "Inativo"];

function isMotoristaStatus(value: string): value is MotoristaStatus {
  return VALID_STATUS.includes(value as MotoristaStatus);
}

export function mapEmpresaDTO(dto: EmpresaDTO): Empresa {
  return {
    id:    dto.id,
    nome:  dto.nome  ?? "Empresa sem nome",
    email: dto.email ?? "",
  };
}

export function mapViagemDTO(dto: ViagemDTO): Viagem | null {
  if (!dto.id) return null;
  return {
    id:        dto.id,
    categoria: dto.categoria ?? "Sem categoria",
    total:     dto.total     ?? 0,
    data:      dto.data      ?? new Date().toISOString(),
  };
}

export function mapMotoristaDTO(dto: MotoristaDTO): Motorista | null {
  if (!dto.id) return null;
  const rawStatus = dto.status ?? "";
  return {
    id:     dto.id,
    nome:   dto.nome ?? "Motorista sem nome",
    status: isMotoristaStatus(rawStatus) ? rawStatus : "Inativo",
  };
}

export function mapOnboardingDTO(dto: OnboardingStepDTO): OnboardingStep | null {
  if (!dto.id) return null;
  return {
    id:        dto.id,
    titulo:    dto.titulo    ?? "",
    descricao: dto.descricao ?? "",
    rota:      dto.rota      ?? "/",
    acao:      dto.acao      ?? "Acessar",
    concluido: dto.concluido ?? false,
  };
}