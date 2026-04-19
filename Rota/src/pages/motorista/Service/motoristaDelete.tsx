// src/domains/motorista/use-cases/deleteMotorista.useCase.ts
import { motoristaService } from "./motoristaService";
import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";

export async function deleteMotoristaUseCase(id: string): Promise<UseCaseVoidResult> {
  try {
    await motoristaService.delete(id);
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao excluir motorista." };
  }
}
