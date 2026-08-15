import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { CartDrawer } from "./CartDrawer";
import { BIKE_LIST } from "@/lib/bikes";

type NavLink = {
  label: string;
  to: string;
  search?: Record<string, string>;
  params?: Record<string, string>;
};

const bikeLinks: NavLink[] = BIKE_LIST.map((b) => ({
  label: b.name,
  to: "/bikes/$slug",
  params: { slug: b.slug },
}));

const links: NavLink[] = [
  { label: "Shop All", to: "/shop", search: {} },
  { label: "Grips", to: "/shop", search: { category: "grips" } },
  { label: "Accessories", to: "/shop", search: { category: "accessories" } },
  { label: "Contact", to: "/contact", search: {} },
];

const desktopLinks: NavLink[] = [...links.slice(0, 3), ...bikeLinks.slice(0, 3), links[3]!];
const mobileLinks: NavLink[] = [...links.slice(0, 3), ...bikeLinks, links[3]!];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    navigate({ to: "/shop", search: { q } });
  };

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
          {desktopLinks.map((l) => (
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
          <form
            onSubmit={submitSearch}
            className="hidden items-center gap-2 border-b border-border/70 pb-1 focus-within:border-foreground md:flex"
          >
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.4} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH"
              aria-label="Search products"
              className="w-28 bg-transparent text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground placeholder:text-muted-foreground focus:outline-none lg:w-40"
            />
          </form>
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
            <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2 border-b border-border pb-3">
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.4} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS"
                aria-label="Search products"
                className="w-full bg-transparent text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </form>
            {mobileLinks.map((l) => (
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
