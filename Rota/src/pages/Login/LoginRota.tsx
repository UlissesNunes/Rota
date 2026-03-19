import { Template } from "../../templates/template";

export function LoginRota() {
  return (
    <Template>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Login
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base lg:text-lg">
          Acesse sua conta para continuar.
        </p>
      </div>
    </Template>
  );
}