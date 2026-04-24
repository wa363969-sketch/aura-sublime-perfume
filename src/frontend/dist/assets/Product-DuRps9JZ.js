import { c as createLucideIcon, n as useParams, k as useCartStore, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, a as Badge, l as ShoppingBag, i as Separator, m as ue, S as Skeleton, o as useAuth } from "./index-Aguxj3OV.js";
import { C as Card, a as CardContent } from "./card-BUBy5o8T.js";
import { L as Label } from "./label-Cu9VJbl5.js";
import { u as useReviews, a as useAddReview, T as Textarea } from "./useReviews-CKsQDAOm.js";
import { b as useProduct, a as useProducts } from "./useProducts-BnvLj-6w.js";
import { C as ChevronRight } from "./chevron-right-DxMmANGI.js";
import { m as motion } from "./proxy-khMqMKID.js";
import { M as Minus } from "./minus-BrPSARLD.js";
import { P as Plus } from "./plus-FSWbLAdp.js";
import { S as Star } from "./star-B3Zy9F4d.js";
import { L as Lock } from "./lock-BriROdQG.js";
import "./backend-Ck3CrUfx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
];
const Wind = createLucideIcon("wind", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function avg(ratings) {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}
const CATEGORY_LABELS = {
  floral: "Floral",
  woody: "Woody",
  oriental: "Oriental",
  fresh: "Fresh",
  citrus: "Citrus",
  aquatic: "Aquatic"
};
function StarDisplay({ rating, size = 16 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "flex items-center gap-0.5",
      "aria-label": `${rating.toFixed(1)} out of 5 stars`,
      children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size,
          className: i <= Math.round(rating) ? "fill-accent text-accent" : "text-muted-foreground/30"
        },
        i
      ))
    }
  );
}
function StarPicker({
  value,
  onChange
}) {
  const [hover, setHover] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "aria-label": "Select rating", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": `${i} star`,
      "data-ocid": `review.star.${i}`,
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(0),
      onClick: () => onChange(i),
      className: "transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size: 24,
          className: i <= (hover || value) ? "fill-accent text-accent" : "text-muted-foreground/30"
        }
      )
    },
    i
  )) });
}
function NotesTier({ icon, label, notes }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-display", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "text-xs border-accent/30 text-foreground bg-accent/5 px-3 py-1",
        children: n
      },
      n
    )) })
  ] });
}
function ReviewCard({ review }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 py-5 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { rating: review.rating, size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground leading-tight", children: review.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        review.author,
        " · ",
        formatDate(review.createdAt)
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: review.body })
  ] });
}
function RelatedCard({ product }) {
  const displayPrice = product.salePrice ?? product.price;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/product/$id",
      params: { id: product.id },
      "data-ocid": "related.product.link",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group bg-card border-border overflow-hidden hover:border-accent/50 transition-smooth cursor-pointer h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] overflow-hidden bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.name,
            className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
            onError: (e) => {
              e.currentTarget.src = "/assets/images/placeholder.svg";
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base text-foreground leading-tight", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: product.volume }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent font-semibold text-sm mt-1", children: [
            "$",
            displayPrice
          ] })
        ] })
      ] })
    }
  );
}
function ReviewForm({ productId }) {
  const { isAuthenticated, login } = useAuth();
  const addReview = useAddReview();
  const [rating, setRating] = reactExports.useState(0);
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "review.login_prompt",
        className: "flex flex-col items-center gap-4 py-8 px-6 border border-dashed border-border rounded-lg bg-muted/20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 28, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in with Internet Identity to share your experience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: login,
              "data-ocid": "review.login_button",
              className: "border-accent/40 text-accent hover:bg-accent/10",
              children: "Sign In to Review"
            }
          )
        ]
      }
    );
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "review.success_state",
        className: "flex flex-col items-center gap-3 py-8 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 32, className: "text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground", children: "Review submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Thank you for sharing your experience." })
        ]
      }
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      ue.error("Please select a star rating.");
      return;
    }
    if (!title.trim()) {
      ue.error("Please enter a review title.");
      return;
    }
    if (!body.trim()) {
      ue.error("Please write your review.");
      return;
    }
    const input = {
      productId,
      rating,
      title: title.trim(),
      body: body.trim()
    };
    try {
      await addReview.mutateAsync(input);
      setSubmitted(true);
      ue.success("Your review has been published.");
    } catch {
      ue.error("Failed to submit review. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-5",
      "data-ocid": "review.form",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Your Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarPicker, { value: rating, onChange: setRating })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "review-title",
              className: "text-xs uppercase tracking-widest text-muted-foreground",
              children: "Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "review-title",
              type: "text",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Summarise your experience",
              maxLength: 80,
              "data-ocid": "review.title_input",
              className: "w-full bg-muted/30 border border-input rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "review-body",
              className: "text-xs uppercase tracking-widest text-muted-foreground",
              children: "Your Review"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "review-body",
              value: body,
              onChange: (e) => setBody(e.target.value),
              placeholder: "Tell us about the fragrance, longevity, sillage…",
              rows: 4,
              maxLength: 800,
              "data-ocid": "review.body_input",
              className: "bg-muted/30 border-input resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: addReview.isPending,
            "data-ocid": "review.submit_button",
            className: "self-start",
            children: addReview.isPending ? "Submitting…" : "Submit Review"
          }
        )
      ]
    }
  );
}
function splitNotes(notes) {
  if (notes.length <= 1)
    return { top: notes, heart: [], base: [] };
  if (notes.length === 2)
    return { top: [notes[0]], heart: [], base: [notes[1]] };
  if (notes.length === 3)
    return { top: [notes[0]], heart: [notes[1]], base: [notes[2]] };
  const third = Math.floor(notes.length / 3);
  return {
    top: notes.slice(0, third),
    heart: notes.slice(third, third * 2),
    base: notes.slice(third * 2)
  };
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[3/4] w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-48" })
    ] })
  ] });
}
function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews = [] } = useReviews(id);
  const { data: allProducts = [] } = useProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = reactExports.useState(1);
  const averageRating = avg(reviews.map((r) => r.rating));
  const relatedProducts = allProducts.filter((p) => p.id !== id && p.category === (product == null ? void 0 : product.category)).slice(0, 3);
  function handleAddToCart() {
    if (!product) return;
    addItem(product, qty);
    ue.success(`${product.name} added to cart`, {
      description: `${qty} × ${product.volume}`
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6",
        "data-ocid": "product.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-foreground", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The fragrance you're looking for may have moved." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", children: "Browse Catalog" }) })
        ]
      }
    );
  }
  const { top, heart, base } = splitNotes(product.notes);
  const displayPrice = product.salePrice ?? product.price;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 max-w-6xl pb-24",
      "data-ocid": "product.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: "flex items-center gap-1.5 py-6 text-xs text-muted-foreground",
            "aria-label": "Breadcrumb",
            "data-ocid": "product.breadcrumb",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/",
                  className: "hover:text-accent transition-colors",
                  "data-ocid": "breadcrumb.home_link",
                  children: "Home"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/catalog",
                  className: "hover:text-accent transition-colors",
                  "data-ocid": "breadcrumb.catalog_link",
                  children: "Catalog"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: product.name })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -24 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              className: "relative",
              "data-ocid": "product.image_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-muted/40 to-muted/10 border border-border shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.name,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      e.currentTarget.src = "/assets/images/placeholder.svg";
                    }
                  }
                ) }),
                !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "destructive",
                    className: "text-xs px-3 py-1 uppercase tracking-wider",
                    children: "Sold Out"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] },
              className: "flex flex-col gap-6 pt-2",
              "data-ocid": "product.details_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "border-accent/50 text-accent bg-accent/10 text-xs uppercase tracking-widest px-3 py-1",
                      "data-ocid": "product.category_badge",
                      children: CATEGORY_LABELS[product.category] ?? product.category
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: product.brand })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display text-4xl lg:text-5xl text-foreground leading-tight",
                    "data-ocid": "product.name",
                    children: product.name
                  }
                ),
                reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3",
                    "data-ocid": "product.rating_summary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { rating: averageRating, size: 18 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                        averageRating.toFixed(1),
                        " · ",
                        reviews.length,
                        " review",
                        reviews.length !== 1 ? "s" : ""
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", "data-ocid": "product.price", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl text-accent", children: [
                    "$",
                    displayPrice
                  ] }),
                  product.salePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through", children: [
                    "$",
                    product.price
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: product.volume })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base text-foreground/80 leading-relaxed border-l-2 border-accent/30 pl-4 italic",
                    "data-ocid": "product.description",
                    children: product.description
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2",
                    "data-ocid": "product.stock_status",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `inline-block w-2 h-2 rounded-full ${product.inStock ? "" : "bg-destructive"}`,
                          style: product.inStock ? { backgroundColor: "oklch(0.6 0.15 150)" } : void 0
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-sm ${product.inStock ? "text-foreground/70" : "text-destructive"}`,
                          children: product.inStock ? "In Stock — Ships within 2 business days" : "Currently out of stock"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-4 pt-2",
                    "data-ocid": "product.purchase_controls",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden bg-muted/20", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Decrease quantity",
                            disabled: qty <= 1,
                            onClick: () => setQty((q) => Math.max(1, q - 1)),
                            "data-ocid": "product.quantity_decrease",
                            className: "px-3 py-2 text-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "px-4 py-2 text-sm font-semibold text-foreground min-w-[3rem] text-center select-none",
                            "data-ocid": "product.quantity_value",
                            "aria-live": "polite",
                            children: qty
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Increase quantity",
                            onClick: () => setQty((q) => q + 1),
                            "data-ocid": "product.quantity_increase",
                            className: "px-3 py-2 text-foreground hover:bg-muted/40 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          disabled: !product.inStock,
                          onClick: handleAddToCart,
                          "data-ocid": "product.add_to_cart_button",
                          className: "flex-1 gap-2 text-sm uppercase tracking-wider",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16 }),
                            product.inStock ? "Add to Cart" : "Out of Stock"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col gap-5",
                    "data-ocid": "product.fragrance_notes",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs uppercase tracking-widest text-muted-foreground font-display", children: "Fragrance Composition" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 bg-card/50 rounded-xl border border-border/60 p-5", children: [
                        top.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          NotesTier,
                          {
                            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 14 }),
                            label: "Top Notes",
                            notes: top
                          }
                        ),
                        heart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            NotesTier,
                            {
                              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 14 }),
                              label: "Heart Notes",
                              notes: heart
                            }
                          )
                        ] }),
                        base.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/40" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            NotesTier,
                            {
                              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 14 }),
                              label: "Base Notes",
                              notes: base
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "mt-20",
            "data-ocid": "product.reviews_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60 mb-12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "Customer Reviews" }),
                    reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2",
                        "data-ocid": "product.reviews_avg",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StarDisplay, { rating: averageRating, size: 16 }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-semibold", children: averageRating.toFixed(1) })
                        ]
                      }
                    )
                  ] }),
                  reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-lg",
                      "data-ocid": "product.reviews_empty_state",
                      children: "No reviews yet — be the first to share your experience."
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "product.reviews_list", children: reviews.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 16 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 0.4, delay: i * 0.08 },
                      "data-ocid": `product.review.item.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review })
                    },
                    review.id
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col gap-5",
                    "data-ocid": "product.review_form_panel",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "Share Your Experience" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewForm, { productId: id })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "mt-20",
            "data-ocid": "product.related_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/60 mb-12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground mb-8", children: "You May Also Adore" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.1 },
                  "data-ocid": `product.related.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedCard, { product: p })
                },
                p.id
              )) })
            ]
          }
        )
      ]
    }
  );
}
export {
  ProductPage as default
};
