// src/hooks/useTheme.ts
// Hook compartilhado de tema — qualquer componente que importar este hook
// lê e altera o mesmo valor do localStorage e da classe do <html>
// NÃO precisa de banco de dados — localStorage persiste entre sessões no browser

export type Tema = "dark" | "light";

function lerTema(): Tema {
  if (typeof window === "undefined") return "dark";
  const salvo = window.localStorage.getItem("rota-theme");
  if (salvo === "dark" || salvo === "light") return salvo;
  // Fallback: respeita preferência do sistema operacional
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function aplicarTema(tema: Tema): void {
  document.documentElement.classList.toggle("dark", tema === "dark");
  window.localStorage.setItem("rota-theme", tema);
}

// Exporta funções puras — sem estado React
// Use dentro de useState(() => lerTema()) para inicialização
export const themeUtils = { lerTema, aplicarTema };