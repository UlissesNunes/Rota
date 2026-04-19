import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { motoristaService } from "../Service/motoristaService";
import type { Motorista, MotoristaUpdateInput, MotoristaUpdatePayload } from "../Types/motoristaTypes";

export async function updateMotoristaUseCase(
  motorista: Motorista | null,
  input: MotoristaUpdateInput
): Promise<UseCaseVoidResult> {
  const normalized: MotoristaUpdatePayload = {};

  if (input.nome !== undefined) normalized.nome = input.nome.trim();
  if (input.cnh !== undefined) normalized.cnh = input.cnh.trim();
  if (input.telefone !== undefined) normalized.telefone = input.telefone.trim();
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
