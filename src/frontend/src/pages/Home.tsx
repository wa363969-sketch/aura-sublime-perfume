import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProducts } from "@/hooks/useProducts";
import type { Product, ProductCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useRef, useState } from "react";

// ─── Category label map ────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<ProductCategory, string> = {
  floral: "Floral",
  woody: "Woody",
  oriental: "Oriental",
  fresh: "Fresh",
  citrus: "Citrus",
  aquatic: "Aquatic",
};

// ─── Gold Divider ──────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px w-16 bg-accent/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
      <div className="h-px w-16 bg-accent/40" />
    </div>
  );
}

// ─── Featured Product Card ─────────────────────────────────────────────────
function FeaturedProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`featured_product.item.${index + 1}`}
    >
      <Card className="group overflow-hidden border-border bg-card hover:border-accent/50 transition-smooth">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="text-muted-foreground text-sm font-body tracking-widest uppercase">
                Sold Out
              </span>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-accent/90 text-accent-foreground text-xs tracking-widest uppercase font-body">
            {CATEGORY_LABELS[product.category]}
          </Badge>
        </div>
        <CardContent className="p-5 flex flex-col gap-3">
          <div>
            <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-body mb-1">
              {product.volume}
            </p>
            <h3 className="font-display text-xl text-foreground leading-tight group-hover:text-accent transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 font-body line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {product.notes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5 font-body"
              >
                {note}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-display text-2xl text-foreground">
              ${product.price}
            </span>
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              data-ocid={`featured_product.link.${index + 1}`}
            >
              <Button
                variant="outline"
                size="sm"
                disabled={!product.inStock}
                className="border-accent/60 text-accent hover:bg-accent hover:text-accent-foreground transition-smooth font-body tracking-widest text-xs uppercase"
              >
                Discover
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Product Skeleton ──────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <CardContent className="p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const { data: featured, isLoading } = useFeaturedProducts();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const featuredRef = useRef<HTMLElement>(null);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-aura-sublime.dim_1920x1080.jpg"
            alt="Aura Sublime Perfume hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/95" />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-accent text-xs font-body tracking-[0.35em] uppercase mb-6"
          >
            Maison de Parfum
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-foreground leading-none mb-1"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            AURA
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-accent leading-none mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            SUBLIME
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 tracking-wide"
          >
            Where rare ingredients meet timeless artistry.
            <br className="hidden sm:block" />
            Wear the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/catalog" data-ocid="hero.primary_button">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-[0.2em] text-sm uppercase px-10 py-6 transition-smooth"
              >
                Explore Collection
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                featuredRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.secondary_button"
              className="border-accent/50 text-accent hover:bg-accent/10 font-body tracking-[0.2em] text-sm uppercase px-10 py-6 transition-smooth"
            >
              Our Signatures
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-muted-foreground/50 text-xs tracking-[0.3em] uppercase font-body">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Featured Collection ──────────────────────────────────────────── */}
      <section
        ref={featuredRef}
        data-ocid="featured.section"
        className="bg-background py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-accent text-xs tracking-[0.35em] uppercase font-body mb-3">
              Signature Fragrances
            </p>
            <h2 className="font-display text-foreground text-4xl md:text-5xl mb-4">
              Featured Collection
            </h2>
            <GoldDivider />
            <p className="text-muted-foreground font-body max-w-md mx-auto mt-4 leading-relaxed">
              Each creation is a symphony of rare ingredients, individually
              composed by our master perfumers.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((k) => (
                <ProductSkeleton key={k} />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              data-ocid="featured.list"
            >
              {(featured ?? []).slice(0, 3).map((product, i) => (
                <FeaturedProductCard
                  key={product.id}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/catalog" data-ocid="featured.view_all_button">
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:border-accent hover:text-accent font-body tracking-[0.2em] text-xs uppercase px-10 transition-smooth"
              >
                View Full Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Brand Story ──────────────────────────────────────────────────── */}
      <section
        data-ocid="brand_story.section"
        className="bg-muted/30 py-28 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-accent text-xs tracking-[0.35em] uppercase font-body mb-4">
                Our Philosophy
              </p>
              <h2 className="font-display text-foreground text-3xl md:text-4xl leading-tight mb-6">
                The Art of Olfactory Luxury
              </h2>
              <GoldDivider />
              <div className="mt-6 space-y-5 font-body text-muted-foreground leading-relaxed">
                <p>
                  Aura Sublime was born from a singular obsession: to capture
                  the ineffable. Each fragrance is a meditation on memory,
                  emotion, and the invisible threads that connect us to the
                  world's most breathtaking landscapes.
                </p>
                <p>
                  We source only the finest raw materials — Cambodian oud aged
                  for decades, Bulgarian rose harvested at dawn, Persian saffron
                  hand-selected at altitude. Shortcuts are not in our
                  vocabulary.
                </p>
                <p>
                  Every bottle is a limited act of creation. Our master
                  perfumers compose with patience, allowing each accord to
                  breathe and evolve over months before a single drop reaches
                  you.
                </p>
              </div>
              <div className="mt-10 flex gap-10">
                {[
                  { value: "20+", label: "Years of Craft" },
                  { value: "60+", label: "Rare Ingredients" },
                  { value: "12", label: "Master Accords" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-display text-3xl text-accent">{value}</p>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase font-body mt-1">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border">
                <img
                  src="/assets/generated/midnight-oud.dim_800x1000.jpg"
                  alt="Midnight Oud — craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-foreground text-xl mb-1">
                    Midnight Oud
                  </p>
                  <p className="text-muted-foreground text-xs font-body tracking-[0.2em] uppercase">
                    Signature Collection
                  </p>
                </div>
              </div>
              {/* Gold accent border */}
              <div className="absolute -top-3 -right-3 w-full h-full border border-accent/20 rounded-sm pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Fragrance Pillars ─────────────────────────────────────────────── */}
      <section data-ocid="pillars.section" className="bg-background py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-accent text-xs tracking-[0.35em] uppercase font-body mb-3">
              The Aura Promise
            </p>
            <h2 className="font-display text-foreground text-4xl md:text-5xl">
              Crafted Without Compromise
            </h2>
            <GoldDivider />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✦",
                title: "Rare Ingredients",
                body: "Every element is ethically sourced from the world's most celebrated growing regions. We accept nothing less than perfection.",
              },
              {
                icon: "◈",
                title: "Master Perfumers",
                body: "Our creators trained for decades under the finest noses of Grasse and the Levant. Their work is art, not formula.",
              },
              {
                icon: "◇",
                title: "Timeless Bottles",
                body: "Each flacon is hand-crafted crystal, designed to be as enduring as the scent it holds. A collector's object from the first.",
              },
            ].map(({ icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-center p-8 border border-border bg-card rounded-sm hover:border-accent/40 transition-smooth"
                data-ocid={`pillars.item.${i + 1}`}
              >
                <div className="text-accent text-3xl mb-5">{icon}</div>
                <h3 className="font-display text-foreground text-xl mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section
        data-ocid="newsletter.section"
        className="bg-card py-24 px-6 border-t border-border"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent text-xs tracking-[0.35em] uppercase font-body mb-4">
              Private Circle
            </p>
            <h2 className="font-display text-foreground text-3xl md:text-4xl mb-4">
              Enter the Inner Sanctum
            </h2>
            <GoldDivider />
            <p className="text-muted-foreground font-body mt-4 mb-10 leading-relaxed max-w-md mx-auto">
              Be the first to discover new creations, exclusive launches, and
              invitations to private events.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2"
                data-ocid="newsletter.success_state"
              >
                <div className="w-10 h-10 rounded-full border border-accent/60 flex items-center justify-center text-accent text-lg mb-2">
                  ✦
                </div>
                <p className="font-display text-foreground text-xl">
                  Welcome to the Circle
                </p>
                <p className="text-muted-foreground font-body text-sm">
                  Your invitation has been received. Expect the extraordinary.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                data-ocid="newsletter.form"
              >
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-ocid="newsletter.input"
                  className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground font-body text-sm tracking-wide focus-visible:ring-accent/50"
                />
                <Button
                  type="submit"
                  data-ocid="newsletter.submit_button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-body tracking-[0.2em] text-xs uppercase px-8 transition-smooth shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-muted-foreground/50 text-xs font-body mt-5 tracking-wide">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
