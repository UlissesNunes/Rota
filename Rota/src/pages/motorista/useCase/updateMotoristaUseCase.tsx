import type { UseCaseVoidResult } from "../../../types/useCasesIsReturnFromSistem";
import { motoristaService } from "../Service/motoristaService";
import type { Motorista, MotoristaUpdateInput, MotoristaUpdatePayload } from "../Types/motoristaTypes";

export async function updateMotoristaUseCase(
  motorista: Motorista | null,
  input: MotoristaUpdateInput
): Promise<UseCaseVoidResult> {
  const normalized: Partial<MotoristaUpdatePayload> = {};

  if (input.nome) normalized.nome = input.nome.trim();
  if (input.cpf) normalized.cpf = input.cpf.trim();
  if (input.cnh) normalized.cnh = input.cnh.trim();
  if (input.telefone) normalized.telefone = input.telefone.trim();
  if (input.ativo !== undefined) normalized.ativo = input.ativo;
  if (input.modelo_caminhao) normalized.modelo_caminhao = input.modelo_caminhao.trim();
  if (input.ano_caminhao) normalized.ano_caminhao = Number(input.ano_caminhao);
  if (input.cor_caminhao) normalized.cor_caminhao = input.cor_caminhao.trim();
  if (input.placa_caminhao) normalized.placa_caminhao = input.placa_caminhao.trim();

  if (Object.keys(normalized).length === 0) {
    return { error: "Nenhum campo foi alterado." };
  }

  try {
    if (!motorista?.id) {
      await motoristaService.create(normalized as MotoristaUpdatePayload);
    } else {
      await motoristaService.update(motorista.id, normalized as MotoristaUpdatePayload);
    }
    return { error: null };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erro ao salvar motorista." };
  }
}
