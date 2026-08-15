import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product, index = 0 }: { product: ShopifyProduct; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const variant = node.variants.edges.find((v) => v.node.availableForSale)?.node ?? node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const hoverImage = node.images.edges[1]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
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

  return (
    <Link
      to="/product/$handle"
      params={{ handle: node.handle }}
      className="group block animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        )}
        {hoverImage && (
          <img
            src={hoverImage.url}
            alt={hoverImage.altText ?? node.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !variant?.availableForSale}
            className="flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-opacity duration-300 hover:opacity-85 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : variant?.availableForSale ? "Add to Bag" : "Sold Out"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-sm uppercase tracking-[-0.01em]">{node.title}</h3>
          {node.productType && <p className="mt-1 text-xs text-muted-foreground">{node.productType}</p>}
        </div>
        <p className="text-sm tabular-nums text-foreground/90">
          {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
