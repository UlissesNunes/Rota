import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "../LogoRota";
import { NavRota } from "../NavRota";

export function HeadingRota() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg md:text-xl lg:text-2xl">
              Rota
            </h1>
            <p className="hidden text-[11px] text-slate-600 sm:block sm:text-xs md:text-sm">
              Organize suas rotas
            </p>
          </div>
        </div>

        {/* Menu fixo no lado direito do header */}
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2.5 py-2 text-slate-900 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-slate-900/30"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-80 max-w-[90vw] border-l border-slate-200 bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-900" />
                <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Menu
                </h2>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2.5 py-2 text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-5">
              <NavRota
                variant="vertical"
                onNavigate={() => setMenuOpen(false)}
              />
            </nav>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs text-slate-600 sm:text-sm">
                Opções laterais para navegar.
              </p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}