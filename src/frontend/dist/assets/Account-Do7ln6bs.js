import { c as createLucideIcon, o as useAuth, j as jsxRuntimeExports, S as Skeleton, B as Button, X, i as Separator, U as User, r as reactExports, l as ShoppingBag, L as Link, m as ue } from "./index-Aguxj3OV.js";
import { u as useProfile, a as useSaveProfile, P as Pen, D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./useProfile-C2WarZjM.js";
import { I as Input } from "./input-Dq7phxHs.js";
import { L as Label } from "./label-Cu9VJbl5.js";
import { a as useMyOrders } from "./useOrders-Dy7c134H.js";
import { m as motion } from "./proxy-khMqMKID.js";
import { L as Lock } from "./lock-BriROdQG.js";
import { C as ChevronRight } from "./chevron-right-DxMmANGI.js";
import { P as Package } from "./package-BM0h9Iyr.js";
import { A as AnimatePresence } from "./index-CU9C387m.js";
import { C as CircleCheck } from "./circle-check-C9lpAcgp.js";
import { T as Truck } from "./truck-Cst2N-N_.js";
import "./backend-Ck3CrUfx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    oklchColor: "oklch(0.72 0.17 70)",
    icon: Clock
  },
  confirmed: {
    label: "Confirmed",
    oklchColor: "oklch(0.70 0.15 220)",
    icon: CircleCheck
  },
  processing: {
    label: "Processing",
    oklchColor: "oklch(0.70 0.15 220)",
    icon: Package
  },
  shipped: {
    label: "Shipped",
    oklchColor: "oklch(0.68 0.16 295)",
    icon: Truck
  },
  delivered: {
    label: "Delivered",
    oklchColor: "oklch(0.65 0.15 160)",
    icon: CircleCheck
  },
  cancelled: {
    label: "Cancelled",
    oklchColor: "oklch(0.52 0.18 15)",
    icon: CircleX
  }
};
const TIMELINE_STEPS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered"
];
function getStatusConfig(status) {
  return STATUS_CONFIG[status] ?? {
    label: String(status),
    oklchColor: "oklch(0.55 0.02 240)",
    icon: Package
  };
}
function StatusBadge({ status }) {
  const cfg = getStatusConfig(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded-full border capitalize",
      style: {
        color: cfg.oklchColor,
        backgroundColor: `color-mix(in oklch, ${cfg.oklchColor} 12%, transparent)`,
        borderColor: `color-mix(in oklch, ${cfg.oklchColor} 30%, transparent)`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.icon, { className: "h-3 w-3" }),
        cfg.label
      ]
    }
  );
}
function OrderTimeline({ status }) {
  if (status === "cancelled") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-sm font-body",
        style: { color: "oklch(0.52 0.18 15)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "This order was cancelled." })
        ]
      }
    );
  }
  const currentIdx = TIMELINE_STEPS.indexOf(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-start gap-0", children: TIMELINE_STEPS.map((step, idx) => {
    const cfg = getStatusConfig(step);
    const isCompleted = idx <= currentIdx;
    const isCurrent = idx === currentIdx;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1 flex-1 transition-all duration-500 ${idx === 0 ? "invisible" : isCompleted ? "bg-accent/60" : "bg-border/50"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? isCurrent ? "bg-accent border-accent text-accent-foreground shadow-[0_0_12px_2px_oklch(var(--accent)/0.4)]" : "bg-accent/30 border-accent/60 text-accent" : "bg-muted/40 border-border/50 text-muted-foreground/40"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.icon, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1 flex-1 transition-all duration-500 ${idx === TIMELINE_STEPS.length - 1 ? "invisible" : isCompleted && idx < currentIdx ? "bg-accent/60" : "bg-border/50"}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-[10px] mt-2 text-center leading-tight font-body ${isCompleted ? isCurrent ? "text-accent" : "text-muted-foreground" : "text-muted-foreground/40"}`,
          children: cfg.label
        }
      )
    ] }, step);
  }) });
}
function OrderDetailModal({
  order,
  open,
  onClose
}) {
  const date = new Date(Number(order.createdAt) / 1e6);
  const total = Number(order.totalAmount) / 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg bg-card border-border/60 text-foreground",
      "data-ocid": "account.order_detail.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl text-foreground flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.25em] text-accent uppercase font-body block mb-1", children: "Order Detail" }),
          "#",
          String(order.id).padStart(6, "0")
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderTimeline, { status: order.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.2em] text-muted-foreground uppercase font-body mb-3", children: "Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-3",
              "data-ocid": `account.order_detail.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-muted/60 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground truncate", children: item.productName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Qty ",
                      String(item.quantity)
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-display text-foreground shrink-0", children: [
                  "$",
                  (Number(item.priceAtPurchase) / 100).toFixed(2)
                ] })
              ]
            },
            `${String(item.productId)}-${i}`
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.2em] text-muted-foreground uppercase font-body mb-2", children: "Shipping Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-body text-muted-foreground space-y-0.5", children: order.status === "pending" || order.status === "confirmed" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "italic text-muted-foreground/60", children: "Address will be confirmed after payment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80", children: "Processed & dispatched from our warehouse." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-muted-foreground", children: "Order Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl text-foreground", children: [
            "$",
            total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full border-border/60 hover:border-accent/60 transition-smooth",
            onClick: onClose,
            "data-ocid": "account.order_detail.close_button",
            children: "Close"
          }
        ) })
      ]
    }
  ) });
}
function ProfileSection() {
  const { data: profile, isLoading } = useProfile();
  const { mutateAsync: saveProfile, isPending } = useSaveProfile();
  const { principal } = useAuth();
  const [editing, setEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setEmail(profile.email ?? "");
    }
  }, [profile]);
  const handleSave = async () => {
    try {
      await saveProfile({ name, email });
      setEditing(false);
      ue.success("Profile saved successfully");
    } catch {
      ue.error("Failed to save profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", "data-ocid": "account.profile_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "Profile" }),
      !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setEditing(true),
          className: "text-muted-foreground hover:text-accent transition-smooth gap-1.5",
          "data-ocid": "account.profile.edit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }),
            "Edit"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border/60 rounded-xl p-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
    ] }) : editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "profile-name",
            className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body",
            children: "Full Name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Your name",
            className: "bg-background border-border/60 focus:border-accent/60 transition-smooth",
            "data-ocid": "account.profile.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "profile-email",
            className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body",
            children: "Email Address"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "profile-email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "your@email.com",
            className: "bg-background border-border/60 focus:border-accent/60 transition-smooth",
            "data-ocid": "account.profile.email_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSave,
            disabled: isPending,
            className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-1.5",
            "data-ocid": "account.profile.save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
              isPending ? "Saving…" : "Save Changes"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: () => {
              setEditing(false);
              if (profile) {
                setName(profile.name);
                setEmail(profile.email);
              }
            },
            className: "text-muted-foreground hover:text-foreground transition-smooth",
            "data-ocid": "account.profile.cancel_button",
            children: "Cancel"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body", children: (profile == null ? void 0 : profile.name) || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 italic", children: "Not set" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1", children: "Email Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-body", children: (profile == null ? void 0 : profile.email) || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 italic", children: "Not set" }) })
      ] }),
      principal && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1", children: "Principal ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono break-all", children: principal })
        ] })
      ] })
    ] }) })
  ] });
}
function OrdersSection() {
  const { data: orders, isLoading } = useMyOrders();
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "account.orders_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground mb-5", children: "Order History" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col gap-4",
        "data-ocid": "account.orders_loading_state",
        children: ["o1", "o2", "o3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, k))
      }
    ) : orders && orders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "account.orders_list", children: orders.map((order, i) => {
      const date = new Date(Number(order.createdAt) / 1e6);
      const total = Number(order.totalAmount) / 100;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.06 },
          className: "group bg-card border border-border/60 rounded-xl p-5 hover:border-accent/30 transition-smooth cursor-pointer",
          onClick: () => setSelectedOrder(order),
          "data-ocid": `account.order.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-sm text-foreground", children: [
                  "Order #",
                  String(order.id).padStart(6, "0")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-x-3 gap-y-1", children: [
                order.items.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs text-muted-foreground/70 font-body",
                    children: [
                      item.productName,
                      " ×",
                      String(item.quantity)
                    ]
                  },
                  String(item.productId)
                )),
                order.items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/50 font-body", children: [
                  "+",
                  order.items.length - 3,
                  " more"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg text-foreground", children: [
                "$",
                total.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground/40 group-hover:text-accent transition-smooth" })
            ] })
          ] })
        },
        String(order.id)
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 bg-card border border-border/60 rounded-xl",
        "data-ocid": "account.orders_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-12 w-12 text-muted-foreground/30 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-6 max-w-xs mx-auto", children: "Discover our exclusive collection and place your first order." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth",
              "data-ocid": "account.shop_now_button",
              children: "Explore Collection"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedOrder && /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderDetailModal,
      {
        order: selectedOrder,
        open: true,
        onClose: () => setSelectedOrder(null)
      }
    ) })
  ] });
}
function LoginGate() {
  const { login } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[70vh] flex flex-col items-center justify-center px-4",
      "data-ocid": "account.auth_gate",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "text-center max-w-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted/60 border border-border/60 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8 text-muted-foreground/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.3em] text-accent uppercase font-body mb-2", children: "Account Access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground mb-3", children: "My Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-8 leading-relaxed", children: "Sign in with Internet Identity to manage your profile, view your order history, and track your deliveries." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated w-full gap-2",
                onClick: login,
                "data-ocid": "account.login_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                  "Sign In with Internet Identity"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 font-body mt-4", children: "Secure, passwordless authentication on the Internet Computer." })
          ]
        }
      )
    }
  );
}
function AccountPage() {
  const { isAuthenticated, logout, isInitializing } = useAuth();
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-xl" })
    ] });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginGate, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-12 max-w-2xl",
      "data-ocid": "account.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-start justify-between mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.3em] text-accent uppercase font-body", children: "My Account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground mt-1", children: "Welcome Back" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: logout,
                  className: "hover:text-destructive hover:border-destructive/60 transition-smooth gap-1.5 mt-1",
                  "data-ocid": "account.logout_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                    "Sign Out"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersSection, {})
      ]
    }
  );
}
export {
  AccountPage as default
};
