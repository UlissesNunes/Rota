type NavRotaProps = {
  /**
   * "horizontal" (default) para uso no header.
   * "vertical" para uso no menu lateral.
   */
  variant?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

export function NavRota({ variant = "horizontal", onNavigate }: NavRotaProps) {
  const listClass =
    variant === "vertical" ? "flex flex-col gap-3" : "flex items-center gap-6";

  const linkClass =
    variant === "vertical"
      ? "rounded-md px-3 py-2 text-sm sm:text-base font-medium text-[#FE751B] hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/30"
      : "text-sm font-medium text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300";

  return (
    <nav>
      <ul className={listClass}>
        <li>
          <a
            href="/"
            className={linkClass}
            onClick={() => onNavigate?.()}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className={linkClass}
            onClick={() => onNavigate?.()}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className={linkClass}
            onClick={() => onNavigate?.()}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}