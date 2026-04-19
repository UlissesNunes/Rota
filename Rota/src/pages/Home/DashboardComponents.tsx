// src/pages/Home/DashboardHome/DashboardComponents.tsx


import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie,Cell,
} from "recharts";
import type { OnboardingStep } from "../../domain/DashboardDomain";
import type { KPIViewModel, ChartViagensViewModel, ChartMotoristaViewModel } from "../../types/DashboardViewModel";
import { Link } from "react-router-dom";

// ── Constantes visuais ──────────────────────────────────────────────────────

const BRAND        = "#FE751B";
const CHART_COLORS = [BRAND, "#3a3a3a"];

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "var(--tooltip-bg, #fff)",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 8,
    fontSize: 12,
    color: "#333",
  },
};

// ── Atoms ───────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-3
                text-gray-400 dark:text-neutral-500">
    {children}
  </p>
);

// ── Banner ──────────────────────────────────────────────────────────────────

export const DashboardBanner = () => (
  <div className="relative w-full min-h-[320px] sm:min-h-[280px] overflow-hidden
                  flex items-center justify-center group">
    <img 
      src="/public/rotaPainel.webp"
      alt="Rota"
      className="absolute inset-0 w-full h-full object-cover object-[center_35%]
                 scale-[1.03] group-hover:scale-100 transition-transform duration-[8000ms] ease-linear"
    />
    <div className="absolute inset-0 bg-gradient-to-b
                    from-black/30 via-black/60 to-black/92" />

    <div className="relative z-10 text-center px-6 py-10 max-w-lg
                    flex flex-col items-center gap-4">
  

      {/* Título simples e limpo */}
      <h1 className="text-white text-3xl sm:text-4xl font-semibold leading-snug tracking-tight">
        Bem-vindo a <span className="text-[#FE751B] font-bold">Rota</span>
      </h1>

      <p className="text-white/55 text-sm leading-relaxed max-w-sm">
        Gerencie viagens, motoristas e cargas com automações inteligentes via WhatsApp.
      </p>
    </div>
  </div>
);

// ── Greeting ────────────────────────────────────────────────────────────────

type GreetingProps = { nome: string; email: string };

export const DashboardGreeting = ({ nome, email }: GreetingProps) => (
  <div className="flex items-center justify-between flex-wrap gap-3
                  pb-6 border-b border-black/[0.07] dark:border-white/[0.07]">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-neutral-100">
        Olá, {nome} 👋
      </h2>
      <p className="text-[13px] text-gray-400 dark:text-neutral-500 mt-0.5">{email}</p>
    </div>
    <Link
      to="/empresa"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                 text-[#FE751B] bg-[#FE751B]/10 border border-[#FE751B]/20
                 hover:bg-[#FE751B]/20 transition-colors"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
      Configure o sistema
    </Link>
  </div>
);

// ── KPI Grid ────────────────────────────────────────────────────────────────

export const KPIGrid = ({ kpis }: { kpis: KPIViewModel[] }) => (
  <div>
    <SectionLabel>Visão geral</SectionLabel>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="bg-white dark:bg-neutral-900
                     border border-black/[0.06] dark:border-white/[0.06]
                     rounded-xl p-5
                     hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FE751B]/5
                     transition-all duration-200"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2
                        text-gray-400 dark:text-neutral-500">
            {k.label}
          </p>
          <p className="text-[2rem] font-bold leading-none mb-1 text-[#FE751B]">
            {k.value === 0 ? "—" : k.value}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-neutral-500">{k.hint}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── Setup Section ───────────────────────────────────────────────────────────

export const SetupSection = ({ steps }: { steps: OnboardingStep[] }) => {
  const concluidos = steps.filter((s) => s.concluido).length;
  const pct = steps.length > 0 ? Math.round((concluidos / steps.length) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <SectionLabel>Configure seu sistema</SectionLabel>
        <span className="text-[11px] text-gray-400 dark:text-neutral-500 mb-3">
          {concluidos} de {steps.length} concluídos
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="h-[3px] rounded-full bg-black/[0.07] dark:bg-white/[0.07] mb-4 overflow-hidden">
        <div
          className="h-full bg-[#FE751B] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => (
          <a
            key={step.id}
            href={step.rota}
            className="group flex flex-col gap-2.5 p-5 rounded-xl no-underline
                       bg-white dark:bg-neutral-900
                       border border-black/[0.06] dark:border-white/[0.06]
                       hover:border-[#FE751B]/40 dark:hover:border-[#FE751B]/40
                       hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FE751B]/5
                       transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center
                            bg-[#FE751B]/10 text-[#FE751B] flex-shrink-0">
              {step.concluido ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              )}
            </div>
            <p className="text-[13px] font-semibold text-gray-800 dark:text-neutral-200">
              {step.titulo}
            </p>
            <p className="text-[12px] leading-relaxed flex-1
                          text-gray-500 dark:text-neutral-500">
              {step.descricao}
            </p>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[#FE751B]">
              {step.acao}
              <svg
                className="transition-transform duration-200 group-hover:translate-x-1"
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

// ── Activity Charts ─────────────────────────────────────────────────────────

type ActivityChartsProps = {
  chartViagens:    ChartViagensViewModel[];
  chartMotoristas: ChartMotoristaViewModel[];
};

export const ActivityCharts = ({ chartViagens, chartMotoristas }: ActivityChartsProps) => (
  <div>
    <SectionLabel>Atividade</SectionLabel>
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">

      {/* Bar chart */}
      <div className="bg-white dark:bg-neutral-900
                      border border-black/[0.06] dark:border-white/[0.06]
                      rounded-xl p-5">
        <p className="text-[13px] font-semibold mb-4 text-gray-800 dark:text-neutral-200">
          Viagens por categoria
        </p>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartViagens} barSize={28}>
            <XAxis
              dataKey="categoria"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip {...TOOLTIP_STYLE} cursor={{ fill: "rgba(254,117,27,0.06)" }} />
            <Bar
              dataKey="total"
              fill={BRAND}
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut chart */}
      <div className="bg-white dark:bg-neutral-900
                      border border-black/[0.06] dark:border-white/[0.06]
                      rounded-xl p-5">
        <p className="text-[13px] font-semibold mb-4 text-gray-800 dark:text-neutral-200">
          Motoristas
        </p>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={chartMotoristas}
              cx="50%" cy="50%"
              innerRadius={44} outerRadius={64}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            >
             
                  {chartMotoristas.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex gap-4 justify-center mt-2">
          {chartMotoristas.map((d, i) => (
            <div key={d.name}
                 className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-neutral-500">
              <span
                className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
              />
              {d.name}
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
);

// ── Features Section ────────────────────────────────────────────────────────

const FEATURES = [
  {
    titulo: "Automações WhatsApp",
    descricao: "Lembretes e atualizações enviados automaticamente via n8n.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13
                 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72
                 c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91
                 a16 16 0 0 0 6.18 6.18l.95-.94a2 2 0 0 1 2.11-.45
                 c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    titulo: "Rastreio em tempo real",
    descricao: "Acompanhe status, prazos e histórico de cada viagem.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    titulo: "Sugestões inteligentes",
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
    titulo: "Multi-empresa",
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
                     border border-black/[0.06] dark:border-white/[0.06]
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

// ── Estados de Loading / Error ──────────────────────────────────────────────

export const DashboardSkeleton = () => (
  <div className="max-w-[1080px] mx-auto px-5 py-8 flex flex-col gap-6 animate-pulse">
    <div className="h-[280px] rounded-xl bg-gray-200 dark:bg-neutral-800" />
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