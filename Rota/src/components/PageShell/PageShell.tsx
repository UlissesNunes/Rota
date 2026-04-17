// src/shared/components/PageShell.tsx
type PageShellProps = {
  titulo: string;
  subtitulo?: string;
  acao?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
};

export const PageShell = ({
  titulo,
  subtitulo,
  acao,
  children,
  maxWidth = "max-w-4xl",
}: PageShellProps) => (
  <div className={`${maxWidth} mx-auto`}>
    <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-neutral-100">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="text-[13px] text-gray-400 dark:text-neutral-500 mt-1">
            {subtitulo}
          </p>
        )}
      </div>
      {acao && <div>{acao}</div>}
    </div>
    {children}
  </div>
);