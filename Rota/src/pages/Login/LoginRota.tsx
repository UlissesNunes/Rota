import { Template } from "../../templates/template";
import { LoginForm } from "./LoginForm";


export function LoginRota() {
  return (
    <Template>
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border border-[#FE751B]/40 bg-white/70 p-8 shadow-lg backdrop-blur dark:bg-black/40">
          <h1 className="text-3xl font-semibold text-black dark:text-white text-center">
            Login
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70 text-center">
            Acesse sua conta para continuar.
          </p>

          <LoginForm />
        </div>
      </div>
    </Template>
  );
}