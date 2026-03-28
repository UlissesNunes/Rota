// src/pages/Cadastro/CadastroForm.tsx

import { useNavigate } from "react-router-dom";
import { useAuthentic } from "../../application/useAuthentic";
import { useAuthForm } from "../../hooks/useAuthForm";
import { validateAuth } from "../../utils/validationAuthForm";

export const CadastroForm= () => {
  const { register } = useAuthentic();
  const navigate = useNavigate();

  const {
    formData,
    errors,
    loading,
    operationError,
    handleChange,
    handleSubmit,
  } = useAuthForm({
    onSubmit: (data) => register(data.email, data.password),
    validate: validateAuth,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result = await handleSubmit();

    if (result.success) {
      // ✅ Redireciona para /home após cadastro bem-sucedido
      navigate("/home");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Campo Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange("email")}
          disabled={loading}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                     text-gray-900 dark:text-gray-600 focus:ring-2 focus:ring-[#FE751B] disabled:opacity-50"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Campo Senha */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange("password")}
          disabled={loading}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                     text-gray-900 dark:text-gray-700 focus:ring-2 focus:ring-[#FE751B] disabled:opacity-50"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      {/* Erro de operação */}
      {operationError && (
        <div
          role="alert"
          className="rounded-md bg-red-50 p-2 text-sm text-red-700"
        >
          {operationError.message}
        </div>
      )}

      {/* Botão de submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#FE751B] px-4 py-2 text-white font-semibold disabled:opacity-50"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};