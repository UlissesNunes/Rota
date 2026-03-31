// src/pages/Home/DashboardHome.tsx
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

type DashboardHomeProps = {
  user: User;
};

const servicosData = [
  { categoria: "Seg", total: 0 },
  { categoria: "Ter", total: 0 },
  { categoria: "Qua", total: 0 },
  { categoria: "Qui", total: 0 },
  { categoria: "Sex", total: 0 },
];

const motoristasData = [
  { name: "Ativos", value: 0 },
  { name: "Inativos", value: 0 },
];

const COLORS = ["#FE751B", "#2a2a2a"];

const setupSteps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    titulo: "Configure sua empresa",
    descricao: "Adicione nome, CNPJ e número de WhatsApp para ativar automações.",
    acao: "Configurar empresa",
    rota: "/configuracoes/empresa",
    concluido: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M5.5 21a8.38 8.38 0 0 1 13 0"/>
      </svg>
    ),
    titulo: "Cadastre motoristas",
    descricao: "Vincule motoristas à sua empresa para atribuir viagens.",
    acao: "Adicionar motorista",
    rota: "/motoristas/novo",
    concluido: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
        <path d="M8 7V5a2 2 0 0 0-4 0v2"/>
      </svg>
    ),
    titulo: "Cadastre produtos",
    descricao: "Registre os produtos que você transporta para reuso rápido em viagens.",
    acao: "Adicionar produto",
    rota: "/produtos/novo",
    concluido: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    titulo: "Crie sua primeira viagem",
    descricao: "Lance a primeira ordem de transporte e acompanhe em tempo real.",
    acao: "Nova viagem",
    rota: "/viagens/nova",
    concluido: false,
  },
];

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    titulo: "Automações WhatsApp",
    descricao: "Lembretes e atualizações enviados automaticamente via n8n.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    titulo: "Rastreio em tempo real",
    descricao: "Acompanhe status, prazos e histórico de cada viagem.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    titulo: "Sugestões inteligentes",
    descricao: "Produtos sugeridos com base no histórico de cargas da sua empresa.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    titulo: "Multi-empresa",
    descricao: "Dados isolados por empresa com segurança total em nível de banco.",
  },
];

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const primeiroNome = user.user_metadata?.nome?.split(" ")[0] || user.email?.split("@")[0] || "usuário";

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        fontFamily: "'DM Sans', sans-serif",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');

        :root {
          --brand: #FE751B;
          --brand-dim: #FE751B22;
          --bg: #f8f7f5;
          --bg2: #ffffff;
          --fg: #1a1a1a;
          --fg2: #555;
          --border: #e8e5e0;
          --radius: 14px;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #111110;
            --bg2: #1a1a18;
            --fg: #f0ede8;
            --fg2: #888;
            --border: #2a2a28;
          }
        }

        .rota-banner {
          position: relative;
          width: 100%;
          min-height: 340px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }
        .rota-banner img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .rota-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #111110ee 30%, #11111055 70%, transparent 100%);
        }
        .rota-banner-content {
          position: relative;
          z-index: 2;
          padding: 2.5rem 2.5rem 2.5rem;
          max-width: 680px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--brand);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 99px;
          margin-bottom: 14px;
        }
        .banner-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 10px;
        }
        .banner-sub {
          color: #ccc;
          font-size: 15px;
          line-height: 1.6;
          max-width: 520px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--fg);
          margin: 0 0 18px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 14px;
        }
        .kpi-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          transition: box-shadow 0.2s;
        }
        .kpi-card:hover { box-shadow: 0 4px 20px #FE751B18; }
        .kpi-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--fg2);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .kpi-value {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--brand);
          line-height: 1;
        }
        .kpi-hint {
          font-size: 11px;
          color: var(--fg2);
          margin-top: 4px;
        }

        .setup-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }
        .setup-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .setup-card:hover {
          border-color: var(--brand);
          box-shadow: 0 4px 24px #FE751B14;
        }
        .setup-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--brand-dim);
          color: var(--brand);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .setup-titulo {
          font-weight: 600;
          font-size: 14px;
          color: var(--fg);
        }
        .setup-desc {
          font-size: 13px;
          color: var(--fg2);
          line-height: 1.5;
          flex: 1;
        }
        .setup-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: var(--brand);
          margin-top: 4px;
        }
        .setup-btn svg {
          transition: transform 0.2s;
        }
        .setup-card:hover .setup-btn svg {
          transform: translateX(3px);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .feature-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .feature-icon {
          color: var(--brand);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .feature-titulo {
          font-weight: 600;
          font-size: 13px;
          color: var(--fg);
          margin-bottom: 4px;
        }
        .feature-desc {
          font-size: 12px;
          color: var(--fg2);
          line-height: 1.5;
        }

        .progress-bar-track {
          height: 4px;
          background: var(--border);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 6px;
        }
        .progress-bar-fill {
          height: 100%;
          width: 0%;
          background: var(--brand);
          border-radius: 99px;
          transition: width 0.8s ease;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 14px;
        }
        @media (max-width: 680px) {
          .charts-grid { grid-template-columns: 1fr; }
          .rota-banner { min-height: 260px; }
          .rota-banner-content { padding: 1.5rem; }
        }
        .chart-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
        }

        .greeting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .greeting-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--fg);
        }
        .greeting-email {
          font-size: 13px;
          color: var(--fg2);
          margin-top: 2px;
        }
        .dot-live {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          margin-right: 6px;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>

      {/* ── BANNER ── */}
      <div className="rota-banner">
        <img src="/assets/rotaConfigAmbiente.webp" alt="Rota — Plataforma de Transporte" />
        <div className="rota-banner-overlay" />
        <div className="rota-banner-content">
          <div className="badge">
            <span className="dot-live" />
            Plataforma ativa
          </div>
          <h1 className="banner-title">
            Gerencie sua<br />operação de ponta<br />a ponta.
          </h1>
          <p className="banner-sub">
            Rota é um SaaS para empresas de transporte e distribuição.
            Controle viagens, motoristas e cargas — com automações inteligentes
            via WhatsApp.
          </p>
        </div>
      </div>

      {/* ── CONTEÚDO ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        {/* Saudação */}
        <div className="greeting-row" style={{ marginBottom: "2rem" }}>
          <div>
            <div className="greeting-text">Olá, {primeiroNome} 👋</div>
            <div className="greeting-email">{user.email}</div>
          </div>
          <div style={{
            background: "var(--brand-dim)",
            color: "var(--brand)",
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
          }}>
            Configure o sistema para começar
          </div>
        </div>

        {/* KPIs */}
        <div style={{ marginBottom: "2rem" }}>
          <div className="section-title">Visão geral</div>
          <div className="kpi-grid">
            {[
              { label: "Viagens ativas", value: "—", hint: "Nenhuma viagem criada ainda" },
              { label: "Motoristas", value: "—", hint: "Nenhum motorista cadastrado" },
              { label: "Produtos", value: "—", hint: "Nenhum produto registrado" },
              { label: "Entregas este mês", value: "—", hint: "Dados aparecerão aqui" },
            ].map((k) => (
              <div className="kpi-card" key={k.label}>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-value">{k.value}</div>
                <div className="kpi-hint">{k.hint}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div className="section-title" style={{ margin: 0 }}>Configure seu sistema</div>
            <span style={{ fontSize: 12, color: "var(--fg2)" }}>0 de 4 concluídos</span>
          </div>
          <div className="progress-bar-track" style={{ marginBottom: 18 }}>
            <div className="progress-bar-fill" style={{ width: "0%" }} />
          </div>
          <div className="setup-grid">
            {setupSteps.map((step) => (
              <a className="setup-card" key={step.titulo} href={step.rota}>
                <div className="setup-icon">{step.icon}</div>
                <div className="setup-titulo">{step.titulo}</div>
                <div className="setup-desc">{step.descricao}</div>
                <div className="setup-btn">
                  {step.acao}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Gráficos (vazios/placeholder) */}
        <div style={{ marginBottom: "2rem" }}>
          <div className="section-title">Atividade</div>
          <div className="charts-grid">
            <div className="chart-card">
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", marginBottom: 16 }}>
                Viagens por dia
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={servicosData} barSize={28}>
                  <XAxis dataKey="categoria" tick={{ fontSize: 11, fill: "var(--fg2)" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                    cursor={{ fill: "var(--brand-dim)" }}
                  />
                  <Bar dataKey="total" fill="#FE751B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", marginBottom: 16 }}>
                Motoristas
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={motoristasData}
                    cx="50%" cy="50%"
                    innerRadius={42} outerRadius={64}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {motoristasData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
                {motoristasData.map((d, i) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--fg2)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i], display: "inline-block" }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="section-title">O que a Rota oferece</div>
          <div className="features-grid">
            {features.map((f) => (
              <div className="feature-card" key={f.titulo}>
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <div className="feature-titulo">{f.titulo}</div>
                  <div className="feature-desc">{f.descricao}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};