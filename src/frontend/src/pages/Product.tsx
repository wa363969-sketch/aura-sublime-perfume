import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/hooks/useCart";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useAddReview, useReviews } from "@/hooks/useReviews";
import type { AddReviewInput, Product } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  CheckCircle,
  ChevronRight,
  Droplets,
  Layers,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Wind,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function avg(ratings: number[]) {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

const CATEGORY_LABELS: Record<string, string> = {
  floral: "Floral",
  woody: "Woody",
  oriental: "Oriental",
  fresh: "Fresh",
  citrus: "Citrus",
  aquatic: "Aquatic",
};

// ─── Star Display ─────────────────────────────────────────────────────────────

function StarDisplay({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-accent text-accent"
              : "text-muted-foreground/30"
          }
        />
      ))}
    </span>
  );
}

// ─── Star Picker ─────────────────────────────────────────────────────────────

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" aria-label="Select rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`${i} star`}
          data-ocid={`review.star.${i}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <Star
            size={24}
            className={
              i <= (hover || value)
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            }
          />
        </button>
      ))}
    </div>
  );
}

// ─── Notes Tier ──────────────────────────────────────────────────────────────

interface NotesTierProps {
  icon: React.ReactNode;
  label: string;
  notes: string[];
}

function NotesTier({ icon, label, notes }: NotesTierProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-display">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {notes.map((n) => (
          <Badge
            key={n}
            variant="outline"
            className="text-xs border-accent/30 text-foreground bg-accent/5 px-3 py-1"
          >
            {n}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

interface ReviewCardProps {
  review: {
    id: string;
    author: string;
    rating: number;
    title: string;
    body: string;
    createdAt: bigint;
  };
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-2 py-5 border-b border-border last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StarDisplay rating={review.rating} size={14} />
            <span className="text-sm font-semibold text-foreground leading-tight">
              {review.title}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {review.author} · {formatDate(review.createdAt)}
          </span>
        </div>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">
        {review.body}
      </p>
    </div>
  );
}

// ─── Related Product Card ─────────────────────────────────────────────────────

function RelatedCard({ product }: { product: Product }) {
  const displayPrice = product.salePrice ?? product.price;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      data-ocid="related.product.link"
    >
      <Card className="group bg-card border-border overflow-hidden hover:border-accent/50 transition-smooth cursor-pointer h-full">
        <div className="aspect-[3/4] overflow-hidden bg-muted/20">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </div>
        <CardContent className="p-4 flex flex-col gap-1">
          <p className="font-display text-base text-foreground leading-tight">
            {product.name}
          </p>
          <p className="text-xs text-muted-foreground">{product.volume}</p>
          <p className="text-accent font-semibold text-sm mt-1">
            ${displayPrice}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── Review Form ─────────────────────────────────────────────────────────────

function ReviewForm({ productId }: { productId: string }) {
  const { isAuthenticated, login } = useAuth();
  const addReview = useAddReview();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthenticated) {
    return (
      <div
        data-ocid="review.login_prompt"
        className="flex flex-col items-center gap-4 py-8 px-6 border border-dashed border-border rounded-lg bg-muted/20 text-center"
      >
        <Lock size={28} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Sign in with Internet Identity to share your experience
        </p>
        <Button
          variant="outline"
          onClick={login}
          data-ocid="review.login_button"
          className="border-accent/40 text-accent hover:bg-accent/10"
        >
          Sign In to Review
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div
        data-ocid="review.success_state"
        className="flex flex-col items-center gap-3 py-8 text-center"
      >
        <CheckCircle size={32} className="text-accent" />
        <p className="font-display text-lg text-foreground">
          Review submitted!
        </p>
        <p className="text-sm text-muted-foreground">
          Thank you for sharing your experience.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a review title.");
      return;
    }
    if (!body.trim()) {
      toast.error("Please write your review.");
      return;
    }
    const input: AddReviewInput = {
      productId,
      rating,
      title: title.trim(),
      body: body.trim(),
    };
    try {
      await addReview.mutateAsync(input);
      setSubmitted(true);
      toast.success("Your review has been published.");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      data-ocid="review.form"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">
          Your Rating
        </Label>
        <StarPicker value={rating} onChange={setRating} />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="review-title"
          className="text-xs uppercase tracking-widest text-muted-foreground"
        >
          Title
        </Label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarise your experience"
          maxLength={80}
          data-ocid="review.title_input"
          className="w-full bg-muted/30 border border-input rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="review-body"
          className="text-xs uppercase tracking-widest text-muted-foreground"
        >
          Your Review
        </Label>
        <Textarea
          id="review-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell us about the fragrance, longevity, sillage…"
          rows={4}
          maxLength={800}
          data-ocid="review.body_input"
          className="bg-muted/30 border-input resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={addReview.isPending}
        data-ocid="review.submit_button"
        className="self-start"
      >
        {addReview.isPending ? "Submitting…" : "Submit Review"}
      </Button>
    </form>
  );
}

// ─── Notes split helper ───────────────────────────────────────────────────────

function splitNotes(notes: string[]) {
  if (notes.length <= 1)
    return { top: notes, heart: [] as string[], base: [] as string[] };
  if (notes.length === 2)
    return { top: [notes[0]], heart: [] as string[], base: [notes[1]] };
  if (notes.length === 3)
    return { top: [notes[0]], heart: [notes[1]], base: [notes[2]] };
  const third = Math.floor(notes.length / 3);
  return {
    top: notes.slice(0, third),
    heart: notes.slice(third, third * 2),
    base: notes.slice(third * 2),
  };
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
      <Skeleton className="aspect-[3/4] w-full rounded-xl" />
      <div className="flex flex-col gap-6 pt-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: product, isLoading } = useProduct(id);
  const { data: reviews = [] } = useReviews(id);
  const { data: allProducts = [] } = useProducts();
  const addItem = useCartStore((s) => s.addItem);

  const [qty, setQty] = useState(1);

  const averageRating = avg(reviews.map((r) => r.rating));
  const relatedProducts = allProducts
    .filter((p) => p.id !== id && p.category === product?.category)
    .slice(0, 3);

  function handleAddToCart() {
    if (!product) return;
    addItem(product, qty);
    toast.success(`${product.name} added to cart`, {
      description: `${qty} × ${product.volume}`,
    });
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 max-w-6xl">
        <ProductSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6"
        data-ocid="product.not_found"
      >
        <p className="font-display text-3xl text-foreground">
          Product not found
        </p>
        <p className="text-muted-foreground">
          The fragrance you're looking for may have moved.
        </p>
        <Button asChild variant="outline">
          <Link to="/catalog">Browse Catalog</Link>
        </Button>
      </div>
    );
  }

  const { top, heart, base } = splitNotes(product.notes);
  const displayPrice = product.salePrice ?? product.price;

  return (
    <div
      className="container mx-auto px-4 max-w-6xl pb-24"
      data-ocid="product.page"
    >
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 py-6 text-xs text-muted-foreground"
        aria-label="Breadcrumb"
        data-ocid="product.breadcrumb"
      >
        <Link
          to="/"
          className="hover:text-accent transition-colors"
          data-ocid="breadcrumb.home_link"
        >
          Home
        </Link>
        <ChevronRight size={12} />
        <Link
          to="/catalog"
          className="hover:text-accent transition-colors"
          data-ocid="breadcrumb.catalog_link"
        >
          Catalog
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative"
          data-ocid="product.image_panel"
        >
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-muted/40 to-muted/10 border border-border shadow-xl">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          </div>
          {!product.inStock && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="destructive"
                className="text-xs px-3 py-1 uppercase tracking-wider"
              >
                Sold Out
              </Badge>
            </div>
          )}
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-6 pt-2"
          data-ocid="product.details_panel"
        >
          {/* Category badge + brand */}
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-accent/50 text-accent bg-accent/10 text-xs uppercase tracking-widest px-3 py-1"
              data-ocid="product.category_badge"
            >
              {CATEGORY_LABELS[product.category] ?? product.category}
            </Badge>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {product.brand}
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-display text-4xl lg:text-5xl text-foreground leading-tight"
            data-ocid="product.name"
          >
            {product.name}
          </h1>

          {/* Rating */}
          {reviews.length > 0 && (
            <div
              className="flex items-center gap-3"
              data-ocid="product.rating_summary"
            >
              <StarDisplay rating={averageRating} size={18} />
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} · {reviews.length} review
                {reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3" data-ocid="product.price">
            <span className="font-display text-3xl text-accent">
              ${displayPrice}
            </span>
            {product.salePrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.price}
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-1">
              {product.volume}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-base text-foreground/80 leading-relaxed border-l-2 border-accent/30 pl-4 italic"
            data-ocid="product.description"
          >
            {product.description}
          </p>

          {/* Stock status */}
          <div
            className="flex items-center gap-2"
            data-ocid="product.stock_status"
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${product.inStock ? "" : "bg-destructive"}`}
              style={
                product.inStock
                  ? { backgroundColor: "oklch(0.6 0.15 150)" }
                  : undefined
              }
            />
            <span
              className={`text-sm ${product.inStock ? "text-foreground/70" : "text-destructive"}`}
            >
              {product.inStock
                ? "In Stock — Ships within 2 business days"
                : "Currently out of stock"}
            </span>
          </div>

          {/* Quantity + Add to Cart */}
          <div
            className="flex items-center gap-4 pt-2"
            data-ocid="product.purchase_controls"
          >
            <div className="flex items-center border border-border rounded-lg overflow-hidden bg-muted/20">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={qty <= 1}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-ocid="product.quantity_decrease"
                className="px-3 py-2 text-foreground hover:bg-muted/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Minus size={14} />
              </button>
              <span
                className="px-4 py-2 text-sm font-semibold text-foreground min-w-[3rem] text-center select-none"
                data-ocid="product.quantity_value"
                aria-live="polite"
              >
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                data-ocid="product.quantity_increase"
                className="px-3 py-2 text-foreground hover:bg-muted/40 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <Button
              size="lg"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              data-ocid="product.add_to_cart_button"
              className="flex-1 gap-2 text-sm uppercase tracking-wider"
            >
              <ShoppingBag size={16} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          <Separator className="bg-border/60" />

          {/* Fragrance Notes */}
          <div
            className="flex flex-col gap-5"
            data-ocid="product.fragrance_notes"
          >
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-display">
              Fragrance Composition
            </h2>
            <div className="flex flex-col gap-4 bg-card/50 rounded-xl border border-border/60 p-5">
              {top.length > 0 && (
                <NotesTier
                  icon={<Wind size={14} />}
                  label="Top Notes"
                  notes={top}
                />
              )}
              {heart.length > 0 && (
                <>
                  <Separator className="bg-border/40" />
                  <NotesTier
                    icon={<Droplets size={14} />}
                    label="Heart Notes"
                    notes={heart}
                  />
                </>
              )}
              {base.length > 0 && (
                <>
                  <Separator className="bg-border/40" />
                  <NotesTier
                    icon={<Layers size={14} />}
                    label="Base Notes"
                    notes={base}
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews + Leave a Review */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20"
        data-ocid="product.reviews_section"
      >
        <Separator className="bg-border/60 mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Review List */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-foreground">
                Customer Reviews
              </h2>
              {reviews.length > 0 && (
                <div
                  className="flex items-center gap-2"
                  data-ocid="product.reviews_avg"
                >
                  <StarDisplay rating={averageRating} size={16} />
                  <span className="text-sm text-muted-foreground font-semibold">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {reviews.length === 0 ? (
              <div
                className="py-12 text-center text-muted-foreground text-sm border border-dashed border-border rounded-lg"
                data-ocid="product.reviews_empty_state"
              >
                No reviews yet — be the first to share your experience.
              </div>
            ) : (
              <div data-ocid="product.reviews_list">
                {reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    data-ocid={`product.review.item.${i + 1}`}
                  >
                    <ReviewCard review={review} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Leave a Review */}
          <div
            className="flex flex-col gap-5"
            data-ocid="product.review_form_panel"
          >
            <h2 className="font-display text-2xl text-foreground">
              Share Your Experience
            </h2>
            <ReviewForm productId={id} />
          </div>
        </div>
      </motion.section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
          data-ocid="product.related_section"
        >
          <Separator className="bg-border/60 mb-12" />
          <h2 className="font-display text-2xl text-foreground mb-8">
            You May Also Adore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={`product.related.item.${i + 1}`}
              >
                <RelatedCard product={p} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
