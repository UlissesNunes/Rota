// src/components/ThemeToggle.tsx
// Botão de tema reutilizável — pode ser colocado na Sidebar, Header, ou qualquer página
// Usa a mesma lógica do NavRota via themeUtils — sempre em sincronia com localStorage

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { themeUtils, type Tema } from "../../hooks/useTheme";

type ThemeToggleProps = {
  /** "button" = botão completo com texto | "icon" = só o ícone */
  variant?: "button" | "icon";
};

export const ThemeToggle = ({ variant = "button" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<Tema>(() => themeUtils.lerTema());

  const toggle = () => {
    const proximo: Tema = theme === "dark" ? "light" : "dark";
    themeUtils.aplicarTema(proximo);
    setTheme(proximo);
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggle}
        title={
          theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"
        }
        className="p-1.5 rounded-md text-gray-400 dark:text-[#666]
                   hover:text-[#FE751B] dark:hover:text-[#FE751B] transition-colors"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px]  focus:outline-none
                 text-gray-500 dark:text-[#999]
                 hover:bg-black/5 dark:hover:bg-white/5
                 hover:text-gray-900 dark:hover:text-[#ddd]
                 transition-colors"
    >
      <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
      {theme === "dark" ? (
        <Sun className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      )}
    </button>
  );
};
