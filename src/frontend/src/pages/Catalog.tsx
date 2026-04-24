import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import type { Product, ProductCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Filter,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CatalogSearch {
  q?: string;
  type?: string;
  maxPrice?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "floral", label: "Floral" },
  { value: "woody", label: "Woody" },
  { value: "citrus", label: "Citrus" },
  { value: "oriental", label: "Oriental" },
  { value: "fresh", label: "Fresh" },
  { value: "aquatic", label: "Aquatic" },
];

const PRICE_MARKS = [100, 150, 200, 250, 300];
const MAX_PRICE_DEFAULT = 300;

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: `${product.volume} · $${product.salePrice ?? product.price}`,
      duration: 4000,
    });
  }

  const displayCategory =
    CATEGORIES.find((c) => c.value === product.category)?.label ??
    product.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-card border border-border/60 rounded-xl overflow-hidden flex flex-col group hover:border-accent/40 hover:shadow-[0_8px_32px_oklch(0_0_0/0.35)] transition-smooth"
      data-ocid={`catalog.product.item.${index + 1}`}
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        data-ocid={`catalog.product.link.${index + 1}`}
      >
        <div className="aspect-[4/5] bg-muted/40 relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
              <Badge
                variant="secondary"
                className="text-xs font-body tracking-wider uppercase"
              >
                Sold Out
              </Badge>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.featured && product.inStock && (
              <Badge className="bg-primary/90 text-primary-foreground text-xs border-0 font-body tracking-wider">
                Featured
              </Badge>
            )}
            {product.salePrice && (
              <Badge className="bg-accent/90 text-accent-foreground text-xs border-0 font-body">
                Sale
              </Badge>
            )}
          </div>
          <Badge
            variant="outline"
            className="absolute bottom-3 right-3 text-xs border-border/70 bg-background/80 backdrop-blur-sm text-muted-foreground capitalize"
          >
            {displayCategory}
          </Badge>
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to="/product/$id" params={{ id: product.id }}>
              <h3 className="font-display text-base text-foreground hover:text-accent transition-smooth truncate">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">
              {product.volume}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-xs text-muted-foreground">
              {product.rating}
            </span>
            <span className="text-xs text-muted-foreground/50">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap mt-1">
          {product.notes.slice(0, 3).map((note) => (
            <Badge
              key={note}
              variant="outline"
              className="text-[10px] px-1.5 py-0 text-muted-foreground border-border/50 font-body"
            >
              {note}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="font-display text-xl text-accent">
                  ${product.salePrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="font-display text-xl text-foreground">
                ${product.price}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:text-accent hover:bg-accent/10 transition-smooth rounded-full"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            data-ocid={`catalog.add_to_cart.${index + 1}`}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
        <div
          key={k}
          className="bg-card rounded-xl border border-border/40 overflow-hidden"
        >
          <Skeleton className="aspect-[4/5] w-full rounded-none" />
          <div className="p-4 flex flex-col gap-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex justify-between pt-2 border-t border-border/30 mt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-7 w-7 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Filter panel ─────────────────────────────────────────────────────────────

interface FilterPanelProps {
  selectedCategories: string[];
  maxPrice: number;
  onCategoryChange: (cat: string, checked: boolean) => void;
  onMaxPriceChange: (val: number) => void;
  onClear: () => void;
  activeCount: number;
}

function FilterPanel({
  selectedCategories,
  maxPrice,
  onCategoryChange,
  onMaxPriceChange,
  onClear,
  activeCount,
}: FilterPanelProps) {
  return (
    <aside className="bg-card border border-border/60 rounded-xl p-5 flex flex-col gap-5 sticky top-24 self-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-accent" />
          <span className="font-display text-sm text-foreground">Filters</span>
          {activeCount > 0 && (
            <Badge className="bg-primary text-primary-foreground text-xs h-5 px-1.5 border-0">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
            data-ocid="catalog.filter.clear_button"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <Separator className="bg-border/40" />

      {/* Fragrance type */}
      <div>
        <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-3">
          Fragrance Type
        </p>
        <div className="flex flex-col gap-2.5">
          {CATEGORIES.map((cat) => (
            <div key={cat.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${cat.value}`}
                checked={selectedCategories.includes(cat.value)}
                onCheckedChange={(checked) =>
                  onCategoryChange(cat.value, checked as boolean)
                }
                className="border-border/70 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                data-ocid={`catalog.filter.${cat.value}`}
              />
              <Label
                htmlFor={`cat-${cat.value}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors capitalize font-body"
              >
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* Price range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body">
            Max Price
          </p>
          <span className="font-display text-sm text-accent">${maxPrice}</span>
        </div>
        <input
          type="range"
          min={50}
          max={MAX_PRICE_DEFAULT}
          step={10}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer bg-border/60 accent-primary"
          data-ocid="catalog.filter.price_range"
        />
        <div className="flex justify-between mt-2">
          {PRICE_MARKS.map((mark) => (
            <span key={mark} className="text-[10px] text-muted-foreground/50">
              ${mark}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── CatalogPage ──────────────────────────────────────────────────────────────

function pushUrlParams(patch: Partial<CatalogSearch>) {
  const params = new URLSearchParams(window.location.search);
  const keys: (keyof CatalogSearch)[] = ["q", "type", "maxPrice"];
  for (const k of keys) {
    const val = patch[k];
    if (val) params.set(k, val);
    else params.delete(k);
  }
  const search = params.toString();
  window.history.replaceState(
    {},
    "",
    search ? `?${search}` : window.location.pathname,
  );
}

export default function CatalogPage() {
  // Use a local state mirror so React re-renders on param changes
  const [urlParams, setUrlParams] = useState<CatalogSearch>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      q: params.get("q") ?? undefined,
      type: params.get("type") ?? undefined,
      maxPrice: params.get("maxPrice") ?? undefined,
    };
  });

  const searchQuery = urlParams.q ?? "";
  const selectedCategories = urlParams.type
    ? urlParams.type.split(",").filter(Boolean)
    : [];
  const maxPrice = urlParams.maxPrice
    ? Number(urlParams.maxPrice)
    : MAX_PRICE_DEFAULT;

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: products, isLoading } = useProducts();

  // ── URL param helpers ──────────────────────────────────────────────────────

  const setParams = useCallback(
    (patch: Partial<CatalogSearch>) => {
      const next: CatalogSearch = {
        q: searchQuery || undefined,
        type: selectedCategories.length
          ? selectedCategories.join(",")
          : undefined,
        maxPrice: maxPrice < MAX_PRICE_DEFAULT ? String(maxPrice) : undefined,
        ...patch,
      };
      pushUrlParams(next);
      setUrlParams({ ...next });
    },
    [searchQuery, selectedCategories, maxPrice],
  );

  const handleSearch = (val: string) => setParams({ q: val || undefined });

  const handleCategoryChange = (cat: string, checked: boolean) => {
    const next = checked
      ? [...selectedCategories, cat]
      : selectedCategories.filter((c) => c !== cat);
    setParams({ type: next.length ? next.join(",") : undefined });
  };

  const handleMaxPrice = (val: number) =>
    setParams({ maxPrice: val < MAX_PRICE_DEFAULT ? String(val) : undefined });

  const handleClearFilters = () => {
    window.history.replaceState({}, "", window.location.pathname);
    setUrlParams({});
  };

  // ── Filtered products ──────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.notes.some((n) =>
          n.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      const matchesPrice = (p.salePrice ?? p.price) <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategories, maxPrice]);

  const activeFilterCount =
    selectedCategories.length + (maxPrice < MAX_PRICE_DEFAULT ? 1 : 0);

  // ── Active filter summary chips ────────────────────────────────────────────

  function ActiveFilterChips() {
    const chips: { label: string; onRemove: () => void }[] = [
      ...selectedCategories.map((cat) => ({
        label: CATEGORIES.find((c) => c.value === cat)?.label ?? cat,
        onRemove: () => handleCategoryChange(cat, false),
      })),
      ...(maxPrice < MAX_PRICE_DEFAULT
        ? [
            {
              label: `≤ $${maxPrice}`,
              onRemove: () => handleMaxPrice(MAX_PRICE_DEFAULT),
            },
          ]
        : []),
    ];
    if (!chips.length) return null;
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {chips.map((chip) => (
          <Badge
            key={chip.label}
            variant="outline"
            className="border-accent/50 text-accent bg-accent/10 pr-1 pl-2.5 gap-1 cursor-default"
          >
            {chip.label}
            <button
              type="button"
              onClick={chip.onRemove}
              className="ml-0.5 rounded-full hover:bg-accent/20 p-0.5"
              aria-label={`Remove ${chip.label} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <button
          type="button"
          onClick={handleClearFilters}
          className="text-xs text-muted-foreground hover:text-accent transition-colors"
          data-ocid="catalog.filter.clear_all_button"
        >
          Clear all
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="catalog.page">
      {/* ── Page header ── */}
      <section className="bg-card border-b border-border/50 py-10">
        <div className="container mx-auto px-4">
          <span className="text-xs tracking-[0.3em] text-accent uppercase font-body">
            Collection
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mt-2 mb-1">
            All Fragrances
          </h1>
          <p className="text-muted-foreground font-body text-sm">
            Rare compositions crafted for the discerning few.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* ── Search + mobile filter toggle ── */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search fragrances, notes, brands…"
              className="pl-9 bg-card border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:border-accent/60 h-10"
              data-ocid="catalog.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
                data-ocid="catalog.search_clear"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-2 border-border/60 lg:hidden"
            onClick={() => setShowMobileFilters((v) => !v)}
            data-ocid="catalog.filter.toggle_button"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs h-4 px-1 border-0 ml-0.5">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* ── Active filter chips ── */}
        <div className="mb-4">
          <ActiveFilterChips />
        </div>

        {/* ── Mobile filter drawer ── */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden mb-6"
            >
              <FilterPanel
                selectedCategories={selectedCategories}
                maxPrice={maxPrice}
                onCategoryChange={handleCategoryChange}
                onMaxPriceChange={handleMaxPrice}
                onClear={handleClearFilters}
                activeCount={activeFilterCount}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Layout: sidebar + grid ── */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-56 shrink-0">
            <FilterPanel
              selectedCategories={selectedCategories}
              maxPrice={maxPrice}
              onCategoryChange={handleCategoryChange}
              onMaxPriceChange={handleMaxPrice}
              onClear={handleClearFilters}
              activeCount={activeFilterCount}
            />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Count summary */}
            {!isLoading && (
              <div
                className="flex items-center gap-2 mb-5"
                data-ocid="catalog.results_summary"
              >
                <span className="text-sm text-muted-foreground font-body">
                  <span className="text-foreground font-display">
                    {filtered.length}
                  </span>{" "}
                  {filtered.length === 1 ? "fragrance" : "fragrances"}
                  {activeFilterCount > 0 || searchQuery
                    ? " matching your filters"
                    : " in collection"}
                </span>
              </div>
            )}

            {isLoading ? (
              <ProductGridSkeleton />
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 gap-5 text-center"
                data-ocid="catalog.empty_state"
              >
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="h-7 w-7 text-muted-foreground/50" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    No fragrances found
                  </h3>
                  <p className="text-muted-foreground font-body text-sm max-w-xs">
                    Try adjusting your search or filters to discover more of our
                    collection.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="border-border/60 hover:border-accent/50 hover:text-accent transition-smooth"
                  data-ocid="catalog.empty_state.clear_button"
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  data-ocid="catalog.product.list"
                >
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
