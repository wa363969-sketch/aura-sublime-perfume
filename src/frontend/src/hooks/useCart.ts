import type { CartItem, Product } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: (products: Product[]) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { productId: product.id, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      totalPrice: (products) => {
        return get().items.reduce((sum, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return sum;
          const price = product.salePrice ?? product.price;
          return sum + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "aura-cart",
    },
  ),
);
