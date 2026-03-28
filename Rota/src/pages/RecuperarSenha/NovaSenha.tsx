// src/pages/NovaSenha/NovaSenhaForm.tsx
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/authService";

export const NovaSenhaForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Senha redefinida com sucesso!");
      // ✅ Redireciona para login
      setTimeout(() => navigate("/"), 1500);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="new-password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Nova Senha
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "Redefinindo..." : "Redefinir Senha"}
      </button>
    </form>
  );
};