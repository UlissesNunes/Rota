import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { motoristaService } from "../Service/motoristaService";

import type { Motorista, MotoristaUpdateInput, MotoristaUpdatePayload } from "../Types/motoristaTypes";

export async function updateMotoristaUseCase(
  motorista: Motorista | null,
  input: MotoristaUpdateInput
): Promise<UseCaseVoidResult> {
  const normalized: MotoristaUpdatePayload = {
    empresa_id: input.empresa_id,
    nome: input.nome.trim(),
    cpf: input.cpf.trim(),
    cnh: input.cnh.trim(),
    telefone: input.telefone.trim(),
    ativo: input.ativo ?? true,
    modelo_caminhao: input.modelo_caminhao.trim(),
    ano_caminhao: Number(input.ano_caminhao),
    cor_caminhao: input.cor_caminhao.trim(),
    placa_caminhao: input.placa_caminhao.trim(),
  };

  try {
    if (!motorista?.id) {
      await motoristaService.create(normalized, input.empresa_id);
    } else {
      await motoristaService.update(motorista.id, normalized, input.empresa_id);
    }
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao salvar motorista." };
  }
}
