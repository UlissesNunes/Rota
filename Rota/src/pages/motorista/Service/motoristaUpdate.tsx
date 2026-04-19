// src/domains/motorista/use-cases/updateMotorista.useCase.ts
import type { Motorista } from "../../../contexts/MotoristaContext";
import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { motoristaService } from "./motoristaService";
import type { MotoristaUpdateInput, MotoristaUpdatePayload } from "../Types/motoristaTypes";

export async function updateMotoristaUseCase(
  motorista: Motorista | null,
  input: MotoristaUpdateInput
): Promise<UseCaseVoidResult> {
  const normalized: MotoristaUpdatePayload = {
    cpf: 0,
    corCaminhao: "",
    placaCaminhao: "",
    anoCaminhao: 0,
    modeloCaminhao: "",
    nome: "",
    cnh: 0,
    telefone:0,
    ativo: false,
    id: "",
  };

  if (input.nome !== undefined) normalized.nome = input.nome.trim();
  if (input.cnh !== undefined) normalized.cnh = Number(input.cnh);
  if (input.telefone !== undefined) normalized.telefone = Number(input.telefone);
  if (input.ativo !== undefined) normalized.ativo = input.ativo;

  if (Object.keys(normalized).length === 0) {
    return { error: "Nenhum campo foi alterado." };
  }

  try {
    if (!motorista?.id) {
      await motoristaService.create(normalized);
    } else {
      await motoristaService.update(motorista.id, normalized);
    }
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao salvar motorista." };
  }
}
