// src/pages/EsqueciSenha/EsqueciSenhaForm.tsx
import { useState } from "react";
import { supabase } from "../../infra/superBaseClient";


export const EsqueciSenhaForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/nova-senha", // ajuste para sua rota
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Se este email estiver cadastrado, você receberá instruções para redefinir sua senha.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                     text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FE751B] disabled:opacity-50"
        />
      </div>

      {message && (
        <p className="text-sm text-red-600">{message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#FE751B] px-4 py-2 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar instruções"}
      </button>
    </form>
  );
};