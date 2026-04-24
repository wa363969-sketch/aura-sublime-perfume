import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, q as Sparkles, L as Link, B as Button } from "./index-Aguxj3OV.js";
import { m as motion } from "./proxy-khMqMKID.js";
import { C as CircleCheck } from "./circle-check-C9lpAcgp.js";
import { P as Package } from "./package-BM0h9Iyr.js";
import { T as Truck } from "./truck-Cst2N-N_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
function generateOrderNumber() {
  const base = Math.floor(Date.now() / 1e3);
  const suffix = (base % 1e6).toString().padStart(6, "0");
  return `AS-${suffix}`;
}
const ESTIMATED_DELIVERY = (() => {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
})();
const STEPS = [
  {
    icon: CircleCheck,
    label: "Order Received",
    description: "We have your order",
    done: true
  },
  {
    icon: Package,
    label: "Being Prepared",
    description: "Luxury gift packaging",
    done: false
  },
  {
    icon: Truck,
    label: "On Its Way",
    description: "Tracked delivery",
    done: false
  },
  {
    icon: Gift,
    label: "Delivered",
    description: `By ${ESTIMATED_DELIVERY}`,
    done: false
  }
];
function OrderConfirmationPage() {
  const [orderNumber] = reactExports.useState(generateOrderNumber);
  const [showConfetti, setShowConfetti] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 400);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "order_confirmation.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/60 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body uppercase tracking-widest mb-2", children: "Aura Sublime" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground", children: "Order Confirmed" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              },
              className: "flex flex-col items-center text-center mb-12",
              "data-ocid": "order_confirmation.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-28 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-14 w-14 text-accent" }) }),
                  showConfetti && [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute h-2 w-2 rounded-full bg-accent/60",
                      initial: { x: 0, y: 0, opacity: 1, scale: 1 },
                      animate: {
                        x: Math.cos(i / 6 * Math.PI * 2) * 60,
                        y: Math.sin(i / 6 * Math.PI * 2) * 60,
                        opacity: 0,
                        scale: 0
                      },
                      transition: { duration: 0.8, delay: i * 0.05 },
                      style: {
                        top: "50%",
                        left: "50%",
                        marginTop: -4,
                        marginLeft: -4
                      }
                    },
                    `confetti-${i}`
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground mb-3", children: "Thank you for your order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-sm leading-relaxed", children: "Your fragrance is being carefully prepared with our signature luxury packaging and will be on its way soon." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.3 },
              className: "bg-card border border-border/60 rounded-xl p-7 mb-6",
              "data-ocid": "order_confirmation.order_details",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1.5", children: "Order Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display text-2xl text-accent",
                      "data-ocid": "order_confirmation.order_number",
                      children: orderNumber
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1.5", children: "Estimated Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-sm text-foreground font-medium leading-snug",
                      "data-ocid": "order_confirmation.estimated_delivery",
                      children: ESTIMATED_DELIVERY
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1.5", children: "Order Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1.5", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs text-accent font-medium", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-accent animate-pulse" }),
                    "Processing"
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.45 },
              className: "bg-card border border-border/60 rounded-xl p-7 mb-6",
              "data-ocid": "order_confirmation.progress_tracker",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-foreground mb-6", children: "Your Order Journey" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-5 right-5 h-px bg-border/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-5 left-5 h-px bg-accent/60",
                      style: { width: "8%" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 relative", children: STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.4, delay: 0.5 + i * 0.1 },
                        className: "flex flex-col items-center text-center gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0 ${step.done ? "bg-accent/15 border-accent text-accent" : "bg-card border-border/60 text-muted-foreground"}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: `text-xs font-medium leading-tight ${step.done ? "text-foreground" : "text-muted-foreground"}`,
                                children: step.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5 leading-tight hidden sm:block", children: step.description })
                          ] })
                        ]
                      },
                      step.label
                    );
                  }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.6 },
              className: "bg-muted/30 border border-border/40 rounded-xl p-6 mb-8",
              "data-ocid": "order_confirmation.expectations",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base text-foreground", children: "What to expect" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
                  "A confirmation will appear in your account orders section.",
                  "Each bottle is hand-wrapped in our signature dark velvet packaging.",
                  "Your order will be dispatched within 2–3 business days.",
                  "Tracked shipping with real-time updates via your account."
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-0.5 shrink-0", children: "✦" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
                    ]
                  },
                  item
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.75 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "lg",
                    className: "hover:text-accent hover:border-accent transition-smooth min-w-44",
                    "data-ocid": "order_confirmation.view_orders_button",
                    children: "View My Orders"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated min-w-44",
                    "data-ocid": "order_confirmation.continue_shopping_button",
                    children: "Continue Shopping"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.6, delay: 1 },
              className: "text-center text-xs text-muted-foreground mt-12",
              children: "Thank you for choosing Aura Sublime — where every drop tells a story."
            }
          )
        ] })
      ]
    }
  );
}
export {
  OrderConfirmationPage as default
};
