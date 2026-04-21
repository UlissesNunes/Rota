// src/domains/motorista/use-cases/deleteMotorista.useCase.ts
import { motoristaService } from "./motoristaService";
import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";

export async function deleteMotoristaUseCase(id: string, empresaId: string): Promise<UseCaseVoidResult> {
  try {
    await motoristaService.delete(id, empresaId);
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao excluir motorista." };
  }
}
