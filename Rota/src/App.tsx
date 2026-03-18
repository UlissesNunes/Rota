
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl px-10 py-8 shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Tailwind funcionando!
        </h1>
        <p className="text-slate-300 text-center mb-6">
          Se você está vendo este cartão escuro centralizado, com texto branco e borda,
          o Tailwind CSS está aplicado corretamente no projeto.
        </p>
        <div className="flex gap-3 justify-center">
          <button className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-400 transition-colors">
            Botão primário
          </button>
          <button className="px-4 py-2 rounded-lg border border-slate-500 text-slate-200 hover:bg-slate-700 transition-colors">
            Botão secundário
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
