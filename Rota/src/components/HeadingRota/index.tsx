import { Logo } from "../LogoRota";
import { NavRota } from "../NavRota";

export function HeadingRota() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-2">
        {/* Logo */}
        <Logo />

        {/* Navegação compacta */}
        <NavRota />
      </div>
    </header>
  );
}