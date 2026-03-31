export type EmpresaDTO = { id: string; nome?: string | null; email?: string | null };
export type ViagemDTO = { id: string; categoria?: string | null; total?: number | null; data?: string | null };
export type MotoristaDTO = { id: string; nome?: string | null; status?: string | null };
export type OnboardingStepDTO = { id: string; titulo?: string | null; descricao?: string | null; rota?: string | null; acao?: string | null; concluido?: boolean | null };