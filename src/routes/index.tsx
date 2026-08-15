import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductGrid, useProducts } from "@/components/ProductGrid";
import { BIKE_LIST } from "@/lib/bikes";
import heroGrip from "@/assets/hero-grip.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VOLTWRLD — Premium Monochrome Grips & Components" },
      {
        name: "description",
        content:
          "VOLTWRLD designs precision grips, accessories and components in a strict black-and-white language. Built for riders.",
      },
      { property: "og:title", content: "VOLTWRLD — Premium Monochrome Grips & Components" },
      {
        property: "og:description",
        content: "Precision grips, accessories and components. Monochrome by design.",
      },
    ],
  }),
  component: Index,
});

function Marquee() {
  const words = ["SUR-RON READY", "TALARIA FIT", "ELECTRIC BUILT", "NO COMPROMISE"];
  return (
    <div className="overflow-hidden border-y border-border py-5">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {Array.from({ length: 2 }).flatMap((_, r) =>
          words.map((w) => (
            <span key={`${r}-${w}`} className="eyebrow text-foreground/60">
              {w} <span className="ml-12 text-foreground/25">/</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}

function Index() {
  const { data: products = [], isLoading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "var(--gradient-fade)" }} />

        <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 sm:px-10 sm:pb-24">
          <p className="eyebrow animate-fade-up">Electric Performance Parts</p>
          <h1 className="display-xl mt-5 w-full animate-fade-up text-[clamp(2.5rem,15vw,11rem)] leading-[0.85] break-words">
            VOLTWRLD
          </h1>
          <div className="mt-8 flex animate-fade-up flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Grips, controls and hardware for Sur-Ron, Talaria and light electric builds.
            </p>
            <Link
              to="/shop"
              search={{}}
              className="group inline-flex w-fit items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em] text-foreground transition-opacity duration-300 hover:opacity-70"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Featured */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="mt-3 text-4xl uppercase sm:text-6xl">Selected Pieces</h2>
          </div>
          <Link to="/shop" search={{}} className="link-underline hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground sm:block">
            View all
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid products={featured} isLoading={isLoading} />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-10 sm:pb-28">
        <p className="eyebrow">Categories</p>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
          {[
            { label: "Grips", slug: "grips", copy: "Tuned compounds, precise knurl." },
            { label: "Accessories", slug: "accessories", copy: "Bar ends, clamps, hardware." },
            { label: "All Products", slug: "all", copy: "The complete VOLTWRLD range." },
          ].map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={c.slug === "all" ? {} : { category: c.slug }}
              className="group relative flex min-h-[220px] flex-col justify-between bg-surface p-8 transition-colors duration-500 hover:bg-surface-elevated"
            >
              <span className="eyebrow">{c.copy}</span>
              <span className="flex items-end justify-between">
                <span className="font-display text-3xl uppercase tracking-[-0.03em] sm:text-4xl">{c.label}</span>
                <ArrowRight className="h-5 w-5 -translate-x-1 opacity-40 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* E-bike parts by model */}
      <section className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-10 sm:pb-28">
        <p className="eyebrow">Parts by bike</p>
        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
          {BIKE_LIST.map((b) => (
            <Link
              key={b.slug}
              to="/bikes/$slug"
              params={{ slug: b.slug }}
              className="group flex items-center gap-3 font-display text-3xl uppercase tracking-[-0.03em] transition-opacity duration-300 hover:opacity-70 sm:text-5xl"
            >
              {b.name}
              <ArrowRight className="h-5 w-5 -translate-x-1 opacity-40 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section id="instagram" className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Social</p>
            <h2 className="mt-3 text-4xl uppercase sm:text-6xl">@voltwrld</h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="link-underline text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
          >
            Follow on Instagram
          </a>
        </div>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Build photos, fitment guides and drops from the Sur-Ron and Talaria community.
        </p>
      </section>
    </>
  );
}
