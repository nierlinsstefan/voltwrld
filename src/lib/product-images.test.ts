import { describe, expect, test } from "bun:test";
import { getVariantImage } from "./product-images";
import type { ShopifyProduct } from "./shopify";

const product: ShopifyProduct = {
  node: {
    id: "throttle", title: "Surron Twist Throttle", description: "", handle: "surron-twist-throttle",
    priceRange: { minVariantPrice: { amount: "29.99", currencyCode: "USD" } },
    images: { edges: [
      { node: { url: "first-photo.webp", altText: "Surron Twist Throttle" } },
      { node: { url: "second-photo.png", altText: "Carbon Surron Twist Throttle" } },
    ] },
    variants: { edges: [
      { node: { id: "standard", title: "Surron Twist Throttle", price: { amount: "29.99", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Style", value: "Surron Twist Throttle" }] } },
      { node: { id: "carbon", title: "Carbon Surron Twist Throttle", price: { amount: "32.99", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Style", value: "Carbon Surron Twist Throttle" }] } },
    ] },
    options: [{ name: "Style", values: ["Surron Twist Throttle", "Carbon Surron Twist Throttle"] }],
  },
};

describe("throttle option photos", () => {
  test("standard selects the first uploaded photo", () => {
    expect(getVariantImage(product, product.node.variants.edges[0]?.node)?.url).toBe("first-photo.webp");
  });
  test("carbon selects the second uploaded photo", () => {
    expect(getVariantImage(product, product.node.variants.edges[1]?.node)?.url).toBe("second-photo.png");
  });
});