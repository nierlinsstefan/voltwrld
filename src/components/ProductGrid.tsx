import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { EmptyProducts } from "./EmptyProducts";

export function useProducts() {
  return useQuery({ queryKey: ["shopify-products"], queryFn: () => fetchProducts(), staleTime: 60_000 });
}

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[4/5] animate-pulse bg-surface-elevated" />
          <div className="mt-4 h-3 w-2/3 animate-pulse bg-surface-elevated" />
        </div>
      ))}
    </div>
  );
}

export function ProductGrid({
  products,
  isLoading,
}: {
  products: ShopifyProduct[];
  isLoading?: boolean;
}) {
  if (isLoading) return <ProductSkeleton />;
  if (!products.length) return <EmptyProducts />;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.node.id} product={p} index={i} />
      ))}
    </div>
  );
}

export function matchesCategory(product: ShopifyProduct, category?: string) {
  if (!category || category === "all") return true;
  const haystack = [
    product.node.productType ?? "",
    ...(product.node.tags ?? []),
    product.node.title,
  ]
    .join(" ")
    .toLowerCase();
  if (category === "grips") return haystack.includes("grip");
  if (category === "accessories") return haystack.includes("accessor") || haystack.includes("bar") || haystack.includes("plug");
  if (category === "apparel") return haystack.includes("tee") || haystack.includes("apparel") || haystack.includes("hood");
  return haystack.includes(category.toLowerCase());
}
