// src/shared/components/PageShell.tsx
// Wrapper padrão para todas as páginas — padding, título e subtítulo consistentes

type PageShellProps = {
  titulo:    string;
  subtitulo?: string;
  acao?:     React.ReactNode;
  children:  React.ReactNode;
  maxWidth?: string;
};

export const PageShell = ({
  titulo, subtitulo, acao, children, maxWidth = "max-w-2xl"
}: PageShellProps) => (
  <div className={`${maxWidth} mx-auto px-5 py-8`}>
    <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-neutral-100">{titulo}</h1>
        {subtitulo && (
          <p className="text-[13px] text-gray-400 dark:text-neutral-500 mt-1">{subtitulo}</p>
        )}
      </div>
      {acao && <div>{acao}</div>}
    </div>
    {children}
  </div>
);