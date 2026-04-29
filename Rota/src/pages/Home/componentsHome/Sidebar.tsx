// src/pages/Home/componentsHome/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../../../components/ThemeToggle/ThemeToggle";

type NavItem = { label: string; to: string };
type NavGroup = { label: string; icon: React.ReactNode; items: NavItem[] };

const Icon = ({ d }: { d: string }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

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
      { label: "Criar viagem", to: "/viagens/nova" },
      { label: "Enviar Frete", to: "/viagens/EnviarFrete" },
      { label: "Gestão de Viagens", to: "/viagens/gestao" },
    ],
  },
  {
    label: "Equipe",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="19" cy="7" r="2" />
        <path d="M23 21v-1a3 3 0 0 0-2-2.83" />
      </svg>
    ),
    items: [
      { label: "Motoristas", to: "/motorista/Inicial" },
    ],
  },
  
  {
    label: "Sistema",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    items: [
      { label: "Configurações", to: "/sistema/configuracoes" }
     
    ],
  },
];
type SidebarProps = { open: boolean; onClose: () => void };

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <aside
      className={`
      fixed top-0 left-0 h-full w-60 z-50 flex flex-col
      bg-white dark:bg-[#111110]
      border-r border-black/[0.06] dark:border-white/[0.06]
      overflow-y-auto transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3
                      border-b border-black/[0.06] dark:border-white/[0.06]"
      >
        <img src="/rotaicone.webp" alt="Rota" className="h-7 w-auto" />
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-gray-400 dark:text-[#555]
                     hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {/* Group label */}
            <div
              className="flex items-center gap-2 px-2 pb-2
                            text-[10px] font-semibold uppercase tracking-widest
                            text-gray-400 dark:text-[#555]"
            >
              <span className="text-gray-300 dark:text-[#444]">
                {group.icon}
              </span>
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
                        block px-3 py-1.5 rounded-lg text-[13px] transition-colors
                        ${
                          active
                            ? "font-semibold text-[#FE751B] bg-[#FE751B]/10"
                            : "font-normal text-gray-500 dark:text-[#999] hover:text-gray-900 dark:hover:text-[#ddd] hover:bg-black/5 dark:hover:bg-white/5"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-3 py-3 border-t border-black/[0.06] dark:border-white/[0.06]
                      flex flex-col gap-2"
      >
        <ThemeToggle variant="button" />
        <p className="text-[10px] text-gray-300 dark:text-[#444] px-1">
          Rota © {new Date().getFullYear()}
        </p>
      </div>
    </aside>
  );
};
