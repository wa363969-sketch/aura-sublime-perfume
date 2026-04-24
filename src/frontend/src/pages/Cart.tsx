import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "@tanstack/react-router";
import { Minus, Package, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 12;

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const { data: products = [], isLoading } = useProducts();

  const enrichedItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }));

  const subtotal = totalPrice(products);
  const freeShipping = subtotal >= SHIPPING_THRESHOLD;
  const shippingCost = freeShipping ? 0 : subtotal > 0 ? FLAT_SHIPPING : 0;
  const grandTotal = subtotal + shippingCost;
  const shippingProgress = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!isLoading && items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-28 text-center flex flex-col items-center gap-8"
        data-ocid="cart.empty_state"
      >
        <div className="relative">
          <div className="h-28 w-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <ShoppingBag className="h-12 w-12 text-primary/60" />
          </div>
          <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
            <span className="text-xs font-display text-accent">0</span>
          </div>
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground mb-3">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground font-body max-w-sm mx-auto leading-relaxed">
            Discover our curated collection of luxury fragrances and find your
            signature scent.
          </p>
        </div>
        <Link to="/catalog">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated px-8"
            data-ocid="cart.explore_button"
          >
            Explore Collection
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header band */}
      <div className="bg-card border-b border-border/60 py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl text-foreground">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-1 font-body">
            {items.length === 0
              ? "Your cart is empty"
              : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12" data-ocid="cart.page">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Cart items ─────────────────────────────────────────────────── */}
          <div
            className="lg:col-span-2 flex flex-col gap-4"
            data-ocid="cart.items_list"
          >
            {isLoading ? (
              [1, 2, 3].map((k) => (
                <Skeleton key={k} className="h-32 w-full rounded-lg" />
              ))
            ) : (
              <AnimatePresence initial={false}>
                {enrichedItems.map((item, i) => {
                  if (!item.product) return null;
                  const price = item.product.salePrice ?? item.product.price;
                  const lineTotal = price * item.quantity;
                  return (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 bg-card border border-border/60 rounded-xl p-5 hover:border-border transition-smooth"
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      {/* Image */}
                      <Link
                        to="/product/$id"
                        params={{ id: item.productId }}
                        className="shrink-0"
                      >
                        <div className="h-28 w-22 rounded-lg overflow-hidden bg-muted/40 border border-border/40">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-smooth"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/assets/images/placeholder.svg";
                            }}
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex flex-col flex-1 min-w-0 gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              to="/product/$id"
                              params={{ id: item.productId }}
                            >
                              <h3 className="font-display text-lg text-foreground hover:text-accent transition-smooth leading-tight truncate">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.product.brand}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                            onClick={() => removeItem(item.productId)}
                            aria-label={`Remove ${item.product.name}`}
                            data-ocid={`cart.remove_item.${i + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0 border border-border/40"
                          >
                            {item.product.volume}
                          </Badge>
                          {item.product.salePrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${item.product.price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-2">
                          {/* Quantity stepper */}
                          <div className="flex items-center gap-1 bg-muted/40 border border-border/60 rounded-lg p-0.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:text-accent transition-smooth rounded-md"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                )
                              }
                              aria-label="Decrease quantity"
                              data-ocid={`cart.decrease_qty.${i + 1}`}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="text-sm font-body font-medium text-foreground w-7 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:text-accent transition-smooth rounded-md"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                              aria-label="Increase quantity"
                              data-ocid={`cart.increase_qty.${i + 1}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                          {/* Line price */}
                          <span className="font-display text-xl text-foreground">
                            ${lineTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          {/* ── Order summary ──────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Free shipping progress */}
            {subtotal > 0 && (
              <div
                className="bg-card border border-border/60 rounded-xl p-5"
                data-ocid="cart.shipping_progress"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-accent" />
                  <span className="text-sm font-body text-foreground">
                    {freeShipping ? (
                      <span className="text-accent font-medium">
                        You've unlocked free shipping! 🎉
                      </span>
                    ) : (
                      <>
                        Add{" "}
                        <span className="text-accent font-medium">
                          ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                        </span>{" "}
                        more for free shipping
                      </>
                    )}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Summary card */}
            <div
              className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4"
              data-ocid="cart.summary"
            >
              <h2 className="font-display text-xl text-foreground">
                Order Summary
              </h2>
              <Separator className="bg-border/60" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span
                    className={
                      freeShipping
                        ? "text-accent font-medium"
                        : "text-foreground tabular-nums"
                    }
                  >
                    {subtotal === 0
                      ? "—"
                      : freeShipping
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Package className="h-3 w-3" />
                    Estimated delivery
                  </span>
                  <span>5–7 business days</span>
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="flex justify-between">
                <span className="font-display text-xl text-foreground">
                  Grand Total
                </span>
                <span className="font-display text-2xl text-foreground tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>

              <Link to="/checkout">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated mt-1 h-12 text-base"
                  data-ocid="cart.checkout_button"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/catalog">
                <Button
                  variant="ghost"
                  className="w-full hover:text-accent transition-smooth"
                  data-ocid="cart.continue_shopping_button"
                >
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40">
                {[
                  { icon: "🔒", label: "Secure Checkout" },
                  { icon: "✦", label: "Luxury Packaging" },
                  { icon: "↩", label: "Easy Returns" },
                  { icon: "📦", label: "Tracked Delivery" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <span>{b.icon}</span>
                    <span>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
