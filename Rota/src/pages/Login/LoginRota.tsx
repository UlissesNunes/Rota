import { Template } from "../../templates/template";

export function LoginRota() {
  return (
    <Template>
      <div className="w-full max-w-xl px-4 py-0 text-center sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white">
          Login
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base lg:text-lg dark:text-white/70">
          Acesse sua conta para continuar.
        </p>
      </div>
    </Template>
  );
}