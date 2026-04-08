// Contrato padrão de retorno para todos os use cases do sistema
 
export type UseCaseResult<T> = {
  data:  T | null;
  error: string | null;
};
 
// Use case sem retorno de dados (ex: delete, update simples)
export type UseCaseVoidResult = {
  error: string | null;
};
 