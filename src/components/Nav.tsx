import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { BIKE_LIST } from "@/lib/bikes";

type NavLink = {
  label: string;
  to: string;
  search?: Record<string, string>;
  params?: Record<string, string>;
};

const links: NavLink[] = [
  { label: "Shop All", to: "/shop", search: {} },
  { label: "Grips", to: "/shop", search: { category: "grips" } },
  { label: "Accessories", to: "/shop", search: { category: "accessories" } },
  ...BIKE_LIST.map((b) => ({ label: b.name, to: "/bikes/$slug", params: { slug: b.slug } })),
  { label: "Contact", to: "/contact", search: {} },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:h-20 sm:px-10">
        <Logo />

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to as never}
              search={(l.search ?? {}) as never}
              params={(l.params ?? {}) as never}
              className="link-underline text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70 transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <CartDrawer />
          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.4} /> : <Menu className="h-5 w-5" strokeWidth={1.4} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to as never}
                search={(l.search ?? {}) as never}
                params={(l.params ?? {}) as never}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-2xl uppercase tracking-[-0.03em] last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
