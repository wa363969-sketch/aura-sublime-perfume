import { c as createLucideIcon, o as useAuth, k as useCartStore, p as useNavigate, r as reactExports, j as jsxRuntimeExports, l as ShoppingBag, L as Link, B as Button, a as Badge, i as Separator, m as ue } from "./index-Aguxj3OV.js";
import { I as Input } from "./input-Dq7phxHs.js";
import { L as Label } from "./label-Cu9VJbl5.js";
import { u as useCreateOrder } from "./useOrders-Dy7c134H.js";
import { a as useProducts } from "./useProducts-BnvLj-6w.js";
import { m as motion } from "./proxy-khMqMKID.js";
import { L as Lock } from "./lock-BriROdQG.js";
import { C as ChevronRight } from "./chevron-right-DxMmANGI.js";
import { T as Truck } from "./truck-Cst2N-N_.js";
import { P as Package } from "./package-BM0h9Iyr.js";
import "./backend-Ck3CrUfx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const INITIAL_FORM = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States"
};
const FIELD_LABELS = {
  fullName: "Full Name",
  addressLine1: "Address Line 1",
  addressLine2: "Address Line 2 (Optional)",
  city: "City",
  state: "State / Province",
  postalCode: "ZIP / Postal Code",
  country: "Country"
};
const REQUIRED_FIELDS = [
  "fullName",
  "addressLine1",
  "city",
  "state",
  "postalCode",
  "country"
];
function CheckoutPage() {
  const { isAuthenticated, login } = useAuth();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const { data: products = [] } = useProducts();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [stripeAvailable] = reactExports.useState(false);
  const subtotal = totalPrice(products);
  const shipping = subtotal >= 150 ? 0 : subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;
  const enrichedItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)
  }));
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "container mx-auto px-4 py-28 text-center flex flex-col items-center gap-8",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 text-primary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground mb-3", children: "Your cart is empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body", children: "Add some items before checking out." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth px-8",
              "data-ocid": "checkout.explore_button",
              children: "Explore Collection"
            }
          ) })
        ]
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "container mx-auto px-4 py-28 text-center flex flex-col items-center gap-8",
        "data-ocid": "checkout.auth_gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-12 w-12 text-primary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground mb-3", children: "Sign in to continue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm mx-auto leading-relaxed", children: "Please sign in with Internet Identity to securely complete your purchase." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated px-10",
              onClick: login,
              "data-ocid": "checkout.login_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 mr-2" }),
                "Sign In with Internet Identity"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              className: "hover:text-accent transition-smooth",
              "data-ocid": "checkout.back_to_cart_button",
              children: "Back to Cart"
            }
          ) })
        ]
      }
    );
  }
  function validate() {
    var _a;
    const newErrors = {};
    for (const f of REQUIRED_FIELDS) {
      if (!((_a = form[f]) == null ? void 0 : _a.trim())) {
        newErrors[f] = `${FIELD_LABELS[f].replace(" (Optional)", "")} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: void 0 }));
  }
  async function handlePlaceOrder() {
    if (!validate()) {
      ue.error("Please fill in all required fields");
      return;
    }
    try {
      await createOrder.mutateAsync();
      clearCart();
      navigate({ to: "/order-confirmation" });
    } catch {
      ue.error("Failed to place order. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/60 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/cart",
            className: "hover:text-accent transition-smooth",
            "data-ocid": "checkout.breadcrumb_cart",
            children: "Cart"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Checkout" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground", children: "Checkout" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", "data-ocid": "checkout.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-card border border-border/60 rounded-xl p-7",
            "data-ocid": "checkout.shipping_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: "Shipping Address" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "fullName",
                      className: "text-sm text-foreground font-body",
                      children: [
                        FIELD_LABELS.fullName,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "fullName",
                      placeholder: "Alexandra Beaumont",
                      value: form.fullName,
                      onChange: (e) => handleChange("fullName", e.target.value),
                      className: `bg-background border-input focus:border-accent transition-smooth ${errors.fullName ? "border-destructive" : ""}`,
                      "data-ocid": "checkout.full_name_input"
                    }
                  ),
                  errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.full_name_error",
                      children: errors.fullName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "addressLine1",
                      className: "text-sm text-foreground font-body",
                      children: [
                        FIELD_LABELS.addressLine1,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "addressLine1",
                      placeholder: "123 Maison de Luxe Avenue",
                      value: form.addressLine1,
                      onChange: (e) => handleChange("addressLine1", e.target.value),
                      className: `bg-background border-input focus:border-accent transition-smooth ${errors.addressLine1 ? "border-destructive" : ""}`,
                      "data-ocid": "checkout.address_line1_input"
                    }
                  ),
                  errors.addressLine1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.address_line1_error",
                      children: errors.addressLine1
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "addressLine2",
                      className: "text-sm text-foreground font-body",
                      children: FIELD_LABELS.addressLine2
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "addressLine2",
                      placeholder: "Apt 4B, Suite 100",
                      value: form.addressLine2,
                      onChange: (e) => handleChange("addressLine2", e.target.value),
                      className: "bg-background border-input focus:border-accent transition-smooth",
                      "data-ocid": "checkout.address_line2_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "city",
                      className: "text-sm text-foreground font-body",
                      children: [
                        FIELD_LABELS.city,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "city",
                      placeholder: "New York",
                      value: form.city,
                      onChange: (e) => handleChange("city", e.target.value),
                      className: `bg-background border-input focus:border-accent transition-smooth ${errors.city ? "border-destructive" : ""}`,
                      "data-ocid": "checkout.city_input"
                    }
                  ),
                  errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.city_error",
                      children: errors.city
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "state",
                      className: "text-sm text-foreground font-body",
                      children: [
                        FIELD_LABELS.state,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "state",
                      placeholder: "NY",
                      value: form.state,
                      onChange: (e) => handleChange("state", e.target.value),
                      className: `bg-background border-input focus:border-accent transition-smooth ${errors.state ? "border-destructive" : ""}`,
                      "data-ocid": "checkout.state_input"
                    }
                  ),
                  errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.state_error",
                      children: errors.state
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "postalCode",
                      className: "text-sm text-foreground font-body",
                      children: [
                        FIELD_LABELS.postalCode,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "postalCode",
                      placeholder: "10001",
                      value: form.postalCode,
                      onChange: (e) => handleChange("postalCode", e.target.value),
                      className: `bg-background border-input focus:border-accent transition-smooth ${errors.postalCode ? "border-destructive" : ""}`,
                      "data-ocid": "checkout.postal_code_input"
                    }
                  ),
                  errors.postalCode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.postal_code_error",
                      children: errors.postalCode
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "country",
                      className: "text-sm text-foreground font-body",
                      children: [
                        FIELD_LABELS.country,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "country",
                      placeholder: "United States",
                      value: form.country,
                      onChange: (e) => handleChange("country", e.target.value),
                      className: `bg-background border-input focus:border-accent transition-smooth ${errors.country ? "border-destructive" : ""}`,
                      "data-ocid": "checkout.country_input"
                    }
                  ),
                  errors.country && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs text-destructive",
                      "data-ocid": "checkout.country_error",
                      children: errors.country
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "bg-card border border-border/60 rounded-xl p-7",
            "data-ocid": "checkout.payment_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: "Payment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-muted-foreground ml-auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Encrypted & Secure" })
              ] }),
              stripeAvailable ? (
                /* Stripe active */
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated h-14 text-base",
                    onClick: handlePlaceOrder,
                    disabled: createOrder.isPending,
                    "data-ocid": "checkout.stripe_pay_button",
                    children: createOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin",
                          "data-ocid": "checkout.loading_state"
                        }
                      ),
                      "Processing…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }),
                      "Pay with Stripe — $",
                      total.toFixed(2)
                    ] })
                  }
                )
              ) : (
                /* Stripe not configured — placeholder form */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-5",
                    "data-ocid": "checkout.placeholder_payment",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border/60 p-4 flex items-start gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-accent shrink-0 mt-0.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Demo payment mode" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: 'Stripe payment integration is not yet configured. Click "Place Order" below to simulate a successful order.' })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground font-body", children: "Card Number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            placeholder: "4242 4242 4242 4242",
                            disabled: true,
                            className: "bg-background border-input opacity-50",
                            "data-ocid": "checkout.card_number_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground font-body", children: "Expiry" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              placeholder: "MM / YY",
                              disabled: true,
                              className: "bg-background border-input opacity-50",
                              "data-ocid": "checkout.card_expiry_input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground font-body", children: "CVC" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              placeholder: "•••",
                              disabled: true,
                              className: "bg-background border-input opacity-50",
                              "data-ocid": "checkout.card_cvc_input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "lg",
                          className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated h-14 text-base mt-2",
                          onClick: handlePlaceOrder,
                          disabled: createOrder.isPending,
                          "data-ocid": "checkout.pay_now_button",
                          children: createOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin",
                                "data-ocid": "checkout.loading_state"
                              }
                            ),
                            "Placing Order…"
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
                            "Place Order — $",
                            total.toFixed(2)
                          ] })
                        }
                      )
                    ]
                  }
                )
              ),
              createOrder.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-destructive mt-3 text-center",
                  "data-ocid": "checkout.error_state",
                  children: "Order failed. Please try again."
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.aside,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.15 },
          className: "lg:col-span-2 space-y-4",
          "data-ocid": "checkout.order_summary",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/60 rounded-xl p-6 sticky top-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: "Order Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "ml-auto text-xs border border-border/40",
                  children: [
                    items.reduce((s, i) => s + i.quantity, 0),
                    " items"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", "data-ocid": "checkout.items_list", children: enrichedItems.map((item, i) => {
              if (!item.product) return null;
              const price = item.product.salePrice ?? item.product.price;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-3 items-center",
                  "data-ocid": `checkout.summary_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-11 rounded-md overflow-hidden bg-muted/40 border border-border/40 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.imageUrl,
                        alt: item.product.name,
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        item.product.volume,
                        " × ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground font-medium tabular-nums shrink-0", children: [
                      "$",
                      (price * item.quantity).toFixed(2)
                    ] })
                  ]
                },
                item.productId
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground tabular-nums", children: [
                  "$",
                  subtotal.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: shipping === 0 && subtotal > 0 ? "text-accent font-medium" : "text-foreground tabular-nums",
                    children: subtotal === 0 ? "—" : shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60 my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-foreground tabular-nums", children: [
                "$",
                total.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-muted/30 rounded-lg border border-border/40 flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                "Estimated delivery in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "5–7 business days" }),
                ". Luxury gift packaging included."
              ] })
            ] })
          ] })
        }
      )
    ] }) })
  ] });
}
export {
  CheckoutPage as default
};
