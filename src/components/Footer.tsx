import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="display-xl text-4xl sm:text-5xl">VOLTWRLD</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Precision components for riders who care about the details. Designed in monochrome, built to be used.
            </p>
          </div>

          <div>
            <p className="eyebrow">Shop</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/shop" search={{}} className="link-underline w-fit hover:text-foreground">All Products</Link>
              <Link to="/shop" search={{ category: "grips" }} className="link-underline w-fit hover:text-foreground">Grips</Link>
              <Link to="/shop" search={{ category: "accessories" }} className="link-underline w-fit hover:text-foreground">Accessories</Link>
            </div>
          </div>

          <div>
            <p className="eyebrow">Info</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/contact" className="link-underline w-fit hover:text-foreground">Contact</Link>
              <a href="#instagram" className="link-underline w-fit hover:text-foreground">Instagram</a>
            </div>
          </div>

          <div>
            <p className="eyebrow">Follow</p>
            <div className="mt-5 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="border border-border p-3 transition-colors duration-300 hover:bg-accent">
                <Instagram className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="border border-border p-3 transition-colors duration-300 hover:bg-accent">
                <Youtube className="h-4 w-4" strokeWidth={1.4} />
              </a>
              <a href="mailto:hello@voltwrld.com" aria-label="Email" className="border border-border p-3 transition-colors duration-300 hover:bg-accent">
                <Mail className="h-4 w-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} VOLTWRLD. All rights reserved.</p>
          <p>Monochrome by design.</p>
        </div>
      </div>
    </footer>
  );
}
