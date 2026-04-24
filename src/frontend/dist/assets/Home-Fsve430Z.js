import { r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, S as Skeleton, a as Badge } from "./index-Aguxj3OV.js";
import { C as Card, a as CardContent } from "./card-BUBy5o8T.js";
import { I as Input } from "./input-Dq7phxHs.js";
import { u as useFeaturedProducts } from "./useProducts-BnvLj-6w.js";
import { m as motion } from "./proxy-khMqMKID.js";
import "./backend-Ck3CrUfx.js";
const CATEGORY_LABELS = {
  floral: "Floral",
  woody: "Woody",
  oriental: "Oriental",
  fresh: "Fresh",
  citrus: "Citrus",
  aquatic: "Aquatic"
};
function GoldDivider() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 my-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-accent/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-16 bg-accent/40" })
  ] });
}
function FeaturedProductCard({
  product,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      },
      "data-ocid": `featured_product.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group overflow-hidden border-border bg-card hover:border-accent/50 transition-smooth", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-body tracking-widest uppercase", children: "Sold Out" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-accent/90 text-accent-foreground text-xs tracking-widest uppercase font-body", children: CATEGORY_LABELS[product.category] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground tracking-[0.2em] uppercase font-body mb-1", children: product.volume }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-foreground leading-tight group-hover:text-accent transition-colors duration-200", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-body line-clamp-2", children: product.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: product.notes.slice(0, 3).map((note) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5 font-body",
              children: note
            },
            note
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-foreground", children: [
              "$",
              product.price
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/product/$id",
                params: { id: product.id },
                "data-ocid": `featured_product.link.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    disabled: !product.inStock,
                    className: "border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground transition-smooth font-body tracking-widest text-xs uppercase",
                    children: "Discover"
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] w-full rounded-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" })
      ] })
    ] })
  ] });
}
function Home() {
  const { data: featured, isLoading } = useFeaturedProducts();
  const [email, setEmail] = reactExports.useState("");
  const [subscribed, setSubscribed] = reactExports.useState(false);
  const featuredRef = reactExports.useRef(null);
  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero.section",
        className: "relative min-h-screen flex items-center justify-center overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-aura-sublime.dim_1920x1080.jpg",
                alt: "Aura Sublime Perfume hero",
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/72" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/95" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-6 max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, letterSpacing: "0.5em" },
                animate: { opacity: 1, letterSpacing: "0.35em" },
                transition: { duration: 1.2, ease: "easeOut" },
                className: "text-accent text-xs font-body tracking-[0.35em] uppercase mb-6",
                children: "Maison de Parfum"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                className: "font-display text-foreground leading-none mb-1",
                style: { fontSize: "clamp(3rem, 7vw, 6rem)" },
                children: "AURA"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.h1,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                className: "font-display text-accent leading-none mb-6",
                style: { fontSize: "clamp(3rem, 7vw, 6rem)" },
                children: "SUBLIME"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 1, delay: 0.6 },
                className: "font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 tracking-wide",
                children: [
                  "Where rare ingredients meet timeless artistry.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
                  "Wear the extraordinary."
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.8 },
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", "data-ocid": "hero.primary_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-[0.2em] text-sm uppercase px-10 py-6 transition-smooth",
                      children: "Explore Collection"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "lg",
                      onClick: () => {
                        var _a;
                        return (_a = featuredRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                      },
                      "data-ocid": "hero.secondary_button",
                      className: "border-accent/50 text-accent hover:bg-accent/10 font-body tracking-[0.2em] text-sm uppercase px-10 py-6 transition-smooth",
                      children: "Our Signatures"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.5 },
              className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50 text-xs tracking-[0.3em] uppercase font-body", children: "Scroll" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { y: [0, 8, 0] },
                    transition: {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    },
                    className: "w-px h-10 bg-gradient-to-b from-accent/60 to-transparent"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        ref: featuredRef,
        "data-ocid": "featured.section",
        className: "bg-background py-24 px-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.7 },
              className: "text-center mb-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent text-xs tracking-[0.35em] uppercase font-body mb-3", children: "Signature Fragrances" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-foreground text-4xl md:text-5xl mb-4", children: "Featured Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GoldDivider, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-md mx-auto mt-4 leading-relaxed", children: "Each creation is a symphony of rare ingredients, individually composed by our master perfumers." })
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
              "data-ocid": "featured.list",
              children: (featured ?? []).slice(0, 3).map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                FeaturedProductCard,
                {
                  product,
                  index: i
                },
                product.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6, delay: 0.4 },
              className: "text-center mt-12",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", "data-ocid": "featured.view_all_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "border-border text-foreground hover:border-accent hover:text-accent font-body tracking-[0.2em] text-xs uppercase px-10 transition-smooth",
                  children: "View Full Collection"
                }
              ) })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "brand_story.section",
        className: "bg-muted/30 py-28 px-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -40 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent text-xs tracking-[0.35em] uppercase font-body mb-4", children: "Our Philosophy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-foreground text-3xl md:text-4xl leading-tight mb-6", children: "The Art of Olfactory Luxury" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GoldDivider, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-5 font-body text-muted-foreground leading-relaxed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aura Sublime was born from a singular obsession: to capture the ineffable. Each fragrance is a meditation on memory, emotion, and the invisible threads that connect us to the world's most breathtaking landscapes." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We source only the finest raw materials — Cambodian oud aged for decades, Bulgarian rose harvested at dawn, Persian saffron hand-selected at altitude. Shortcuts are not in our vocabulary." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Every bottle is a limited act of creation. Our master perfumers compose with patience, allowing each accord to breathe and evolve over months before a single drop reaches you." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex gap-10", children: [
                  { value: "20+", label: "Years of Craft" },
                  { value: "60+", label: "Rare Ingredients" },
                  { value: "12", label: "Master Accords" }
                ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-accent", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground tracking-widest uppercase font-body mt-1", children: label })
                ] }, label)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 40 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: {
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1]
              },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-sm border border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/midnight-oud.dim_800x1000.jpg",
                      alt: "Midnight Oud — craftsmanship",
                      className: "w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-6 right-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-foreground text-xl mb-1", children: "Midnight Oud" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs font-body tracking-[0.2em] uppercase", children: "Signature Collection" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 -right-3 w-full h-full border border-accent/20 rounded-sm pointer-events-none" })
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "pillars.section", className: "bg-background py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.7 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent text-xs tracking-[0.35em] uppercase font-body mb-3", children: "The Aura Promise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-foreground text-4xl md:text-5xl", children: "Crafted Without Compromise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GoldDivider, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        {
          icon: "✦",
          title: "Rare Ingredients",
          body: "Every element is ethically sourced from the world's most celebrated growing regions. We accept nothing less than perfection."
        },
        {
          icon: "◈",
          title: "Master Perfumers",
          body: "Our creators trained for decades under the finest noses of Grasse and the Levant. Their work is art, not formula."
        },
        {
          icon: "◇",
          title: "Timeless Bottles",
          body: "Each flacon is hand-crafted crystal, designed to be as enduring as the scent it holds. A collector's object from the first."
        }
      ].map(({ icon, title, body }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: i * 0.12 },
          className: "text-center p-8 border border-border bg-card rounded-sm hover:border-accent/40 transition-smooth",
          "data-ocid": `pillars.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-accent text-3xl mb-5", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-foreground text-xl mb-3", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm leading-relaxed", children: body })
          ]
        },
        title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "newsletter.section",
        className: "bg-card py-24 px-6 border-t border-border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.7 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent text-xs tracking-[0.35em] uppercase font-body mb-4", children: "Private Circle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-foreground text-3xl md:text-4xl mb-4", children: "Enter the Inner Sanctum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GoldDivider, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mt-4 mb-10 leading-relaxed max-w-md mx-auto", children: "Be the first to discover new creations, exclusive launches, and invitations to private events." }),
              subscribed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  className: "flex flex-col items-center gap-2",
                  "data-ocid": "newsletter.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border border-accent/60 flex items-center justify-center text-accent text-lg mb-2", children: "✦" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-foreground text-xl", children: "Welcome to the Circle" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm", children: "Your invitation has been received. Expect the extraordinary." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubscribe,
                  className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
                  "data-ocid": "newsletter.form",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "email",
                        placeholder: "Your email address",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        required: true,
                        "data-ocid": "newsletter.input",
                        className: "flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground font-body text-sm tracking-wide focus-visible:ring-accent/50"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        "data-ocid": "newsletter.submit_button",
                        className: "bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-[0.2em] text-xs uppercase px-8 transition-smooth shrink-0",
                        children: "Subscribe"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/50 text-xs font-body mt-5 tracking-wide", children: "We respect your privacy. Unsubscribe at any time." })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  Home as default
};
