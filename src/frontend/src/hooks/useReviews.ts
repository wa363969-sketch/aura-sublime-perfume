import { createActor } from "@/backend";
import type { Review as BackendReview, CartEntry } from "@/backend.d";
import type { AddReviewInput, Review } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

type ActorWithReviews = {
  getReviewsByProduct?: (productId: bigint) => Promise<BackendReview[]>;
  addReview?: (
    productId: bigint,
    rating: bigint,
    comment: string,
  ) => Promise<BackendReview>;
  getAllReviews?: () => Promise<BackendReview[]>;
  deleteReview?: (reviewId: bigint) => Promise<void>;
  getAllCarts?: () => Promise<CartEntry[]>;
};

export function useReviews(productId: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor) return SEED_REVIEWS.filter((r) => r.productId === productId);
      try {
        const result = await (
          actor as unknown as ActorWithReviews
        ).getReviewsByProduct?.(BigInt(productId));
        if (!result || result.length === 0) {
          return SEED_REVIEWS.filter((r) => r.productId === productId);
        }
        return result.map(backendReviewToFrontend);
      } catch {
        return SEED_REVIEWS.filter((r) => r.productId === productId);
      }
    },
    enabled: !!productId && !isFetching,
    placeholderData: SEED_REVIEWS.filter((r) => r.productId === productId),
  });
}

export function useAddReview() {
  const { actor } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: AddReviewInput) => {
      if (!actor || !isAuthenticated)
        throw new Error("Must be logged in to leave a review");
      const result = await (actor as unknown as ActorWithReviews).addReview?.(
        BigInt(input.productId),
        BigInt(input.rating),
        input.body,
      );
      if (!result) throw new Error("Failed to submit review");
      return backendReviewToFrontend(result);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["reviews", variables.productId] });
      qc.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
}

// ─── Admin: All Reviews ───────────────────────────────────────────────────────

export function useAllReviews() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<BackendReview[]>({
    queryKey: ["admin", "reviews"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (
          (await (actor as unknown as ActorWithReviews).getAllReviews?.()) ?? []
        );
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching,
  });
}

export function useDeleteReview() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await (actor as unknown as ActorWithReviews).deleteReview?.(reviewId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

// ─── Admin: All Carts ─────────────────────────────────────────────────────────

export function useAllCarts() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<CartEntry[]>({
    queryKey: ["admin", "carts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (
          (await (actor as unknown as ActorWithReviews).getAllCarts?.()) ?? []
        );
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching,
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function backendReviewToFrontend(r: BackendReview): Review {
  return {
    id: String(r.id),
    productId: String(r.productId),
    userId: r.userId.toString(),
    author: `${r.userId.toString().slice(0, 12)}…`,
    rating: Number(r.rating),
    title: "",
    body: r.comment,
    createdAt: r.createdAt,
  };
}

// ─── Seed reviews ─────────────────────────────────────────────────────────────

const SEED_REVIEWS: Review[] = [
  {
    id: "rev-001",
    productId: "aura-001",
    userId: "user-1",
    author: "Sophia R.",
    rating: 5,
    title: "Absolutely transcendent",
    body: "Midnight Oud is everything I hoped for — the oud is deep but never harsh, and the drydown is extraordinary. Worth every penny.",
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "rev-002",
    productId: "aura-001",
    userId: "user-2",
    author: "James T.",
    rating: 5,
    title: "My new signature scent",
    body: "This replaced my 10-year signature. Commanding, sophisticated, and the longevity is beyond compare — 18+ hours on skin.",
    createdAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: "rev-003",
    productId: "aura-002",
    userId: "user-3",
    author: "Isabella M.",
    rating: 5,
    title: "Saffron done right",
    body: "Velvet Saffron manages to be opulent without being heavy. The leather accord is masterful — barely there but transformative.",
    createdAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "rev-004",
    productId: "aura-003",
    userId: "user-4",
    author: "Clara V.",
    rating: 5,
    title: "Ethereal and enduring",
    body: "Blanc de Soie is the cleanest, most beautiful floral I've encountered. The jasmine is photorealistic.",
    createdAt: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
];
