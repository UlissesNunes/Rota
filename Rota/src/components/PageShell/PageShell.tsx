// src/shared/components/PageShell.tsx
import type { ReactNode } from "react";

type PageShellProps = {
  titulo: string;
  subtitulo?: string;
  acao?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
};

export const PageShell = ({
  titulo,
  subtitulo,
  acao,
  children,
  
}: PageShellProps) => (
  <div className={` mx-auto px-6 py-8 bg-black min-h-screen`}>
    <div className="flex items-start justify-between flex-wrap gap-3 mb-8 border-b border-orange-500 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-orange-500">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="text-sm text-gray-300 mt-1">
            {subtitulo}
          </p>
        )}
      </div>
      {acao && <div className="flex items-center gap-2">{acao}</div>}
    </div>
    <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-orange-500/30">
      {children}
    </div>
  </div>
);
