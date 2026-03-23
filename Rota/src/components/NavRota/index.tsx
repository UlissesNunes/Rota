import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export function NavRota() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  const applyTheme = (nextTheme: "dark" | "light") => {
    setTheme(nextTheme);
    window.localStorage.setItem("rota-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  // Definição de cor dinâmica
  const textColor =
    theme === "dark"
      ? "text-white hover:text-[#FE751B]"
      : "text-black hover:text-[#FE751B]";

  return (
    <nav className="flex items-center gap-6">
      <a
        href="/contact"
        className={`text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FE751B]/50 transition-colors ${textColor}`}
      >
        Contato
      </a>

      <button
        type="button"
        onClick={toggleTheme}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold focus:outline-none  transition-colors ${textColor}`}
      >
        <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
        {theme === "dark" ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </nav>
  );
}