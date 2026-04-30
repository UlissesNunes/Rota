// src/pages/Home/componentsHome/HeaderHome.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Plus, LogOut, Settings } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { LogoutButton } from "../LogoutHome";

// ── Tipos / constantes ────────────────────────────────────────────────────────

type AddItem = { label: string; to: string };

const ADD_ITEMS: AddItem[] = [
  { label: "Nova viagem",    to: "/viagens/nova"      },
  { label: "Novo motorista", to: "/equipe/motoristas" },
  { label: "Novo produto",   to: "/produtos/servicos" },
];

type HeaderHomeProps = {
  onToggleSidebar: () => void;
  user?: SupabaseUser | null;
};

// ── Hook utilitário ───────────────────────────────────────────────────────────

function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// ── Dropdown compartilhado ────────────────────────────────────────────────────

const DropdownShell = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 top-[calc(100%+6px)] min-w-[188px] z-50
                  bg-white dark:bg-[#161614]
                  border border-black/[0.07] dark:border-white/[0.07]
                  rounded-xl shadow-lg shadow-black/[0.06]
                  overflow-hidden animate-[fade-in_0.12s_ease]">
    {children}
  </div>
);

const DropdownItem = ({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) => (
  <li
    onClick={onClick}
    className={`flex items-center gap-2.5 px-4 py-2 text-[13px] cursor-pointer transition-colors
      ${danger
        ? "text-red-500 dark:text-red-400 hover:bg-red-500/08"
        : "text-gray-600 dark:text-[#bbb] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white"
      }`}
  >
    <span className="flex-shrink-0 opacity-70">{icon}</span>
    {label}
  </li>
);

// ── Componente principal ──────────────────────────────────────────────────────

export const HeaderHome = ({ onToggleSidebar, user }: HeaderHomeProps) => {
  const navigate = useNavigate();
  const [openAdd,  setOpenAdd]  = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const addRef  = useRef<HTMLDivElement>(null!);
  const userRef = useRef<HTMLDivElement>(null!);

  useClickOutside(addRef,  () => setOpenAdd(false));
  useClickOutside(userRef, () => setOpenUser(false));

  const primeiroNome =
    user?.user_metadata?.nome?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Perfil";

  // Inicial do avatar
  const inicial = primeiroNome.charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="
        w-full h-14 flex items-center justify-between px-4 flex-shrink-0 z-30
        bg-white dark:bg-black
        border-b border-black/[0.06] dark:border-white/[0.05]
      ">

        {/* ── Esquerda: hamburger + logo ─────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-md
                       text-gray-400 dark:text-[#555]
                       hover:text-[#FE751B] dark:hover:text-[#FE751B]
                       transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/home">
          <img src="/rotaicone.webp" alt="Rota" className="h-6 w-auto" />
        </Link>
        </div>

        {/* ── Direita: ações ────────────────────────────────── */}
        <div className="flex items-center gap-1.5">

          {/* Botão Adicionar */}
          <div ref={addRef} className="relative">
            <button
              onClick={() => { setOpenAdd(v => !v); setOpenUser(false); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         text-[13px] font-semibold text-[#FE751B]
                         bg-[#FE751B]/10 border border-[#FE751B]/20
                         hover:bg-[#FE751B]/18 hover:border-[#FE751B]/35
                         transition-colors"
            >
              <Plus size={14} strokeWidth={2.5} />
              Adicionar
            </button>

            {openAdd && (
              <DropdownShell>
                <ul className="py-1">
                  {ADD_ITEMS.map((item) => (
                    <DropdownItem
                      key={item.to}
                      icon={<Plus size={13} strokeWidth={2} />}
                      label={item.label}
                      onClick={() => { navigate(item.to); setOpenAdd(false); }}
                    />
                  ))}
                </ul>
              </DropdownShell>
            )}
          </div>

          {/* Divider */}
          <span className="w-px h-5 bg-black/[0.08] dark:bg-white/[0.08] mx-0.5" />

          {/* Menu do usuário */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => { setOpenUser(v => !v); setOpenAdd(false); }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg
                         text-[13px] font-medium
                         text-gray-600 dark:text-[#bbb]
                         hover:bg-black/[0.04] dark:hover:bg-white/[0.04]
                         hover:text-gray-900 dark:hover:text-white
                         transition-colors"
            >
              {/* Avatar circular com inicial */}
              <span className="w-6 h-6 rounded-full flex items-center justify-center
                               bg-[#FE751B]/15 text-[#FE751B]
                               text-[11px] font-bold flex-shrink-0">
                {inicial}
              </span>
              {primeiroNome}
            </button>

            {openUser && (
              <DropdownShell>
                {/* Cabeçalho do dropdown com email */}
                {user?.email && (
                  <div className="px-4 py-2.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <p className="text-[11px] text-gray-400 dark:text-[#555] truncate">
                      {user.email}
                    </p>
                  </div>
                )}
                <ul className="py-1">
                  <DropdownItem
                    icon={<Settings size={13} />}
                    label="Configurações"
                    onClick={() => { navigate("/sistema/configuracoes"); setOpenUser(false); }}
                  />
                  <li className="mx-3 my-1 border-t border-black/[0.06] dark:border-white/[0.06]" />
                  <DropdownItem
                    icon={<LogOut size={13} />}
                    label={<LogoutButton />}
                    danger
                  />
                </ul>
              </DropdownShell>
            )}
          </div>

        </div>
      </header>
    </>
  );
};