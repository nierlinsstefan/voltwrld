import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => {
    const name = params.handle.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name} — VOLTWRLD` },
        { name: "description", content: `${name} by VOLTWRLD. Premium monochrome components built for riders.` },
        { property: "og:title", content: `${name} — VOLTWRLD` },
        { property: "og:description", content: `${name} by VOLTWRLD. Premium monochrome components.` },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchProducts(),
    staleTime: 60_000,
  });

  const product = products.find((p) => p.node.handle === handle);
  const related = products.filter((p) => p.node.handle !== handle).slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-40 sm:px-10">
        <h1 className="display-xl text-4xl sm:text-6xl">Product unavailable</h1>
        <Link to="/shop" search={{}} className="link-underline mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-24 sm:pt-32">
      <Detail product={product} />
      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1600px] px-5 sm:px-10">
          <p className="eyebrow">More from VOLTWRLD</p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.node.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Detail({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const variants = node.variants.edges.map((e) => e.node);
  const [variantId, setVariantId] = useState(
    (variants.find((v) => v.availableForSale) ?? variants[0])?.id ?? "",
  );
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const variant = useMemo(() => variants.find((v) => v.id === variantId) ?? variants[0], [variants, variantId]);
  const images = node.images.edges;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${node.title} added to bag`, { position: "top-center" });
  };

  const handleBuyNow = async () => {
    await handleAdd();
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-10 lg:grid-cols-2 lg:gap-20">
      <div>
        <div className="aspect-[4/5] overflow-hidden bg-surface-elevated">
          {images[activeImage]?.node && (
            <img
              src={images[activeImage].node.url}
              alt={images[activeImage].node.altText ?? node.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {images.map((img, i) => (
              <button
                key={img.node.url}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-16 overflow-hidden border transition-colors duration-300 ${
                  i === activeImage ? "border-foreground" : "border-border hover:border-foreground/50"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img.node.url} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:sticky lg:top-32 lg:self-start">
        <Link
          to="/shop"
          search={{}}
          className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Shop
        </Link>

        <h1 className="mt-6 text-4xl uppercase sm:text-6xl">{node.title}</h1>
        <p className="mt-4 font-display text-2xl tabular-nums">
          {formatPrice(variant?.price.amount ?? node.priceRange.minVariantPrice.amount, variant?.price.currencyCode ?? node.priceRange.minVariantPrice.currencyCode)}
        </p>

        {node.description && (
          <p className="mt-8 max-w-lg whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {node.description}
          </p>
        )}

        {variants.length > 1 && (
          <div className="mt-10">
            <p className="eyebrow">
              {node.options?.[0]?.name ?? "Variant"}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  disabled={!v.availableForSale}
                  className={`border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 disabled:opacity-35 ${
                    v.id === variantId
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleAdd}
            disabled={isLoading || !variant?.availableForSale}
            className="flex flex-1 items-center justify-center gap-2 bg-primary px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-opacity duration-300 hover:opacity-85 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : variant?.availableForSale ? "Add to Bag" : "Sold Out"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isLoading || !variant?.availableForSale}
            className="flex flex-1 items-center justify-center gap-2 border border-border px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300 hover:bg-accent disabled:opacity-50"
          >
            Buy now <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 text-xs text-muted-foreground">
          <div>
            <dt className="eyebrow">Shipping</dt>
            <dd className="mt-2">Dispatched within 48 hours.</dd>
          </div>
          <div>
            <dt className="eyebrow">Returns</dt>
            <dd className="mt-2">30 days, unused and boxed.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
