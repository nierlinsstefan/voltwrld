import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductGrid, useProducts } from "@/components/ProductGrid";
import { BIKES, getBike } from "@/lib/bikes";

export const Route = createFileRoute("/bikes/$slug")({
  loader: ({ params }) => {
    const bike = getBike(params.slug);
    if (!bike) throw notFound();
    return { bike };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — VOLTWRLD" }, { name: "robots", content: "noindex" }] };
    }
    const { bike } = loaderData;
    const title = `${bike.name} Parts — VOLTWRLD`;
    const description = `${bike.blurb}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BikePage,
});

function BikePage() {
  const { bike } = Route.useLoaderData();
  const { data: products = [], isLoading } = useProducts();
  const q = bike.query.toLowerCase();
  const filtered = products.filter((p) =>
    [p.node.title, p.node.description, p.node.productType ?? "", ...(p.node.tags ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 sm:px-10 sm:pt-44">
      <p className="eyebrow">E-bike parts</p>
      <h1 className="display-xl mt-4 text-5xl sm:text-8xl">{bike.name}</h1>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{bike.blurb}</p>

      <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
        {bike.specs.map((s) => (
          <div key={s.k}>
            <p className="font-display text-xl uppercase">{s.k}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-6">
        {BIKES.map((b) => (
          <Link
            key={b.slug}
            to="/bikes/$slug"
            params={{ slug: b.slug }}
            className={`text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-70 ${
              b.slug === bike.slug ? "text-foreground underline underline-offset-8" : "text-muted-foreground"
            }`}
          >
            {b.name}
          </Link>
        ))}
        <Link
          to="/shop"
          search={{}}
          className="ml-auto text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-opacity duration-300 hover:opacity-70"
        >
          Shop all
        </Link>
      </div>

      <div className="mt-12">
        <ProductGrid products={filtered} isLoading={isLoading} />
      </div>
    </div>
  );
}