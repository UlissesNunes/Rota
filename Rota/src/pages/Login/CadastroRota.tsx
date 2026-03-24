// src/pages/Cadastro.tsx
import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";


export function CadastroRota() {
  const { register, state } = useAuth();
  const { loading } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    
    <div className="flex min-h-screen items-center justify-center">
      
      <form

        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-[#FE751B]/40 bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-black/40 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Cadastro</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-[#FE751B]"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-[#FE751B]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#FE751B] px-4 py-2 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}