import type { ShopifyProduct } from "./shopify";

type ProductVariant = ShopifyProduct["node"]["variants"]["edges"][number]["node"];

export function getVariantImage(product: ShopifyProduct, variant?: ProductVariant) {
  const images = product.node.images.edges.map(({ node }) => node);
  if (variant?.image) return variant.image;
  const labels = [variant?.title, ...(variant?.selectedOptions.map(({ value }) => value) ?? [])]
    .filter((label): label is string => Boolean(label))
    .map((label) => label.trim().toLowerCase());
  return images.find((image) => image.altText && labels.includes(image.altText.trim().toLowerCase())) ?? images[0];
}