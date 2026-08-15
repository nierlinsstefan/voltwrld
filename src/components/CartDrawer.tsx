import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Loader2, ArrowUpRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative inline-flex h-9 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors duration-300 hover:text-foreground"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
          <span className="hidden sm:inline">Cart</span>
          <span className="tabular-nums">({totalItems})</span>
        </button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col border-border bg-surface sm:max-w-md">
        <SheetHeader className="flex-shrink-0 border-b border-border pb-5">
          <SheetTitle className="font-display text-2xl uppercase tracking-[-0.03em]">Your Bag</SheetTitle>
          <SheetDescription className="eyebrow">
            {totalItems === 0 ? "Empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col pt-6">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-muted-foreground" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Your bag is empty.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 border-b border-border pb-6">
                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-surface-elevated">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-sm uppercase tracking-[-0.01em]">{item.product.node.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.selectedOptions.map((o) => o.value).join(" / ")}
                      </p>
                      <p className="mt-2 text-sm tabular-nums">
                        {formatPrice(item.price.amount, item.price.currencyCode)}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs tabular-nums">{item.quantity}</span>
                          <button
                            className="p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() => removeItem(item.variantId)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 space-y-4 border-t border-border bg-surface pt-5">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-display text-xl tabular-nums">{formatPrice(totalPrice, currency)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="flex w-full items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-[0.24em] text-foreground underline underline-offset-8 transition-opacity duration-300 hover:opacity-70 disabled:opacity-50"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Checkout <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
