import { useNavigate } from "react-router-dom";

export function FooterRota() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="w-full border-t border-slate-200 py-8 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold text-black dark:text-white">
              Rota
            </div>
            <div className="text-xs text-slate-600 dark:text-white/70">
              © {year} Produto da Leziert. Todos os direitos reservados.
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button
              onClick={() => navigate("/LoginRota")}
              className="text-xs font-medium text-slate-600 hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              Início
            </button>
            <button
              onClick={() => navigate("/RotaPoliticaDePrivacidade")}
              className="text-xs font-medium text-slate-600 hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              Política de Privacidade
            </button>
            <button
              onClick={() => navigate("/RotaTermosDeUso")}
              className="text-xs font-medium text-slate-600 hover:text-black dark:text-white/70 dark:hover:text-white"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}