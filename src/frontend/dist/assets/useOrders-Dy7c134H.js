import { u as useActor, b as useMutation, a as useQuery, c as createActor } from "./backend-Ck3CrUfx.js";
import { Q as useQueryClient, o as useAuth } from "./index-Aguxj3OV.js";
function mapStatus(status) {
  const s = status;
  if (s === "confirmed") return "confirmed";
  if (s === "processing") return "processing";
  if (s === "shipped") return "shipped";
  if (s === "delivered") return "delivered";
  if (s === "cancelled") return "cancelled";
  return "pending";
}
function mapOrder(raw) {
  var _a, _b;
  return {
    id: raw.id,
    userId: typeof raw.userId === "string" ? raw.userId : ((_b = (_a = raw.userId).toText) == null ? void 0 : _b.call(_a)) ?? String(raw.userId),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    totalAmount: raw.totalAmount,
    status: mapStatus(raw.status),
    items: raw.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase
    }))
  };
}
function useMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["orders", "mine"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        const result = await ((_a = actor.getMyOrders) == null ? void 0 : _a.call(actor));
        if (!result) return [];
        return result.map((o) => mapOrder(o));
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching
  });
}
function useAllOrders() {
  const { actor, isFetching } = useActor(createActor);
  const { isAdmin } = useAuth();
  return useQuery({
    queryKey: ["orders", "all"],
    queryFn: async () => {
      var _a;
      if (!actor) return [];
      try {
        const result = await ((_a = actor.getAllOrders) == null ? void 0 : _a.call(actor));
        if (!result) return [];
        return result.map((o) => mapOrder(o));
      } catch {
        return [];
      }
    },
    enabled: isAdmin && !isFetching
  });
}
function useCreateOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      var _a;
      if (!actor) throw new Error("Not connected");
      const raw = await ((_a = actor.createOrder) == null ? void 0 : _a.call(actor));
      if (!raw) throw new Error("Failed to create order");
      return mapOrder(raw);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      var _a;
      if (!actor) throw new Error("Not connected");
      const backendStatus = status;
      const raw = await ((_a = actor.updateOrderStatus) == null ? void 0 : _a.call(actor, id, backendStatus));
      if (!raw) return null;
      return mapOrder(raw);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
export {
  useMyOrders as a,
  useAllOrders as b,
  useUpdateOrderStatus as c,
  useCreateOrder as u
};
