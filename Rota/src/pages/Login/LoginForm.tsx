// src/pages/Login/LoginForm.tsx

import { useAuthentic } from "../../application/useAuthentic";
import { useAuthForm } from "../../hooks/useAuthForm";
import { validateAuth } from "../../utils/validationAuthForm";

export const LoginForm = () => {
  const { login } = useAuthentic();

  const {
    formData,
    errors,
    loading,
    operationError,
    handleChange,
    handleSubmit,
  } = useAuthForm({
    onSubmit: (data) => login(data.email, data.password),
    validate: validateAuth,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const result = await handleSubmit();

    if (result.success) {
      // ⚠️ Não logar dados sensíveis em produção
      console.info("Login realizado com sucesso");
    } else if (result.error) {
      console.error("Erro de login:", result.error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Campo Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-800"
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
          className="mt-1 block w-full rounded-md border px-3 py-2  text-gray-950 focus:ring-2 focus:ring-[#FE751B] disabled:opacity-50"
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
    autoComplete="current-password"
    value={formData.password}
    onChange={handleChange("password")}
    disabled={loading}
    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
               text-gray-950 dark:text-gray-900 focus:ring-2 focus:ring-[#FE751B] disabled:opacity-50"
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
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
};