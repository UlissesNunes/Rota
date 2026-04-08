// src/components/NavRota.tsx
// Idêntico ao original — agora usa themeUtils para consistência com a Sidebar

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { themeUtils, type Tema }  from "../../hooks/useTheme";

export function NavRota() {
  const [theme, setTheme] = useState<Tema>(() => themeUtils.lerTema());

  const toggleTheme = () => {
    const proximo: Tema = theme === "dark" ? "light" : "dark";
    themeUtils.aplicarTema(proximo);
    setTheme(proximo);
  };

  const textColor =
    theme === "dark"
      ? "text-white hover:text-[#FE751B]"
      : "text-black hover:text-[#FE751B]";

  return (
    <nav className="flex items-center gap-6">
      <a
        href="/contact"
        className={`text-sm font-medium focus:outline-none focus:ring-2
                    focus:ring-[#FE751B]/50 transition-colors ${textColor}`}
      >
        Contato
      </a>
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm
                    font-semibold focus:outline-none transition-colors ${textColor}`}
      >
        <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
        {theme === "dark"
          ? <Sun  className="h-4 w-4" aria-hidden="true" />
          : <Moon className="h-4 w-4" aria-hidden="true" />
        }
      </button>
    </nav>
  );
}