// src/domains/empresa/use-cases/updateEmpresa.useCase.ts
// FIX #3: sem userId nem empresaId — apenas input de negócio
// FIX #4: normalized começa VAZIO — campos só são adicionados se presentes no input
// Isso garante PATCH real: campos ausentes no input não sobrescrevem dados existentes

import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { empresaService } from "../Service/EmpresaService";
import type { EmpresaUpdateInput, EmpresaUpdatePayload } from "../Types/EmpresaTypes";



export async function updateEmpresaUseCase(
  input: EmpresaUpdateInput,           // FIX #3: sem userId, sem empresaId
): Promise<UseCaseVoidResult> {

  // FIX #4: normalized começa vazio — só recebe campos que existem no input
  const normalized: EmpresaUpdatePayload = {};

  // ── nome ─────────────────────────────────────────────────────────────────
  if (input.nome !== undefined) {
    const nome = input.nome.trim();
    if (nome.length < 2) {
      return { error: "Nome da empresa deve ter pelo menos 2 caracteres." };
    }
    normalized.nome = nome;
  }

  // ── email ─────────────────────────────────────────────────────────────────
  if (input.email !== undefined) {
    const email = (input.email ?? "").trim();
    if (email === "") {
      normalized.email = null;                        // limpa o email
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return { error: "E-mail inválido." };
    } else {
      normalized.email = email;
    }
  }

  // ── whatsapp ──────────────────────────────────────────────────────────────
  if (input.whatsapp !== undefined) {
    const raw    = (input.whatsapp ?? "").trim();
    const digits = raw.replace(/\D/g, "");
    if (raw === "") {
      normalized.whatsapp = null;                     // limpa o whatsapp
    } else if (digits.length < 10 || digits.length > 15) {
      return { error: "WhatsApp inválido. Digite entre 10 e 15 dígitos." };
    } else {
      normalized.whatsapp = digits;                   // persiste só dígitos
    }
  }

  // FIX #4: agora esta validação funciona de verdade
  if (Object.keys(normalized).length === 0) {
    return { error: "Nenhum campo foi alterado." };
  }

  try {
    await empresaService.update(normalized);
    await syncOnboardingUseCase();                    // FIX #3: sem empresaId
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao atualizar empresa." };
  }
}

function syncOnboardingUseCase() {
  throw new Error("Function not implemented.");
}
