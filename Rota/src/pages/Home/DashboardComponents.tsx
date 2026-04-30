// src/pages/Home/DashboardHome/DashboardDataComponents.tsx
// Componentes que dependem de dados do servidor.
// Wrapped em memo — re-renderizam só quando os dados mudam.

import { memo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { Link } from "react-router-dom";
import { ROTAS } from "../../routes/Rotas";
import { SectionLabel } from "./DashboardStaticComponents";
import type {
  KPIViewModel,
  ChartViagensViewModel,
  ChartMotoristaViewModel,
} from "../../types/DashboardViewModel";

// ── Constantes visuais ────────────────────────────────────────────────────────

const BRAND        = "#FE751B";
const CHART_COLORS = [BRAND, "#3a3a3a"];

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "var(--tooltip-bg, #1a1a1a)",
    border: "1px solid rgba(254,117,27,0.2)",
    borderRadius: 8,
    fontSize: 12,
    color: "#e5e5e5",
  },
};

// ── KPI Card individual ───────────────────────────────────────────────────────
// "Taxa de conclusão" recebe barra de progresso colorida.
// Os demais exibem o número grande padrão.

const KPICard = ({ k }: { k: KPIViewModel }) => {
  const isTaxa = k.label === "Taxa de conclusão";
  const pct    = isTaxa && typeof k.value === "number" ? k.value : 0;

  // Verde ≥ 80%, laranja ≥ 50%, vermelho abaixo
  const barColor =
    pct >= 80 ? "#22c55e"
    : pct >= 50 ? "#FE851B"
    : "#FE603B";

  return (
    <div
      className="bg-white dark:bg-neutral-900
                 border border-black/[0.06] dark:border-white/[0.05]
                 rounded-xl p-5 flex flex-col gap-2
                 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#FE751B]/6
                 transition-all duration-200"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider
                    text-gray-400 dark:text-neutral-500">
        {k.label}
      </p>

      {isTaxa ? (
        <>
          <p className="text-[2rem] font-bold leading-none" style={{ color: barColor }}>
            {pct}
            <span className="text-[1.1rem] ml-0.5 font-semibold">%</span>
          </p>
          <div className="h-[3px] w-full rounded-full bg-black/[0.07] dark:bg-white/[0.07] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: barColor }}
            />
          </div>
        </>
      ) : (
        <p className="text-[2rem] font-bold leading-none text-[#FE751B]">
          {k.value === 0 ? "—" : k.value}
        </p>
      )}

      <p className="text-[11px] text-gray-400 dark:text-neutral-500">{k.hint}</p>
    </div>
  );
};

// ── KPI Grid ──────────────────────────────────────────────────────────────────

export const KPIGrid = memo(({ kpis }: { kpis: KPIViewModel[] }) => (
  <div>
    <SectionLabel>Visão geral</SectionLabel>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <KPICard key={k.label} k={k} />
      ))}
    </div>
  </div>
));

KPIGrid.displayName = "KPIGrid";

// ── Activity Charts ───────────────────────────────────────────────────────────

type ActivityChartsProps = {
  chartViagens:    ChartViagensViewModel[];
  chartMotoristas: ChartMotoristaViewModel[];
};

export const ActivityCharts = memo(({ chartViagens, chartMotoristas }: ActivityChartsProps) => (
  <div>
    <SectionLabel>Atividade</SectionLabel>
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">

      {/* Bar chart — viagens por status */}
      <div className="bg-white dark:bg-neutral-900
                      border border-black/[0.06] dark:border-white/[0.05]
                      rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] font-semibold text-gray-800 dark:text-neutral-200">
            Viagens por status
          </p>
          <Link
            to={ROTAS.viagens}
            className="text-[11px] font-semibold text-[#FE751B] hover:underline"
          >
            Ver todas →
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartViagens} barSize={26}>
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
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut chart — motoristas ativo/inativo */}
      <div className="bg-white dark:bg-neutral-900
                      border border-black/[0.06] dark:border-white/[0.05]
                      rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] font-semibold text-gray-800 dark:text-neutral-200">
            Motoristas
          </p>
          <Link
            to={ROTAS.motoristas}
            className="text-[11px] font-semibold text-[#FE751B] hover:underline"
          >
            Gerenciar →
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie
              data={chartMotoristas}
              cx="50%" cy="50%"
              innerRadius={42} outerRadius={62}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-out"
            >
              {chartMotoristas.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex gap-4 justify-center mt-1">
          {chartMotoristas.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-neutral-500"
            >
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
));

ActivityCharts.displayName = "ActivityCharts";