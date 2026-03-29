// src/pages/Home/componentsHome/Sidebar.tsx
import { Link } from "react-router-dom";
import type { OnboardingState } from "../../../types/Onboarding";

type SidebarProps = {
  onboarding: OnboardingState | null;
  open: boolean;
  onClose: () => void;
};

export const Sidebar = ({ onboarding, open, onClose }: SidebarProps) => {
  const getItemClass = (completed?: boolean) =>
    completed ? "text-white" : "text-[#FF6A00]";

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-300 p-4 transform transition-transform duration-300 ease-in-out z-50 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button onClick={onClose} className="text-gray-400 hover:text-white mb-4">
        ✕ Fechar
      </button>
      <h2 className="text-xl font-bold mb-6">Menu</h2>
  
      {/* Empresa */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-gray-400">🏢 Empresa</p>
        <ul className="ml-2 space-y-1">
          <li>
            <Link to="/onboarding/empresa/dados" className={getItemClass(onboarding?.empresa.dados)}>
              Dados da Empresa
            </Link>
          </li>
         
        </ul>
      </div>

          {/* Painel */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-gray-400">Painel principal</p>
        <ul className="ml-2 space-y-1">
           <li>
            <Link to="/onboarding/Painel/gestaodefrota" className={getItemClass(onboarding?.Painel.CriarRota)}>
              Criar Rota   
            </Link>
          </li>

          <li>
            <Link to="/onboarding/Painel/gestaodefrota" className={getItemClass(onboarding?.Painel.gestaodefrota)}>
              Gestão de Frota
            </Link>
          </li>
           <li>
            <Link to="/onboarding/Painel/relatorios" className={getItemClass(onboarding?.Painel.relatorios)}>
              Relatórios
            </Link>
          </li>
         
        </ul>
      </div>


      {/* Equipe */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-gray-400">👥 Equipe</p>
        <ul className="ml-2 space-y-1">
          <li>
            <Link to="/onboarding/equipe/motoristas" className={getItemClass(onboarding?.equipe.motoristas)}>
              Motoristas
            </Link>
          </li>
          <li>
            <Link to="/onboarding/equipe/funcionarios" className={getItemClass(onboarding?.equipe.funcionarios)}>
              Funcionários
            </Link>
          </li>
        </ul>
      </div>

      {/* Produtos */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-gray-400">📦 Produtos</p>
        <ul className="ml-2 space-y-1">
          <li>
            <Link to="/onboarding/produtos/servicos" className={getItemClass(onboarding?.produtos.servicos)}>
              Serviços 
            </Link>
          </li>
          <li>
            <Link to="/onboarding/produtos/categorias" className={getItemClass(onboarding?.produtos.categorias)}>
              Categorias
            </Link>
          </li>
        </ul>
      </div>

      {/* Sistema */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-gray-400">⚙️ Sistema</p>
        <ul className="ml-2 space-y-1">
          <li>
            <Link to="/onboarding/sistema/configuracoes" className={getItemClass(onboarding?.sistema.configuracoes)}>
              Configurações Gerais
            </Link>
          </li>
          <li>
            <Link to="/onboarding/sistema/notificacoes" className={getItemClass(onboarding?.sistema.notificacoes)}>
              Notificações
            </Link>
          </li>
          <li>
            <Link to="/onboarding/sistema/tema" className={getItemClass(onboarding?.sistema.tema)}>
              Tema
            </Link>
          </li>
        </ul>
      </div>

      {/* Financeiro */}
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase text-gray-400">💳 Financeiro</p>
        <ul className="ml-2 space-y-1">
          <li>
            <Link to="/onboarding/financeiro/plano" className={getItemClass(onboarding?.financeiro.plano)}>
              Plano Atual
            </Link>
          </li>
          <li>
            <Link to="/onboarding/financeiro/pagamentos" className={getItemClass(onboarding?.financeiro.pagamentos)}>
              Pagamentos
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};