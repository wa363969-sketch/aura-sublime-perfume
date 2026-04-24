// ─── Core Domain Types ─────────────────────────────────────────────────────

export type ProductCategory =
  | "floral"
  | "woody"
  | "oriental"
  | "fresh"
  | "citrus"
  | "aquatic";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  category: ProductCategory;
  volume: string; // e.g. "50ml", "100ml"
  notes: string[]; // fragrance notes
  inStock: boolean;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: bigint;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: bigint;
  productName: string;
  priceAtPurchase: bigint;
  quantity: bigint;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: bigint;
  userId: string;
  items: OrderItem[];
  totalAmount: bigint;
  status: OrderStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  author: string;
  rating: number; // 1–5
  title: string;
  body: string;
  createdAt: bigint;
}

export interface UserProfile {
  principal: string;
  displayName: string;
  email: string;
  role: "customer" | "admin";
  createdAt: bigint;
}

// ─── Dashboard / Admin ──────────────────────────────────────────────────────

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
  topProducts: Array<{ product: Product; sold: number }>;
}

// ─── Stripe ─────────────────────────────────────────────────────────────────

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface StripeSessionStatus {
  status: "open" | "complete" | "expired";
  paymentStatus: "paid" | "unpaid" | "no_payment_required";
  orderId?: string;
}

// ─── Form helpers ────────────────────────────────────────────────────────────

export interface AddProductInput {
  name: string;
  brand: string;
  description: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  category: ProductCategory;
  volume: string;
  notes: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CreateOrderInput {
  items: CartItem[];
  shippingAddress: ShippingAddress;
}

export interface AddReviewInput {
  productId: string;
  rating: number;
  title: string;
  body: string;
}
