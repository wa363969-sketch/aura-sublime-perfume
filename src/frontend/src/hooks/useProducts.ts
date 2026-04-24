import { createActor } from "@/backend";
import type { AddProductInput, Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ─── Seed products for demo when backend returns empty ───────────────────────
const SEED_PRODUCTS: Product[] = [
  {
    id: "aura-001",
    name: "Midnight Oud",
    brand: "Aura Sublime",
    description:
      "A profound oriental composition of rare Cambodian oud, dark Bulgarian rose, and smoked amber. For those who command presence without words.",
    price: 240,
    imageUrl: "/assets/generated/midnight-oud.dim_800x1000.jpg",
    category: "oriental",
    volume: "100ml",
    notes: ["Cambodian Oud", "Bulgarian Rose", "Smoked Amber", "Sandalwood"],
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: "aura-002",
    name: "Velvet Saffron",
    brand: "Aura Sublime",
    description:
      "A sumptuous tapestry of Persian saffron, aged leather, and golden benzoin — an opulent trail that endures through the night.",
    price: 195,
    imageUrl: "/assets/generated/velvet-saffron.dim_800x1000.jpg",
    category: "oriental",
    volume: "75ml",
    notes: ["Persian Saffron", "Aged Leather", "Benzoin", "Labdanum"],
    inStock: true,
    rating: 4.8,
    reviewCount: 94,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: "aura-003",
    name: "Blanc de Soie",
    brand: "Aura Sublime",
    description:
      "An ethereal white floral — jasmine sambac and tuberose lifted by a whisper of sandalwood and white musk. Elegance distilled.",
    price: 170,
    imageUrl: "/assets/generated/blanc-de-soie.dim_800x1000.jpg",
    category: "floral",
    volume: "50ml",
    notes: ["Jasmine Sambac", "Tuberose", "Sandalwood", "White Musk"],
    inStock: true,
    rating: 4.7,
    reviewCount: 76,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: "aura-004",
    name: "Cèdre Impérial",
    brand: "Aura Sublime",
    description:
      "Virginia cedar and Atlas cedarwood anchored by vetiver and black pepper — a monument of woody sophistication.",
    price: 185,
    imageUrl: "/assets/generated/cedre-imperial.dim_800x1000.jpg",
    category: "woody",
    volume: "100ml",
    notes: ["Virginia Cedar", "Atlas Cedarwood", "Vetiver", "Black Pepper"],
    inStock: true,
    rating: 4.6,
    reviewCount: 61,
    featured: false,
    createdAt: BigInt(Date.now()),
  },
  {
    id: "aura-005",
    name: "Aqua Royale",
    brand: "Aura Sublime",
    description:
      "Marine breeze over Mediterranean cliffs — bergamot, sea fennel, and driftwood converge in a crisp, effortless signature.",
    price: 155,
    imageUrl: "/assets/generated/aqua-royale.dim_800x1000.jpg",
    category: "aquatic",
    volume: "75ml",
    notes: ["Bergamot", "Sea Fennel", "Driftwood", "Ambrette Seed"],
    inStock: true,
    rating: 4.5,
    reviewCount: 48,
    featured: false,
    createdAt: BigInt(Date.now()),
  },
  {
    id: "aura-006",
    name: "Rose Absolue",
    brand: "Aura Sublime",
    description:
      "Thirty Grasse roses distilled into a single fragrance. Litchi, rose absolute, and patchouli — a true collector's floral.",
    price: 220,
    imageUrl: "/assets/generated/rose-absolue.dim_800x1000.jpg",
    category: "floral",
    volume: "50ml",
    notes: ["Rose Absolute", "Litchi", "Patchouli", "Musk"],
    inStock: false,
    rating: 4.9,
    reviewCount: 112,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
];

// ─── Hooks ───────────────────────────────────────────────────────────────────

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return SEED_PRODUCTS;
      try {
        const result = await (
          actor as unknown as { listProducts?: () => Promise<Product[]> }
        ).listProducts?.();
        if (!result || (Array.isArray(result) && result.length === 0)) {
          return SEED_PRODUCTS;
        }
        return result;
      } catch {
        return SEED_PRODUCTS;
      }
    },
    enabled: !isFetching,
    placeholderData: SEED_PRODUCTS,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return SEED_PRODUCTS.find((p) => p.id === id) ?? null;
      try {
        const result = await (
          actor as unknown as {
            getProduct?: (id: string) => Promise<Product | null>;
          }
        ).getProduct?.(id);
        return result ?? SEED_PRODUCTS.find((p) => p.id === id) ?? null;
      } catch {
        return SEED_PRODUCTS.find((p) => p.id === id) ?? null;
      }
    },
    enabled: !!id && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { data, ...rest } = useProducts();
  return {
    data: data?.filter((p) => p.featured) ?? [],
    ...rest,
  };
}

export function useAddProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: AddProductInput) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as {
          addProduct?: (i: AddProductInput) => Promise<Product>;
        }
      ).addProduct?.(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: string; input: Partial<AddProductInput> }) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as {
          updateProduct?: (
            id: string,
            i: Partial<AddProductInput>,
          ) => Promise<Product>;
        }
      ).updateProduct?.(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as { deleteProduct?: (id: string) => Promise<void> }
      ).deleteProduct?.(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
