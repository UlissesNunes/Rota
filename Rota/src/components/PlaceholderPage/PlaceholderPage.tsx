// src/shared/components/PlaceholderPage.tsx

import { PageShell } from "../PageShell/PageShell";


export const PlaceholderPage = ({ titulo }: { titulo: string }) => (
  <PageShell titulo={titulo} subtitulo="Esta página está em desenvolvimento.">
    <div className="flex flex-col items-center justify-center py-16 gap-3
                    text-gray-300 dark:text-neutral-700">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
      <p className="text-[13px]">Em breve</p>
    </div>
  </PageShell>
);