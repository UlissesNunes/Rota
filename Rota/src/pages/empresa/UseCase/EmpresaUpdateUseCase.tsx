// src/domains/empresa/use-cases/updateEmpresa.useCase.ts
// Validação + orquestração — sem acesso direto ao Supabase

import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { empresaService } from "../Service/EmpresaService";
import type { EmpresaUpdateInput } from "../Types/EmpresaTypes";



export async function updateEmpresaUseCase(
  userId:    string,
  empresaId: string,
  input:     EmpresaUpdateInput,
): Promise<UseCaseVoidResult> {
  // Validações de negócio
  if (input.nome.trim().length < 2) {
    return { error: "Nome da empresa deve ter pelo menos 2 caracteres." };
  }
  if (input.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) {
    return { error: "E-mail inválido." };
  }
  const digits = input.whatsapp.replace(/\D/g, "");
  if (input.whatsapp && (digits.length < 10 || digits.length > 15)) {
    return { error: "WhatsApp inválido. Digite entre 10 e 15 dígitos." };
  }

  try {
    await empresaService.update(userId, input);
    // Sincroniza onboarding após atualização bem-sucedida
    syncOnboardingUseCase(empresaId);
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao atualizar empresa." };
  }
}

function syncOnboardingUseCase(empresaId: string) {
  throw new Error("Function not implemented.");
}
