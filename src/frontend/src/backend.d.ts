import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    joinDate: Timestamp;
    name: string;
    email: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface OrderItem {
    productId: ProductId;
    productName: string;
    quantity: bigint;
    priceAtPurchase: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Cart {
    userId: Principal;
    items: Array<CartItem>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ReviewId = bigint;
export interface Review {
    id: ReviewId;
    userId: Principal;
    createdAt: Timestamp;
    productId: ProductId;
    comment: string;
    rating: bigint;
}
export interface ProductInput {
    name: string;
    description: string;
    stock: bigint;
    fragranceType: FragranceType;
    image: ExternalBlob;
    price: bigint;
}
export interface CartEntry {
    cart: Cart;
    principalId: string;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    userId: Principal;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalAmount: bigint;
    items: Array<OrderItem>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface DashboardStats {
    totalProducts: bigint;
    totalOrders: bigint;
    lowStockAlerts: Array<Product>;
    totalRevenue: bigint;
}
export interface UserEntry {
    principalId: string;
    profile: UserProfile;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export type ProductId = bigint;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    fragranceType: FragranceType;
    rating: number;
    image: ExternalBlob;
    price: bigint;
    reviewCount: bigint;
}
export type OrderId = bigint;
export enum FragranceType {
    fresh = "fresh",
    floral = "floral",
    citrus = "citrus",
    fougere = "fougere",
    oriental = "oriental",
    gourmand = "gourmand",
    chypre = "chypre",
    woody = "woody"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed",
    processing = "processing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addReview(productId: ProductId, rating: bigint, comment: string): Promise<Review>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(): Promise<Order>;
    createProduct(input: ProductInput): Promise<Product>;
    deleteProduct(id: ProductId): Promise<boolean>;
    deleteReview(reviewId: ReviewId): Promise<void>;
    deleteUserProfile(principalText: string): Promise<void>;
    getAllCarts(): Promise<Array<CartEntry>>;
    getAllOrders(): Promise<Array<Order>>;
    getAllReviews(): Promise<Array<Review>>;
    getAllUsers(): Promise<Array<UserEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Cart>;
    getDashboardStats(): Promise<DashboardStats>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getReviewsByProduct(productId: ProductId): Promise<Array<Review>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeAdminRole(user: Principal): Promise<void>;
    removeFromCart(productId: bigint): Promise<void>;
    saveCallerUserProfile(name: string, email: string): Promise<UserProfile>;
    setAdminRole(user: Principal): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartQuantity(productId: bigint, quantity: bigint): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<Order | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
    updateUserProfile(name: string, email: string): Promise<UserProfile | null>;
}
