import { InputField } from "./InputField";
import { useLoginForm } from "./useLoginForm";



export function LoginForm() {
  const { formData, errors, handleChange, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <InputField
        id="email"
        label="Email ou Usuário"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
      />

      <InputField
        id="password"
        label="Senha"
        type="password"
        value={formData.password}
        onChange={handleChange("password")}
        error={errors.password}
        
      />

      <button
        type="submit"
        className="w-full rounded-md bg-[#FE751B] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#e56715] focus:outline-none focus:ring-2 focus:ring-[#FE751B]/50 transition-colors"
      >
        Entrar
      </button>

      <div className="mt-4 flex flex-col items-center gap-2 text-sm">
        <a href="/cadastro" className="text-[#FE751B] hover:underline">
          Não tenho conta
        </a>
        <a
          href="/recuperar-senha"
          className="text-slate-600 hover:underline dark:text-white/70"
        >
          Esqueci minha senha
        </a>
      </div>
    </form>
  );
}