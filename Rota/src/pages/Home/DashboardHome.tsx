// src/pages/Home/DashboardHome/DashboardHome.tsx
import { useDashboardData } from "../../hooks/useDashboardData";
import type { User } from "@supabase/supabase-js";

// Estáticos — não dependem de dados, nunca causam re-render desnecessário
import {
  DashboardBanner,
  DashboardGreeting,
  QuickActionsSection,
  FeaturesSection,
  DashboardSkeleton,
  DashboardError,
} from "./DashboardStaticComponents";
import { KPIGrid, ActivityCharts } from "./DashboardComponents";

// Dinâmicos — wrapped em memo, re-renderizam só quando os dados mudam


type DashboardHomeProps = { user: User };

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  const { data, loading, error, refetch } = useDashboardData();

  const primeiroNome =
    user.user_metadata?.nome?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "usuário";

  if (loading) return <DashboardSkeleton />;
  if (error)   return <DashboardError message={error} onRetry={refetch} />;
  if (!data)   return null;

  return (
    <div
      className="min-h-screen w-full bg-gray-100 dark:bg-[#0f0f0e]
                 text-gray-900 dark:text-neutral-100
                 animate-[dash-in_0.4s_ease_both]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @keyframes dash-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Banner — estático, carrega imediatamente */}
      <DashboardBanner />

      <div className="max-w-[1080px] mx-auto px-5 py-8 flex flex-col gap-8 pb-20">
        {/* Saudação — estática */}
        <DashboardGreeting nome={primeiroNome} email={user.email ?? ""} />

        {/* KPIs — dinâmico, memo */}
        <KPIGrid kpis={data.kpis} />

        {/* Ações rápidas — estático */}
        <QuickActionsSection />

        {/* Gráficos — dinâmico, memo */}
        <ActivityCharts
          chartViagens={data.chartViagens}
          chartMotoristas={data.chartMotoristas}
        />

        {/* Features — estático */}
        <FeaturesSection />
      </div>
    </div>
  );
};