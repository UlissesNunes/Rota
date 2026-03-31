// src/pages/Home/componentsHome/HeaderHome.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Plus, User, LogOut, Settings } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { LogoutButton } from "../LogoutHome";

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

function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

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

  return (
    <header className="
      w-full h-16 flex items-center justify-between px-5 flex-shrink-0 z-30
      bg-white dark:bg-black
      border-b border-black/[0.06] dark:border-white/[0.06]
    ">

      {/* Esquerda: hamburger + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-gray-400 dark:text-[#888]
                     hover:text-[#FE751B] dark:hover:text-[#FE751B] transition-colors"
        >
          <Menu size={22} />
        </button>
        <img src="/rotaicone.webp" alt="Rota" className="h-7 w-auto" />
      </div>

      {/* Direita: ações */}
      <div className="flex items-center gap-2">

        {/* Botão Adicionar */}
        <div ref={addRef} className="relative">
          <button
            onClick={() => { setOpenAdd(v => !v); setOpenUser(false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       text-sm font-semibold text-[#FE751B]
                       bg-[#FE751B]/10 border border-[#FE751B]/25
                       hover:bg-[#FE751B]/20 transition-colors"
          >
            <Plus size={15} strokeWidth={2.5} />
            Adicionar
          </button>

          {openAdd && (
            <div className="absolute right-0 top-[calc(100%+8px)] min-w-[180px] z-50
                            bg-white dark:bg-[#1a1918]
                            border border-black/[0.08] dark:border-white/[0.08]
                            rounded-xl shadow-xl overflow-hidden">
              <ul className="py-1">
                {ADD_ITEMS.map((item) => (
                  <li
                    key={item.to}
                    onClick={() => { navigate(item.to); setOpenAdd(false); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer
                               text-gray-700 dark:text-[#ccc]
                               hover:bg-[#FE751B]/10 hover:text-[#FE751B]
                               transition-colors"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Menu do usuário */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => { setOpenUser(v => !v); setOpenAdd(false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                       text-gray-600 dark:text-[#ccc]
                       bg-black/5 dark:bg-white/5
                       border border-black/[0.08] dark:border-white/[0.08]
                       hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <User size={15} />
            {primeiroNome}
          </button>

          {openUser && (
            <div className="absolute right-0 top-[calc(100%+8px)] min-w-[180px] z-50
                            bg-white dark:bg-[#1a1918]
                            border border-black/[0.08] dark:border-white/[0.08]
                            rounded-xl shadow-xl overflow-hidden">
              <ul className="py-1">
                <li
                  onClick={() => { navigate("/sistema/configuracoes"); setOpenUser(false); }}
                  className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer
                             text-gray-700 dark:text-[#ccc]
                             hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Settings size={14} />
                  Configurações
                </li>

                <li className="border-t border-black/[0.06] dark:border-white/[0.06] my-1" />

                <li className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer
                               text-red-500 dark:text-red-400
                               hover:bg-red-500/10 transition-colors">
                  <LogOut size={14} />
                  <LogoutButton />
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};