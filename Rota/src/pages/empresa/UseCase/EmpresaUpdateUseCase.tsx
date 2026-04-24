// src/domains/empresa/use-cases/updateEmpresa.useCase.ts
// FIX #3: sem userId nem empresaId — apenas input de negócio
// FIX #4: normalized começa VAZIO — campos só são adicionados se presentes no input
// Isso garante PATCH real: campos ausentes no input não sobrescrevem dados existentes

import type { EmpresaEstado } from "../../../contexts/EmpresaContext";
import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { empresaService } from "../Service/EmpresaService";
import type { EmpresaUpdateInput, EmpresaUpdatePayload } from "../Types/EmpresaTypes";

export async function updateEmpresaUseCase(
  empresa: EmpresaEstado | null,
  input: EmpresaUpdateInput
): Promise<UseCaseVoidResult> {
  const normalized: EmpresaUpdatePayload = {
    cnpj: "",
    endereco: "",
    nome: "",
    email: "",
    whatsapp: "",
  };

  if (input.nome !== undefined) {
    const nome = input.nome.trim();
    if (nome.length < 2) {
      return { error: "Nome da empresa deve ter pelo menos 2 caracteres." };
    }
    normalized.nome = nome;
  }

  if (input.email !== undefined) {
    const email = (input.email ?? "").trim();
    if (email === "") {
      normalized.email = "email não informado";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return { error: "E-mail inválido." };
    } else {
      normalized.email = email;
    }
  }

  if (input.whatsapp !== undefined) {
    const raw = (input.whatsapp ?? "").trim();
    const digits = raw.replace(/\D/g, "");
    if (raw === "") {
      normalized.whatsapp = "Não informado";
    } else if (digits.length < 10 || digits.length > 15) {
      return { error: "WhatsApp inválido. Digite entre 10 e 15 dígitos." };
    } else {
      normalized.whatsapp = digits;
    }
  }

  if (input.cnpj !== undefined) normalized.cnpj = input.cnpj;
  if (input.endereco !== undefined) normalized.endereco = input.endereco;

  if (Object.keys(normalized).length === 0) {
    return { error: "Nenhum campo foi alterado." };
  }

  try {
    if (!empresa?.id) {
      // não existe empresa → cria
      await empresaService.create(normalized);
    } else {
      // existe empresa → atualiza
      await empresaService.update(empresa.id, normalized);
    }
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao salvar empresa." };
  }
}
