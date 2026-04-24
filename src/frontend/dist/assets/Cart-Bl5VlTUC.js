import { k as useCartStore, j as jsxRuntimeExports, l as ShoppingBag, L as Link, B as Button, S as Skeleton, a as Badge, i as Separator } from "./index-Aguxj3OV.js";
import { a as useProducts } from "./useProducts-BnvLj-6w.js";
import { m as motion } from "./proxy-khMqMKID.js";
import { A as AnimatePresence } from "./index-CU9C387m.js";
import { T as Trash2 } from "./trash-2-BTkQlLaK.js";
import { M as Minus } from "./minus-BrPSARLD.js";
import { P as Plus } from "./plus-FSWbLAdp.js";
import { T as Truck } from "./truck-Cst2N-N_.js";
import { P as Package } from "./package-BM0h9Iyr.js";
import "./backend-Ck3CrUfx.js";
const SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 12;
function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const { data: products = [], isLoading } = useProducts();
  const enrichedItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)
  }));
  const subtotal = totalPrice(products);
  const freeShipping = subtotal >= SHIPPING_THRESHOLD;
  const shippingCost = freeShipping ? 0 : subtotal > 0 ? FLAT_SHIPPING : 0;
  const grandTotal = subtotal + shippingCost;
  const shippingProgress = Math.min(subtotal / SHIPPING_THRESHOLD * 100, 100);
  if (!isLoading && items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "container mx-auto px-4 py-28 text-center flex flex-col items-center gap-8",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 text-primary/60" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 h-8 w-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display text-accent", children: "0" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground mb-3", children: "Your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm mx-auto leading-relaxed", children: "Discover our curated collection of luxury fragrances and find your signature scent." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated px-8",
              "data-ocid": "cart.explore_button",
              children: "Explore Collection"
            }
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/60 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground", children: "Shopping Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 font-body", children: items.length === 0 ? "Your cart is empty" : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}` })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", "data-ocid": "cart.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "lg:col-span-2 flex flex-col gap-4",
          "data-ocid": "cart.items_list",
          children: isLoading ? [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-lg" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: enrichedItems.map((item, i) => {
            if (!item.product) return null;
            const price = item.product.salePrice ?? item.product.price;
            const lineTotal = price * item.quantity;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                layout: true,
                initial: { opacity: 0, x: -16 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 16, height: 0, marginBottom: 0 },
                transition: { duration: 0.3 },
                className: "flex gap-5 bg-card border border-border/60 rounded-xl p-5 hover:border-border transition-smooth",
                "data-ocid": `cart.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/product/$id",
                      params: { id: item.productId },
                      className: "shrink-0",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-22 rounded-lg overflow-hidden bg-muted/40 border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: item.product.imageUrl,
                          alt: item.product.name,
                          className: "w-full h-full object-cover hover:scale-105 transition-smooth",
                          onError: (e) => {
                            e.target.src = "/assets/images/placeholder.svg";
                          }
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-w-0 gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/product/$id",
                            params: { id: item.productId },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-foreground hover:text-accent transition-smooth leading-tight truncate", children: item.product.name })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.product.brand })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "icon",
                          className: "h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                          onClick: () => removeItem(item.productId),
                          "aria-label": `Remove ${item.product.name}`,
                          "data-ocid": `cart.remove_item.${i + 1}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs px-2 py-0 border border-border/40",
                          children: item.product.volume
                        }
                      ),
                      item.product.salePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                        "$",
                        item.product.price.toFixed(2)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-muted/40 border border-border/60 rounded-lg p-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-7 w-7 hover:text-accent transition-smooth rounded-md",
                            onClick: () => updateQuantity(
                              item.productId,
                              item.quantity - 1
                            ),
                            "aria-label": "Decrease quantity",
                            "data-ocid": `cart.decrease_qty.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium text-foreground w-7 text-center tabular-nums", children: item.quantity }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-7 w-7 hover:text-accent transition-smooth rounded-md",
                            onClick: () => updateQuantity(
                              item.productId,
                              item.quantity + 1
                            ),
                            "aria-label": "Increase quantity",
                            "data-ocid": `cart.increase_qty.${i + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-foreground", children: [
                        "$",
                        lineTotal.toFixed(2)
                      ] })
                    ] })
                  ] })
                ]
              },
              item.productId
            );
          }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        subtotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border/60 rounded-xl p-5",
            "data-ocid": "cart.shipping_progress",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body text-foreground", children: freeShipping ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "You've unlocked free shipping! 🎉" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "Add",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
                    "$",
                    (SHIPPING_THRESHOLD - subtotal).toFixed(2)
                  ] }),
                  " ",
                  "more for free shipping"
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full bg-accent rounded-full",
                  initial: { width: 0 },
                  animate: { width: `${shippingProgress}%` },
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-4",
            "data-ocid": "cart.summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: "Order Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium tabular-nums", children: [
                    "$",
                    subtotal.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: freeShipping ? "text-accent font-medium" : "text-foreground tabular-nums",
                      children: subtotal === 0 ? "—" : freeShipping ? "Free" : `$${shippingCost.toFixed(2)}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3 w-3" }),
                    "Estimated delivery"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "5–7 business days" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl text-foreground", children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-foreground tabular-nums", children: [
                  "$",
                  grandTotal.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated mt-1 h-12 text-base",
                  "data-ocid": "cart.checkout_button",
                  children: "Proceed to Checkout"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  className: "w-full hover:text-accent transition-smooth",
                  "data-ocid": "cart.continue_shopping_button",
                  children: "Continue Shopping"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 pt-2 border-t border-border/40", children: [
                { icon: "🔒", label: "Secure Checkout" },
                { icon: "✦", label: "Luxury Packaging" },
                { icon: "↩", label: "Easy Returns" },
                { icon: "📦", label: "Tracked Delivery" }
              ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5 text-xs text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.label })
                  ]
                },
                b.label
              )) })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CartPage as default
};
