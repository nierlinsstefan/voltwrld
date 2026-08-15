import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-baseline gap-[0.1em] ${className}`} aria-label="VOLTWRLD home">
      <span className="font-display text-xl font-extrabold uppercase leading-none tracking-[-0.04em] sm:text-2xl">
        VOLT
      </span>
      <span className="font-display text-xl font-extrabold uppercase leading-none tracking-[-0.04em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground sm:text-2xl">
        WRLD
      </span>
    </Link>
  );
}
