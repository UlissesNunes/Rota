import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Aplica o tema antes do primeiro render.
// Tema padrão: dark (preto). Usuário pode alternar e a escolha é persistida no navegador.
const storedTheme = window.localStorage.getItem('rota-theme')
const initialTheme = storedTheme === 'light' ? 'light' : 'dark'
document.documentElement.classList.toggle('dark', initialTheme === 'dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
