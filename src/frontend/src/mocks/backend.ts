import type { backendInterface, Product, Order, Cart, DashboardStats, Review, UserProfile, StripeSessionStatus } from "../backend";
import { FragranceType, OrderStatus, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const makePrincipal = (id: string): Principal => id as unknown as Principal;

const sampleProducts: Product[] = [
  {
    id: BigInt(1),
    name: "Lumière Éternelle",
    description: "A captivating floral symphony with notes of Bulgarian rose, jasmine, and white peony, anchored by warm sandalwood and vanilla musk. An eternal classic for the modern woman.",
    price: BigInt(18500),
    fragranceType: FragranceType.floral,
    stock: BigInt(50),
    rating: 4.8,
    reviewCount: BigInt(124),
    image: {
      getBytes: async () => new Uint8Array(),
      getDirectURL: () => "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80",
      withUploadProgress: function() { return this; },
    } as any,
  },
  {
    id: BigInt(2),
    name: "Bois Mystérieux",
    description: "A sensuous woody fragrance opening with bergamot and cardamom, heart of cedar and vetiver, base of dark amber and oud.",
    price: BigInt(22000),
    fragranceType: FragranceType.woody,
    stock: BigInt(35),
    rating: 4.7,
    reviewCount: BigInt(98),
    image: {
      getBytes: async () => new Uint8Array(),
      getDirectURL: () => "https://images.unsplash.com/photo-1588514912908-aae3efbfa5c2?w=400&q=80",
      withUploadProgress: function() { return this; },
    } as any,
  },
  {
    id: BigInt(3),
    name: "Soir d'Orient",
    description: "An opulent oriental blend of saffron, rose absolute, and smoky incense resting on a base of benzoin, musk, and aged patchouli.",
    price: BigInt(24500),
    fragranceType: FragranceType.oriental,
    stock: BigInt(30),
    rating: 4.9,
    reviewCount: BigInt(67),
    image: {
      getBytes: async () => new Uint8Array(),
      getDirectURL: () => "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80",
      withUploadProgress: function() { return this; },
    } as any,
  },
  {
    id: BigInt(4),
    name: "Brise Marine",
    description: "An invigorating aquatic freshness: sea spray, white tea, and cool green mint meld with light driftwood and clean musks.",
    price: BigInt(14500),
    fragranceType: FragranceType.fresh,
    stock: BigInt(60),
    rating: 4.6,
    reviewCount: BigInt(152),
    image: {
      getBytes: async () => new Uint8Array(),
      getDirectURL: () => "https://images.unsplash.com/photo-1564824476378-8a91e06dac5e?w=400&q=80",
      withUploadProgress: function() { return this; },
    } as any,
  },
  {
    id: BigInt(5),
    name: "Soleil Citronné",
    description: "A radiant burst of Sicilian lemon, pink grapefruit, and neroli, softened by a heart of magnolia and a base of warm cedarwood.",
    price: BigInt(12800),
    fragranceType: FragranceType.citrus,
    stock: BigInt(45),
    rating: 4.5,
    reviewCount: BigInt(89),
    image: {
      getBytes: async () => new Uint8Array(),
      getDirectURL: () => "https://images.unsplash.com/photo-1599814516167-2f58f7b21b95?w=400&q=80",
      withUploadProgress: function() { return this; },
    } as any,
  },
  {
    id: BigInt(6),
    name: "Velours Gourmand",
    description: "A delectable gourmand experience: caramel praline and tonka bean intertwined with creamy vanilla, dark cocoa, and a whisper of smoked sandalwood.",
    price: BigInt(16900),
    fragranceType: FragranceType.gourmand,
    stock: BigInt(40),
    rating: 4.7,
    reviewCount: BigInt(113),
    image: {
      getBytes: async () => new Uint8Array(),
      getDirectURL: () => "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&q=80",
      withUploadProgress: function() { return this; },
    } as any,
  },
];

const sampleOrder: Order = {
  id: BigInt(1),
  userId: makePrincipal("sample-user"),
  status: OrderStatus.delivered,
  createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
  updatedAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000),
  totalAmount: BigInt(22000),
  items: [
    {
      productId: BigInt(2),
      productName: "Bois Mystérieux",
      quantity: BigInt(1),
      priceAtPurchase: BigInt(22000),
    },
  ],
};

const sampleCart: Cart = {
  userId: makePrincipal("sample-user"),
  items: [
    { productId: BigInt(1), quantity: BigInt(1) },
  ],
};

const sampleDashboardStats: DashboardStats = {
  totalProducts: BigInt(6),
  totalOrders: BigInt(142),
  totalRevenue: BigInt(2854200),
  lowStockAlerts: [sampleProducts[2], sampleProducts[4]],
};

const sampleReviews: Review[] = [
  {
    id: BigInt(1),
    userId: makePrincipal("user-1"),
    productId: BigInt(1),
    rating: BigInt(5),
    comment: "Absolutely divine. The rose and sandalwood combination is breathtaking. I receive compliments every time I wear it.",
    createdAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: BigInt(2),
    userId: makePrincipal("user-2"),
    productId: BigInt(1),
    rating: BigInt(5),
    comment: "A timeless fragrance that lasts all day. Worth every penny.",
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

const sampleUserProfile: UserProfile = {
  name: "Sophie Laurent",
  email: "sophie@example.com",
  joinDate: BigInt(Date.now() - 90 * 24 * 60 * 60 * 1000),
};

export const mockBackend = {
  getProducts: async () => sampleProducts,
  getProduct: async (id) => sampleProducts.find(p => p.id === id) ?? null,
  createProduct: async (input) => ({
    ...input,
    id: BigInt(Date.now()),
    rating: 0,
    reviewCount: BigInt(0),
  }),
  updateProduct: async (id, input) => {
    const existing = sampleProducts.find(p => p.id === id);
    if (!existing) return null;
    return { ...existing, ...input };
  },
  deleteProduct: async () => true,

  getCart: async () => sampleCart,
  addToCart: async () => undefined,
  removeFromCart: async () => undefined,
  updateCartQuantity: async () => undefined,
  clearCart: async () => undefined,

  createOrder: async () => sampleOrder,
  getMyOrders: async () => [sampleOrder],
  getAllOrders: async () => [sampleOrder],
  getOrder: async () => sampleOrder,
  updateOrderStatus: async (id, status) => ({ ...sampleOrder, id, status }),

  addReview: async (productId, rating, comment) => ({
    id: BigInt(Date.now()),
    userId: makePrincipal("current-user"),
    productId,
    rating,
    comment,
    createdAt: BigInt(Date.now()),
  }),
  getReviewsByProduct: async () => sampleReviews,

  getCallerUserProfile: async () => sampleUserProfile,
  getUserProfile: async () => sampleUserProfile,
  saveCallerUserProfile: async (name, email) => ({ name, email, joinDate: BigInt(Date.now()) }),
  updateUserProfile: async (name, email) => ({ name, email, joinDate: BigInt(Date.now()) }),

  getDashboardStats: async () => sampleDashboardStats,

  getCallerUserRole: async () => UserRole.user,
  isAdmin: async () => false,
  isCallerAdmin: async () => false,
  setAdminRole: async () => undefined,
  removeAdminRole: async () => undefined,
  assignCallerUserRole: async () => undefined,

  isStripeConfigured: async () => true,
  setStripeConfiguration: async () => undefined,
  createCheckoutSession: async () => "mock-session-id",
  getStripeSessionStatus: async (): Promise<StripeSessionStatus> => ({
    __kind__: "completed",
    completed: { userPrincipal: "mock-principal", response: "paid" },
  }),

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
} as unknown as backendInterface;
