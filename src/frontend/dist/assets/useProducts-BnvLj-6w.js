import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-Ck3CrUfx.js";
import { Q as useQueryClient } from "./index-Aguxj3OV.js";
const SEED_PRODUCTS = [
  {
    id: "aura-001",
    name: "Midnight Oud",
    brand: "Aura Sublime",
    description: "A profound oriental composition of rare Cambodian oud, dark Bulgarian rose, and smoked amber. For those who command presence without words.",
    price: 240,
    imageUrl: "/assets/generated/midnight-oud.dim_800x1000.jpg",
    category: "oriental",
    volume: "100ml",
    notes: ["Cambodian Oud", "Bulgarian Rose", "Smoked Amber", "Sandalwood"],
    inStock: true,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    createdAt: BigInt(Date.now())
  },
  {
    id: "aura-002",
    name: "Velvet Saffron",
    brand: "Aura Sublime",
    description: "A sumptuous tapestry of Persian saffron, aged leather, and golden benzoin — an opulent trail that endures through the night.",
    price: 195,
    imageUrl: "/assets/generated/velvet-saffron.dim_800x1000.jpg",
    category: "oriental",
    volume: "75ml",
    notes: ["Persian Saffron", "Aged Leather", "Benzoin", "Labdanum"],
    inStock: true,
    rating: 4.8,
    reviewCount: 94,
    featured: true,
    createdAt: BigInt(Date.now())
  },
  {
    id: "aura-003",
    name: "Blanc de Soie",
    brand: "Aura Sublime",
    description: "An ethereal white floral — jasmine sambac and tuberose lifted by a whisper of sandalwood and white musk. Elegance distilled.",
    price: 170,
    imageUrl: "/assets/generated/blanc-de-soie.dim_800x1000.jpg",
    category: "floral",
    volume: "50ml",
    notes: ["Jasmine Sambac", "Tuberose", "Sandalwood", "White Musk"],
    inStock: true,
    rating: 4.7,
    reviewCount: 76,
    featured: true,
    createdAt: BigInt(Date.now())
  },
  {
    id: "aura-004",
    name: "Cèdre Impérial",
    brand: "Aura Sublime",
    description: "Virginia cedar and Atlas cedarwood anchored by vetiver and black pepper — a monument of woody sophistication.",
    price: 185,
    imageUrl: "/assets/generated/cedre-imperial.dim_800x1000.jpg",
    category: "woody",
    volume: "100ml",
    notes: ["Virginia Cedar", "Atlas Cedarwood", "Vetiver", "Black Pepper"],
    inStock: true,
    rating: 4.6,
    reviewCount: 61,
    featured: false,
    createdAt: BigInt(Date.now())
  },
  {
    id: "aura-005",
    name: "Aqua Royale",
    brand: "Aura Sublime",
    description: "Marine breeze over Mediterranean cliffs — bergamot, sea fennel, and driftwood converge in a crisp, effortless signature.",
    price: 155,
    imageUrl: "/assets/generated/aqua-royale.dim_800x1000.jpg",
    category: "aquatic",
    volume: "75ml",
    notes: ["Bergamot", "Sea Fennel", "Driftwood", "Ambrette Seed"],
    inStock: true,
    rating: 4.5,
    reviewCount: 48,
    featured: false,
    createdAt: BigInt(Date.now())
  },
  {
    id: "aura-006",
    name: "Rose Absolue",
    brand: "Aura Sublime",
    description: "Thirty Grasse roses distilled into a single fragrance. Litchi, rose absolute, and patchouli — a true collector's floral.",
    price: 220,
    imageUrl: "/assets/generated/rose-absolue.dim_800x1000.jpg",
    category: "floral",
    volume: "50ml",
    notes: ["Rose Absolute", "Litchi", "Patchouli", "Musk"],
    inStock: false,
    rating: 4.9,
    reviewCount: 112,
    featured: true,
    createdAt: BigInt(Date.now())
  }
];
function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      var _a;
      if (!actor) return SEED_PRODUCTS;
      try {
        const result = await ((_a = actor.listProducts) == null ? void 0 : _a.call(actor));
        if (!result || Array.isArray(result) && result.length === 0) {
          return SEED_PRODUCTS;
        }
        return result;
      } catch {
        return SEED_PRODUCTS;
      }
    },
    enabled: !isFetching,
    placeholderData: SEED_PRODUCTS
  });
}
function useProduct(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      var _a;
      if (!actor) return SEED_PRODUCTS.find((p) => p.id === id) ?? null;
      try {
        const result = await ((_a = actor.getProduct) == null ? void 0 : _a.call(actor, id));
        return result ?? SEED_PRODUCTS.find((p) => p.id === id) ?? null;
      } catch {
        return SEED_PRODUCTS.find((p) => p.id === id) ?? null;
      }
    },
    enabled: !!id && !isFetching
  });
}
function useFeaturedProducts() {
  const { data, ...rest } = useProducts();
  return {
    data: (data == null ? void 0 : data.filter((p) => p.featured)) ?? [],
    ...rest
  };
}
function useAddProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      var _a;
      if (!actor) throw new Error("Not connected");
      return (_a = actor.addProduct) == null ? void 0 : _a.call(actor, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input
    }) => {
      var _a;
      if (!actor) throw new Error("Not connected");
      return (_a = actor.updateProduct) == null ? void 0 : _a.call(actor, id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      var _a;
      if (!actor) throw new Error("Not connected");
      return (_a = actor.deleteProduct) == null ? void 0 : _a.call(actor, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
}
export {
  useProducts as a,
  useProduct as b,
  useAddProduct as c,
  useUpdateProduct as d,
  useDeleteProduct as e,
  useFeaturedProducts as u
};
