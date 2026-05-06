// src/pages/Home/componentsHome/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../../../components/ThemeToggle/ThemeToggle";

type NavItem  = { label: string; to: string };
type NavGroup = { label: string; icon: React.ReactNode; items: NavItem[] };

// ── Ícone utilitário ──────────────────────────────────────────────────────────

const Icon = ({ d }: { d: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ── Grupos de navegação ───────────────────────────────────────────────────────

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Empresa",
    icon: <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    items: [{ label: "Dados da empresa", to: "/empresa/dados" }],
  },
  {
    label: "Painel",
    icon: <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
    items: [
      { label: "Criar viagem",      to: "/viagens/nova"          },
      { label: "Enviar Frete",      to: "/viagens/EnviarFrete"   },
      { label: "Gestão de Viagens", to: "/viagens/gestao"        },
    ],
  },
  {
    label: "Equipe",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4"/>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <circle cx="19" cy="7" r="2"/>
        <path d="M23 21v-1a3 3 0 0 0-2-2.83"/>
      </svg>
    ),
    items: [{ label: "Motoristas", to: "/motorista/Inicial" }],
  },
  {
    label: "Sistema",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
    items: [
  { label: "Configurações", to: "/sistema/configuracoes" },
  { label: "Meu WhatsApp", to: "/meu-whatsapp" },
],
  },
];

// ── Componente ────────────────────────────────────────────────────────────────

type SidebarProps = { open: boolean; onClose: () => void };

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Overlay escurecido ao abrir no mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]
                     lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-[220px] z-50 flex flex-col
          bg-white dark:bg-[#111110]
          border-r border-black/[0.06] dark:border-white/[0.05]
          overflow-y-auto transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3.5
                        border-b border-black/[0.06] dark:border-white/[0.05]">
          <Link to="/home">
            <img src="/rotaicone.webp" alt="Rota" className="h-6 w-auto" />
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md
                       text-gray-300 dark:text-[#444]
                       hover:text-[#FE751B] dark:hover:text-[#FE751B]
                       transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* ── Navegação ───────────────────────────────────────── */}
        <nav className="flex-1 px-2 py-4 space-y-5 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>

              {/* Label do grupo */}
              <div className="flex items-center gap-1.5 px-2 pb-1.5
                              text-[10px] font-semibold uppercase tracking-[0.12em]
                              text-gray-300 dark:text-[#444]">
                <span className="flex-shrink-0">{group.icon}</span>
                {group.label}
              </div>

              {/* Items */}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-lg
                          text-[13px] transition-colors duration-150
                          ${active
                            ? "font-semibold text-[#FE751B] bg-[#FE751B]/10"
                            : "font-normal text-gray-500 dark:text-[#888]  hover:text-gray-900 dark:hover:text-[#ddd] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                          }
                        `}
                      >
                        {/* Indicador ativo */}
                        {active && (
                          <span className="w-1 h-1 rounded-full bg-[#FE751B] flex-shrink-0" />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>
          ))}
        </nav>

        {/* ── Footer ──────────────────────────────────────────── */}
        <div className="px-2 py-3
                        border-t border-black/[0.06] dark:border-white/[0.05]
                        flex flex-col gap-1">
          <ThemeToggle variant="button" />
          <p className="text-[10px] text-gray-300 dark:text-[#383838] px-3 py-1">
            Rota © {new Date().getFullYear()}
          </p>
        </div>
      </aside>
    </>
  );
};