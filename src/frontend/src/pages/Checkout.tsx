import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import type { ShippingAddress } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  CreditCard,
  Lock,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type FormField = keyof ShippingAddress;

const INITIAL_FORM: ShippingAddress = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
};

const FIELD_LABELS: Record<FormField, string> = {
  fullName: "Full Name",
  addressLine1: "Address Line 1",
  addressLine2: "Address Line 2 (Optional)",
  city: "City",
  state: "State / Province",
  postalCode: "ZIP / Postal Code",
  country: "Country",
};

const REQUIRED_FIELDS: FormField[] = [
  "fullName",
  "addressLine1",
  "city",
  "state",
  "postalCode",
  "country",
];

export default function CheckoutPage() {
  const { isAuthenticated, login } = useAuth();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const { data: products = [] } = useProducts();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();

  const [form, setForm] = useState<ShippingAddress>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [stripeAvailable] = useState(false); // toggled when backend confirms Stripe config

  const subtotal = totalPrice(products);
  const shipping = subtotal >= 150 ? 0 : subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  const enrichedItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }));

  // ── Empty / auth guards ──────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-28 text-center flex flex-col items-center gap-8"
        data-ocid="checkout.empty_state"
      >
        <div className="h-28 w-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-primary/60" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground mb-3">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground font-body">
            Add some items before checking out.
          </p>
        </div>
        <Link to="/catalog">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth px-8"
            data-ocid="checkout.explore_button"
          >
            Explore Collection
          </Button>
        </Link>
      </motion.div>
    );
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-28 text-center flex flex-col items-center gap-8"
        data-ocid="checkout.auth_gate"
      >
        <div className="h-28 w-28 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Lock className="h-12 w-12 text-primary/60" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground mb-3">
            Sign in to continue
          </h1>
          <p className="text-muted-foreground font-body max-w-sm mx-auto leading-relaxed">
            Please sign in with Internet Identity to securely complete your
            purchase.
          </p>
        </div>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated px-10"
          onClick={login}
          data-ocid="checkout.login_button"
        >
          <Lock className="h-4 w-4 mr-2" />
          Sign In with Internet Identity
        </Button>
        <Link to="/cart">
          <Button
            variant="ghost"
            className="hover:text-accent transition-smooth"
            data-ocid="checkout.back_to_cart_button"
          >
            Back to Cart
          </Button>
        </Link>
      </motion.div>
    );
  }

  // ── Validation ───────────────────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: Partial<Record<FormField, string>> = {};
    for (const f of REQUIRED_FIELDS) {
      if (!form[f]?.trim()) {
        newErrors[f] =
          `${FIELD_LABELS[f].replace(" (Optional)", "")} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(field: FormField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handlePlaceOrder() {
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createOrder.mutateAsync();
      clearCart();
      navigate({ to: "/order-confirmation" });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  // ── Full checkout form ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Page header band */}
      <div className="bg-card border-b border-border/60 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link
              to="/cart"
              className="hover:text-accent transition-smooth"
              data-ocid="checkout.breadcrumb_cart"
            >
              Cart
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>
          <h1 className="font-display text-4xl text-foreground">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12" data-ocid="checkout.page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Left: shipping form + payment ─────────────────────────────── */}
          <div className="lg:col-span-3 space-y-8">
            {/* Shipping address */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border/60 rounded-xl p-7"
              data-ocid="checkout.shipping_section"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-display text-xl text-foreground">
                  Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full name — full width */}
                <div className="sm:col-span-2 space-y-1.5">
                  <Label
                    htmlFor="fullName"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.fullName}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Alexandra Beaumont"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={`bg-background border-input focus:border-accent transition-smooth ${errors.fullName ? "border-destructive" : ""}`}
                    data-ocid="checkout.full_name_input"
                  />
                  {errors.fullName && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.full_name_error"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Address line 1 — full width */}
                <div className="sm:col-span-2 space-y-1.5">
                  <Label
                    htmlFor="addressLine1"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.addressLine1}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="addressLine1"
                    placeholder="123 Maison de Luxe Avenue"
                    value={form.addressLine1}
                    onChange={(e) =>
                      handleChange("addressLine1", e.target.value)
                    }
                    className={`bg-background border-input focus:border-accent transition-smooth ${errors.addressLine1 ? "border-destructive" : ""}`}
                    data-ocid="checkout.address_line1_input"
                  />
                  {errors.addressLine1 && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.address_line1_error"
                    >
                      {errors.addressLine1}
                    </p>
                  )}
                </div>

                {/* Address line 2 — full width */}
                <div className="sm:col-span-2 space-y-1.5">
                  <Label
                    htmlFor="addressLine2"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.addressLine2}
                  </Label>
                  <Input
                    id="addressLine2"
                    placeholder="Apt 4B, Suite 100"
                    value={form.addressLine2}
                    onChange={(e) =>
                      handleChange("addressLine2", e.target.value)
                    }
                    className="bg-background border-input focus:border-accent transition-smooth"
                    data-ocid="checkout.address_line2_input"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="city"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.city}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className={`bg-background border-input focus:border-accent transition-smooth ${errors.city ? "border-destructive" : ""}`}
                    data-ocid="checkout.city_input"
                  />
                  {errors.city && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.city_error"
                    >
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="state"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.state}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className={`bg-background border-input focus:border-accent transition-smooth ${errors.state ? "border-destructive" : ""}`}
                    data-ocid="checkout.state_input"
                  />
                  {errors.state && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.state_error"
                    >
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Postal code */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="postalCode"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.postalCode}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="postalCode"
                    placeholder="10001"
                    value={form.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    className={`bg-background border-input focus:border-accent transition-smooth ${errors.postalCode ? "border-destructive" : ""}`}
                    data-ocid="checkout.postal_code_input"
                  />
                  {errors.postalCode && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.postal_code_error"
                    >
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="country"
                    className="text-sm text-foreground font-body"
                  >
                    {FIELD_LABELS.country}{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className={`bg-background border-input focus:border-accent transition-smooth ${errors.country ? "border-destructive" : ""}`}
                    data-ocid="checkout.country_input"
                  />
                  {errors.country && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="checkout.country_error"
                    >
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Payment section */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card border border-border/60 rounded-xl p-7"
              data-ocid="checkout.payment_section"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-display text-xl text-foreground">
                  Payment
                </h2>
                <Lock className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                <span className="text-xs text-muted-foreground">
                  Encrypted & Secure
                </span>
              </div>

              {stripeAvailable ? (
                /* Stripe active */
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated h-14 text-base"
                  onClick={handlePlaceOrder}
                  disabled={createOrder.isPending}
                  data-ocid="checkout.stripe_pay_button"
                >
                  {createOrder.isPending ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"
                        data-ocid="checkout.loading_state"
                      />
                      Processing…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay with Stripe — ${total.toFixed(2)}
                    </span>
                  )}
                </Button>
              ) : (
                /* Stripe not configured — placeholder form */
                <div
                  className="space-y-5"
                  data-ocid="checkout.placeholder_payment"
                >
                  <div className="rounded-lg bg-muted/40 border border-border/60 p-4 flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        Demo payment mode
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        Stripe payment integration is not yet configured. Click
                        "Place Order" below to simulate a successful order.
                      </p>
                    </div>
                  </div>

                  {/* Card number placeholder */}
                  <div className="space-y-1.5">
                    <Label className="text-sm text-foreground font-body">
                      Card Number
                    </Label>
                    <Input
                      placeholder="4242 4242 4242 4242"
                      disabled
                      className="bg-background border-input opacity-50"
                      data-ocid="checkout.card_number_input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm text-foreground font-body">
                        Expiry
                      </Label>
                      <Input
                        placeholder="MM / YY"
                        disabled
                        className="bg-background border-input opacity-50"
                        data-ocid="checkout.card_expiry_input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm text-foreground font-body">
                        CVC
                      </Label>
                      <Input
                        placeholder="•••"
                        disabled
                        className="bg-background border-input opacity-50"
                        data-ocid="checkout.card_cvc_input"
                      />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated h-14 text-base mt-2"
                    onClick={handlePlaceOrder}
                    disabled={createOrder.isPending}
                    data-ocid="checkout.pay_now_button"
                  >
                    {createOrder.isPending ? (
                      <span className="flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin"
                          data-ocid="checkout.loading_state"
                        />
                        Placing Order…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Place Order — ${total.toFixed(2)}
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {createOrder.isError && (
                <p
                  className="text-sm text-destructive mt-3 text-center"
                  data-ocid="checkout.error_state"
                >
                  Order failed. Please try again.
                </p>
              )}
            </motion.section>
          </div>

          {/* ── Right: order summary ───────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
            data-ocid="checkout.order_summary"
          >
            <div className="bg-card border border-border/60 rounded-xl p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-5">
                <Package className="h-5 w-5 text-accent" />
                <h2 className="font-display text-xl text-foreground">
                  Order Summary
                </h2>
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs border border-border/40"
                >
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </Badge>
              </div>

              {/* Item list */}
              <div className="space-y-3 mb-5" data-ocid="checkout.items_list">
                {enrichedItems.map((item, i) => {
                  if (!item.product) return null;
                  const price = item.product.salePrice ?? item.product.price;
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-3 items-center"
                      data-ocid={`checkout.summary_item.${i + 1}`}
                    >
                      <div className="h-14 w-11 rounded-md overflow-hidden bg-muted/40 border border-border/40 shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/images/placeholder.svg";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.volume} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm text-foreground font-medium tabular-nums shrink-0">
                        ${(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Separator className="bg-border/60 mb-4" />

              {/* Pricing breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span
                    className={
                      shipping === 0 && subtotal > 0
                        ? "text-accent font-medium"
                        : "text-foreground tabular-nums"
                    }
                  >
                    {subtotal === 0
                      ? "—"
                      : shipping === 0
                        ? "Free"
                        : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Separator className="bg-border/60 my-4" />

              <div className="flex justify-between">
                <span className="font-display text-lg text-foreground">
                  Total
                </span>
                <span className="font-display text-2xl text-foreground tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Delivery estimate */}
              <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border/40 flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-accent shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Estimated delivery in{" "}
                  <span className="text-foreground font-medium">
                    5–7 business days
                  </span>
                  . Luxury gift packaging included.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
