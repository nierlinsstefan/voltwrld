import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid, matchesCategory, useProducts } from "@/components/ProductGrid";

type ShopSearch = { category?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — VOLTWRLD" },
      {
        name: "description",
        content: "Browse the full VOLTWRLD range of grips, accessories and components in monochrome.",
      },
      { property: "og:title", content: "Shop All — VOLTWRLD" },
      { property: "og:description", content: "The complete VOLTWRLD range of grips and accessories." },
    ],
  }),
  component: ShopPage,
});

const filters = [
  { label: "All", slug: undefined },
  { label: "Grips", slug: "grips" },
  { label: "Accessories", slug: "accessories" },
  { label: "Apparel", slug: "apparel" },
];

function ShopPage() {
  const { category } = Route.useSearch();
  const { data: products = [], isLoading } = useProducts();
  const filtered = products.filter((p) => matchesCategory(p, category));

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 sm:px-10 sm:pt-44">
      <p className="eyebrow">Collection</p>
      <h1 className="display-xl mt-4 text-5xl sm:text-8xl">
        {category ? category : "Shop All"}
      </h1>

      <div className="mt-10 flex flex-wrap gap-3 border-b border-border pb-6">
        {filters.map((f) => {
          const active = (f.slug ?? undefined) === (category ?? undefined);
          return (
            <Link
              key={f.label}
              to="/shop"
              search={f.slug ? { category: f.slug } : {}}
              className={`border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                active
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
        <span className="ml-auto self-center text-xs text-muted-foreground tabular-nums">
          {isLoading ? "" : `${filtered.length} item${filtered.length === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="mt-12">
        <ProductGrid products={filtered} isLoading={isLoading} />
      </div>
    </div>
  );
}
