// src/pages/Home/DashboardHome/DashboardStaticComponents.tsx
// Componentes 100% estáticos — sem props de dados, sem chamadas ao servidor.
// Re-renderizam apenas quando o usuário troca de rota.

import { Link } from "react-router-dom";
import { ROTAS } from "../../routes/Rotas";

// ── Constantes visuais ────────────────────────────────────────────────────────

const BRAND = "#FE751B";

// ── Atoms ─────────────────────────────────────────────────────────────────────

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-4
                text-gray-400 dark:text-neutral-500">
    {children}
  </p>
);

// ── Banner ────────────────────────────────────────────────────────────────────

export const DashboardBanner = () => (
  <div className="relative w-full min-h-[300px] sm:min-h-[260px] overflow-hidden
                  flex items-center justify-center group">
    <img
      src="/rotaPainel.webp"
      alt="Rota"
      loading="eager"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover object-[center_35%]
                 scale-[1.04] group-hover:scale-100 transition-transform duration-[9000ms] ease-linear"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/95" />
    <div className="relative z-10 text-center px-6 py-10 max-w-lg flex flex-col items-center gap-4">
      <h1 className="text-white text-3xl sm:text-4xl font-semibold leading-snug tracking-tight">
        Bem-vindo à <span style={{ color: BRAND }} className="font-bold">Rota</span>
      </h1>
      <p className="text-white/50 text-sm leading-relaxed max-w-xs">
        Gerencie viagens, motoristas e cargas com automações inteligentes via WhatsApp.
      </p>
    </div>
  </div>
);

// ── Greeting ──────────────────────────────────────────────────────────────────

type GreetingProps = { nome: string; email: string };

export const DashboardGreeting = ({ nome, email }: GreetingProps) => (
  <div className="flex items-center justify-between flex-wrap gap-3
                  pb-6 border-b border-black/[0.07] dark:border-white/[0.06]">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-neutral-100">
        Olá, {nome} 👋
      </h2>
      <p className="text-[13px] text-gray-400 dark:text-neutral-500 mt-0.5">{email}</p>
    </div>
    <Link
      to={ROTAS.empresa}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                 text-[#FE751B] bg-[#FE751B]/10 border border-[#FE751B]/20
                 hover:bg-[#FE751B]/20 transition-colors"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
      Configurações da empresa
    </Link>
  </div>
);

// ── Ações Rápidas ─────────────────────────────────────────────────────────────

type QuickAction = {
  titulo:    string;
  descricao: string;
  label:     string;
  to:        string;
  destaque?: boolean;
  icon:      React.ReactNode;
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    titulo:    "Nova viagem",
    descricao: "Registre uma viagem com origem, destino e motorista em segundos.",
    label:     "Criar viagem",
    to:        ROTAS.viagens,
    destaque:  true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M12 5l7 7-7 7"/>
      </svg>
    ),
  },
  {
    titulo:    "Motoristas",
    descricao: "Gerencie cadastros, CNH, caminhão e status de cada motorista.",
    label:     "Ver motoristas",
    to:        ROTAS.motoristas,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    titulo:    "Produtos",
    descricao: "Catálogo de cargas com unidades. Base para sugestões automáticas.",
    label:     "Ver produtos",
    to:        ROTAS.produtos,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2"/>
        <path d="M16 7V5a4 4 0 0 0-8 0v2"/>
      </svg>
    ),
  },
  {
    titulo:    "WhatsApp",
    descricao: "Configure automações de notificações e lembretes via n8n.",
    label:     "Configurar",
    to:        ROTAS.whatsapp,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                 A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38
                 A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81
                 a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.94
                 a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
];

export const QuickActionsSection = () => (
  <div>
    <SectionLabel>Ações rápidas</SectionLabel>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {QUICK_ACTIONS.map((action) => (
        <Link
          key={action.titulo}
          to={action.to}
          className={`group flex flex-col gap-3 p-5 rounded-xl no-underline
                      bg-white dark:bg-neutral-900
                      border transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FE751B]/6
                      ${action.destaque
                        ? "border-[#FE751B]/30 dark:border-[#FE751B]/25 hover:border-[#FE751B]/60"
                        : "border-black/[0.06] dark:border-white/[0.05] hover:border-[#FE751B]/35"
                      }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                           transition-colors duration-200
                           ${action.destaque
                             ? "bg-[#FE751B]/15 text-[#FE751B] group-hover:bg-[#FE751B]/25"
                             : "bg-[#FE751B]/08 text-[#FE751B] group-hover:bg-[#FE751B]/15"
                           }`}>
            {action.icon}
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[13px] font-semibold text-gray-800 dark:text-neutral-200 leading-tight">
              {action.titulo}
            </p>
            <p className="text-[12px] leading-relaxed text-gray-500 dark:text-neutral-500">
              {action.descricao}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#FE751B]">
            {action.label}
            <svg
              className="transition-transform duration-200 group-hover:translate-x-1"
              width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </Link>
      ))}
    </div>
  </div>
);

// ── Features ──────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    titulo:    "Automações WhatsApp",
    descricao: "Lembretes e atualizações enviados automaticamente via n8n.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
                 A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38
                 A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81
                 a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.94
                 a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    titulo:    "Rastreio em tempo real",
    descricao: "Acompanhe status, prazos e histórico de cada viagem.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    titulo:    "Sugestões inteligentes",
    descricao: "Produtos sugeridos com base no histórico de cargas.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83
                 M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    titulo:    "Multi-empresa",
    descricao: "Dados isolados por empresa com segurança total.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
] as const;

export const FeaturesSection = () => (
  <div>
    <SectionLabel>O que a Rota oferece</SectionLabel>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {FEATURES.map((f) => (
        <div
          key={f.titulo}
          className="flex gap-3 p-5 rounded-xl
                     bg-white dark:bg-neutral-900
                     border border-black/[0.06] dark:border-white/[0.05]
                     hover:-translate-y-0.5 transition-transform duration-200"
        >
          <div className="text-[#FE751B] flex-shrink-0 mt-0.5">{f.icon}</div>
          <div>
            <p className="text-[13px] font-semibold mb-1 text-gray-800 dark:text-neutral-200">
              {f.titulo}
            </p>
            <p className="text-[12px] leading-relaxed text-gray-500 dark:text-neutral-500">
              {f.descricao}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Loading / Error ───────────────────────────────────────────────────────────

export const DashboardSkeleton = () => (
  <div className="max-w-[1080px] mx-auto px-5 py-8 flex flex-col gap-6 animate-pulse">
    <div className="h-[260px] rounded-xl bg-gray-200 dark:bg-neutral-800" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 rounded-xl bg-gray-200 dark:bg-neutral-800" />
      ))}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-36 rounded-xl bg-gray-200 dark:bg-neutral-800" />
      ))}
    </div>
  </div>
);

export const DashboardError = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center gap-4 py-20
                  text-gray-500 dark:text-neutral-500">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <p className="text-sm">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 rounded-lg text-sm font-semibold
                 text-[#FE751B] bg-[#FE751B]/10 border border-[#FE751B]/20
                 hover:bg-[#FE751B]/20 transition-colors"
    >
      Tentar novamente
    </button>
  </div>
);