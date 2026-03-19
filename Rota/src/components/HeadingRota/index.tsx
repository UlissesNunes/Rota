import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "../LogoRota";
import { NavRota } from "../NavRota";

export function HeadingRota() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
         
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-black/10 bg-slate-200 px-1 py-1 text-black shadow-sm hover:bg-[#FE751B]/90 focus:outline-none focus:ring-2 focus:ring-[#FE751B]/50"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

             <aside className="absolute right-0 top-0 h-full w-80 max-w-[90vw] border-l border-slate-200 bg-[#FE751B] p-4 shadow-xl">
            
              <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md border border-black/20 bg-transparent px-2.5 py-2 text-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/30"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-6">
              <NavRota variant="vertical" onNavigate={() => setMenuOpen(false)} />

              {/* Toggle de tema: disponível logo abaixo do link "Contact" */}
              <div className="mt-5 border-t border-black/20 pt-5">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/30"
                >
                  <span className="truncate">
                    {theme === "dark" ? "Modo claro" : "Modo escuro"}
                  </span>
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Moon className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}