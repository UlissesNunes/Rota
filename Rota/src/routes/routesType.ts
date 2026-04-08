// src/routes/route.types.ts
// Todas as rotas do sistema tipadas — nunca use strings hardcoded fora daqui

export const ROUTES = {
  // Dashboard
  home: "/",

  // Empresa
  empresa: {
    dados: "/empresa/dados",
  },

  // Painel
  painel: {
    novaViagem:  "/viagens/nova",
    frota:       "/painel/frota",
    relatorios:  "/painel/relatorios",
  },

  // Equipe
  equipe: {
    motoristas:   "/equipe/motoristas",
    funcionarios: "/equipe/funcionarios",
  },

  // Produtos
  produtos: {
    servicos:   "/produtos/servicos",
    categorias: "/produtos/categorias",
  },

  // Sistema
  sistema: {
    configuracoes: "/sistema/configuracoes",
    notificacoes:  "/sistema/notificacoes",
    tema:          "/sistema/tema",
  },

  // Financeiro
  financeiro: {
    plano:      "/financeiro/plano",
    pagamentos: "/financeiro/pagamentos",
  },
} as const;

// Tipo que extrai todas as rotas possíveis como string literal
type ExtractRoutes<T> = T extends string
  ? T
  : T extends object
  ? ExtractRoutes<T[keyof T]>
  : never;

export type AppRoute = ExtractRoutes<typeof ROUTES>;