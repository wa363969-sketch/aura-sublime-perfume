import { j as jsxRuntimeExports, h as cn, o as useAuth, Q as useQueryClient } from "./index-Aguxj3OV.js";
import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-Ck3CrUfx.js";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function useReviews(productId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      var _a;
      if (!actor) return SEED_REVIEWS.filter((r) => r.productId === productId);
      try {
        const result = await ((_a = actor.getReviewsByProduct) == null ? void 0 : _a.call(actor, BigInt(productId)));
        if (!result || result.length === 0) {
          return SEED_REVIEWS.filter((r) => r.productId === productId);
        }
        return result.map(backendReviewToFrontend);
      } catch {
        return SEED_REVIEWS.filter((r) => r.productId === productId);
      }
    },
    enabled: !!productId && !isFetching,
    placeholderData: SEED_REVIEWS.filter((r) => r.productId === productId)
  });
}
function useAddReview() {
  const { actor } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      var _a;
      if (!actor || !isAuthenticated)
        throw new Error("Must be logged in to leave a review");
      const result = await ((_a = actor.addReview) == null ? void 0 : _a.call(
        actor,
        BigInt(input.productId),
        BigInt(input.rating),
        input.body
      ));
      if (!result) throw new Error("Failed to submit review");
      return backendReviewToFrontend(result);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["reviews", variables.productId] });
      qc.invalidateQueries({ queryKey: ["product", variables.productId] });
    }
  });
}
function useAllReviews() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["admin", "reviews"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        return await ((_a = actor.getAllReviews) == null ? void 0 : _a.call(actor)) ?? [];
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching
  });
}
function useDeleteReview() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId) => {
      var _a;
      if (!actor) throw new Error("Not connected");
      await ((_a = actor.deleteReview) == null ? void 0 : _a.call(actor, reviewId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
      qc.invalidateQueries({ queryKey: ["reviews"] });
    }
  });
}
function useAllCarts() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["admin", "carts"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        return await ((_a = actor.getAllCarts) == null ? void 0 : _a.call(actor)) ?? [];
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching
  });
}
function backendReviewToFrontend(r) {
  return {
    id: String(r.id),
    productId: String(r.productId),
    userId: r.userId.toString(),
    author: `${r.userId.toString().slice(0, 12)}…`,
    rating: Number(r.rating),
    title: "",
    body: r.comment,
    createdAt: r.createdAt
  };
}
const SEED_REVIEWS = [
  {
    id: "rev-001",
    productId: "aura-001",
    userId: "user-1",
    author: "Sophia R.",
    rating: 5,
    title: "Absolutely transcendent",
    body: "Midnight Oud is everything I hoped for — the oud is deep but never harsh, and the drydown is extraordinary. Worth every penny.",
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1e3)
  },
  {
    id: "rev-002",
    productId: "aura-001",
    userId: "user-2",
    author: "James T.",
    rating: 5,
    title: "My new signature scent",
    body: "This replaced my 10-year signature. Commanding, sophisticated, and the longevity is beyond compare — 18+ hours on skin.",
    createdAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1e3)
  },
  {
    id: "rev-003",
    productId: "aura-002",
    userId: "user-3",
    author: "Isabella M.",
    rating: 5,
    title: "Saffron done right",
    body: "Velvet Saffron manages to be opulent without being heavy. The leather accord is masterful — barely there but transformative.",
    createdAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1e3)
  },
  {
    id: "rev-004",
    productId: "aura-003",
    userId: "user-4",
    author: "Clara V.",
    rating: 5,
    title: "Ethereal and enduring",
    body: "Blanc de Soie is the cleanest, most beautiful floral I've encountered. The jasmine is photorealistic.",
    createdAt: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1e3)
  }
];
export {
  Textarea as T,
  useAddReview as a,
  useAllReviews as b,
  useDeleteReview as c,
  useAllCarts as d,
  useReviews as u
};
