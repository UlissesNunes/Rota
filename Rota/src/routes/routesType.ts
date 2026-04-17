// src/routes/route.types.ts
// Fonte única de verdade para todas as rotas do sistema
// NUNCA use strings hardcoded fora deste arquivo

export const ROUTES = {
  // Autenticação (públicas)
  auth: {
    login:         "/login",
    cadastro:      "/cadastro",
    esqueciSenha:  "/esqueci-senha",
    novaSenha:     "/nova-senha",
  },

  // Home — raiz do layout autenticado
  // FIX #1: alinhado com AppRoutes que usa "/home"
  home: "/home",

  // Empresa
  empresa: {
    dados: "/home/empresa/dados",
  },

  // Painel / Viagens
  painel: {
    novaViagem: "/home/viagens/nova",
    frota:      "/home/painel/frota",
    relatorios: "/home/painel/relatorios",
  },

  // Equipe
  equipe: {
    motoristas:   "/home/equipe/motoristas",
    funcionarios: "/home/equipe/funcionarios",
  },

  // Produtos
  produtos: {
    servicos:   "/home/produtos/servicos",
    categorias: "/home/produtos/categorias",
  },

  // Sistema
  sistema: {
    configuracoes: "/home/sistema/configuracoes",
    notificacoes:  "/home/sistema/notificacoes",
    tema:          "/home/sistema/tema",
  },

  // Financeiro
  financeiro: {
    plano:      "/home/financeiro/plano",
    pagamentos: "/home/financeiro/pagamentos",
  },
} as const;

// Extrai todas as rotas como string literal union
type ExtractRoutes<T> =
  T extends string   ? T :
  T extends object   ? ExtractRoutes<T[keyof T]> :
  never;

export type AppRoute = ExtractRoutes<typeof ROUTES>;