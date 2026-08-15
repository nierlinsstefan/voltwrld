export function EmptyProducts() {
  return (
    <div className="border border-dashed border-border px-6 py-24 text-center">
      <p className="font-display text-2xl uppercase tracking-[-0.03em]">No products found</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        This store doesn't have any products yet. Tell the chat what you want to sell and the price, and it will be
        created in your Shopify store.
      </p>
    </div>
  );
}
