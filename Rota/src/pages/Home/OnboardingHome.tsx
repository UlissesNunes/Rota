// src/pages/Home/OnboardingHome.tsx
import type { OnboardingState } from "../../types/Onboarding";

type OnboardingHomeProps = {
  onboarding: OnboardingState;
};

export const OnboardingHome = ({ onboarding }: OnboardingHomeProps) => {
  // aqui você usa onboarding para calcular progresso e renderizar UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <h2 className="text-lg text-gray-300">CONFIGURE SEU</h2>
      <h1 className="text-4xl font-bold text-[#FF6A00] drop-shadow-glow mb-4">
        NOVO AMBIENTE
      </h1>
      <p className="text-gray-400 max-w-md text-center mb-6">
        Vamos configurar sua empresa em poucos passos para liberar todas as funcionalidades da plataforma.
      </p>
      {/* Exemplo de uso do objeto onboarding */}
      <p className="text-sm text-gray-400">
        Etapas concluídas: {Object.values(onboarding.empresa).filter(Boolean).length} /{" "}
        {Object.keys(onboarding.empresa).length}
      </p>
    </div>
  );
};