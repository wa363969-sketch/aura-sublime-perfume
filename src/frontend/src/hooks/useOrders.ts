import { createActor } from "@/backend";
import type { OrderStatus as BackendOrderStatus } from "@/backend.d";
import type { Order, OrderStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

// Map backend OrderStatus enum to our OrderStatus string union
function mapStatus(status: BackendOrderStatus): OrderStatus {
  const s = status as unknown as string;
  if (s === "confirmed") return "confirmed";
  if (s === "processing") return "processing";
  if (s === "shipped") return "shipped";
  if (s === "delivered") return "delivered";
  if (s === "cancelled") return "cancelled";
  return "pending";
}

// Map backend Order to frontend Order shape
function mapOrder(raw: {
  id: bigint;
  userId: { toText?: () => string } | string;
  createdAt: bigint;
  updatedAt: bigint;
  totalAmount: bigint;
  status: BackendOrderStatus;
  items: Array<{
    productId: bigint;
    productName: string;
    quantity: bigint;
    priceAtPurchase: bigint;
  }>;
}): Order {
  return {
    id: raw.id,
    userId:
      typeof raw.userId === "string"
        ? raw.userId
        : ((raw.userId as { toText?: () => string }).toText?.() ??
          String(raw.userId)),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    totalAmount: raw.totalAmount,
    status: mapStatus(raw.status),
    items: raw.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase,
    })),
  };
}

export function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<Order[]>({
    queryKey: ["orders", "mine"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getMyOrders?: () => Promise<unknown[]> }
        ).getMyOrders?.();
        if (!result) return [];
        return result.map((o) => mapOrder(o as Parameters<typeof mapOrder>[0]));
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching,
  });
}

export function useOrder(id: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const raw = await (
          actor as unknown as {
            getOrder?: (id: bigint) => Promise<unknown | null>;
          }
        ).getOrder?.(BigInt(id));
        if (!raw) return null;
        return mapOrder(raw as Parameters<typeof mapOrder>[0]);
      } catch {
        return null;
      }
    },
    enabled: !!id && !isFetching,
  });
}

export function useAllOrders() {
  const { actor, isFetching } = useActor(createActor);
  const { isAdmin } = useAuth();

  return useQuery<Order[]>({
    queryKey: ["orders", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await (
          actor as unknown as { getAllOrders?: () => Promise<unknown[]> }
        ).getAllOrders?.();
        if (!result) return [];
        return result.map((o) => mapOrder(o as Parameters<typeof mapOrder>[0]));
      } catch {
        return [];
      }
    },
    enabled: isAdmin && !isFetching,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const raw = await (
        actor as unknown as { createOrder?: () => Promise<unknown> }
      ).createOrder?.();
      if (!raw) throw new Error("Failed to create order");
      return mapOrder(raw as Parameters<typeof mapOrder>[0]);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("Not connected");
      const backendStatus = status as unknown as BackendOrderStatus;
      const raw = await (
        actor as unknown as {
          updateOrderStatus?: (
            id: bigint,
            status: BackendOrderStatus,
          ) => Promise<unknown | null>;
        }
      ).updateOrderStatus?.(id, backendStatus);
      if (!raw) return null;
      return mapOrder(raw as Parameters<typeof mapOrder>[0]);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
