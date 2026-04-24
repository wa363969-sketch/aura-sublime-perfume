import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useMyOrders } from "@/hooks/useOrders";
import { useProfile, useSaveProfile } from "@/hooks/useProfile";
import type { Order, OrderStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit2,
  Lock,
  Package,
  Save,
  ShoppingBag,
  Truck,
  User,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Status Config ────────────────────────────────────────────────────────────

type StatusMeta = {
  label: string;
  oklchColor: string;
  icon: React.ElementType;
};

const STATUS_CONFIG: Record<OrderStatus, StatusMeta> = {
  pending: {
    label: "Pending",
    oklchColor: "oklch(0.72 0.17 70)",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    oklchColor: "oklch(0.70 0.15 220)",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    oklchColor: "oklch(0.70 0.15 220)",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    oklchColor: "oklch(0.68 0.16 295)",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    oklchColor: "oklch(0.65 0.15 160)",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    oklchColor: "oklch(0.52 0.18 15)",
    icon: XCircle,
  },
};

const TIMELINE_STEPS: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];

function getStatusConfig(status: OrderStatus): StatusMeta {
  return (
    STATUS_CONFIG[status] ?? {
      label: String(status),
      oklchColor: "oklch(0.55 0.02 240)",
      icon: Package,
    }
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = getStatusConfig(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded-full border capitalize"
      style={{
        color: cfg.oklchColor,
        backgroundColor: `color-mix(in oklch, ${cfg.oklchColor} 12%, transparent)`,
        borderColor: `color-mix(in oklch, ${cfg.oklchColor} 30%, transparent)`,
      }}
    >
      <cfg.icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

// ─── Order Timeline ───────────────────────────────────────────────────────────

function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div
        className="flex items-center gap-2 text-sm font-body"
        style={{ color: "oklch(0.52 0.18 15)" }}
      >
        <XCircle className="h-4 w-4" />
        <span>This order was cancelled.</span>
      </div>
    );
  }

  const currentIdx = TIMELINE_STEPS.indexOf(status);

  return (
    <div className="relative flex items-start gap-0">
      {TIMELINE_STEPS.map((step, idx) => {
        const cfg = getStatusConfig(step);
        const isCompleted = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        return (
          <div key={step} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={`h-1 flex-1 transition-all duration-500 ${idx === 0 ? "invisible" : isCompleted ? "bg-accent/60" : "bg-border/50"}`}
              />
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? isCurrent
                      ? "bg-accent border-accent text-accent-foreground shadow-[0_0_12px_2px_oklch(var(--accent)/0.4)]"
                      : "bg-accent/30 border-accent/60 text-accent"
                    : "bg-muted/40 border-border/50 text-muted-foreground/40"
                }`}
              >
                <cfg.icon className="h-3.5 w-3.5" />
              </div>
              <div
                className={`h-1 flex-1 transition-all duration-500 ${idx === TIMELINE_STEPS.length - 1 ? "invisible" : isCompleted && idx < currentIdx ? "bg-accent/60" : "bg-border/50"}`}
              />
            </div>
            <span
              className={`text-[10px] mt-2 text-center leading-tight font-body ${isCompleted ? (isCurrent ? "text-accent" : "text-muted-foreground") : "text-muted-foreground/40"}`}
            >
              {cfg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────

function OrderDetailModal({
  order,
  open,
  onClose,
}: {
  order: Order;
  open: boolean;
  onClose: () => void;
}) {
  const date = new Date(Number(order.createdAt) / 1_000_000);
  const total = Number(order.totalAmount) / 100;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg bg-card border-border/60 text-foreground"
        data-ocid="account.order_detail.dialog"
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="font-display text-xl text-foreground flex items-start justify-between">
            <div>
              <span className="text-xs tracking-[0.25em] text-accent uppercase font-body block mb-1">
                Order Detail
              </span>
              #{String(order.id).padStart(6, "0")}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground font-body">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <StatusBadge status={order.status} />
        </div>

        {/* Timeline */}
        <div className="mb-6 px-1">
          <OrderTimeline status={order.status} />
        </div>

        <Separator className="bg-border/40 mb-4" />

        {/* Items */}
        <div className="mb-4">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-body mb-3">
            Items
          </p>
          <div className="flex flex-col gap-3">
            {order.items.map((item, i) => (
              <div
                key={`${String(item.productId)}-${i}`}
                className="flex items-center justify-between gap-3"
                data-ocid={`account.order_detail.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-muted/60 flex items-center justify-center shrink-0">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-body text-foreground truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty {String(item.quantity)}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-display text-foreground shrink-0">
                  ${(Number(item.priceAtPurchase) / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/40 mb-4" />

        {/* Shipping Address */}
        <div className="mb-4">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase font-body mb-2">
            Shipping Address
          </p>
          <div className="text-sm font-body text-muted-foreground space-y-0.5">
            {order.status === "pending" || order.status === "confirmed" ? (
              <p className="italic text-muted-foreground/60">
                Address will be confirmed after payment.
              </p>
            ) : (
              <p className="text-foreground/80">
                Processed & dispatched from our warehouse.
              </p>
            )}
          </div>
        </div>

        <Separator className="bg-border/40 mb-4" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-display text-sm text-muted-foreground">
            Order Total
          </span>
          <span className="font-display text-xl text-foreground">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 pt-2">
          <Button
            variant="outline"
            className="w-full border-border/60 hover:border-accent/60 transition-smooth"
            onClick={onClose}
            data-ocid="account.order_detail.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Profile Section ──────────────────────────────────────────────────────────

function ProfileSection() {
  const { data: profile, isLoading } = useProfile();
  const { mutateAsync: saveProfile, isPending } = useSaveProfile();
  const { principal } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setEmail(profile.email ?? "");
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await saveProfile({ name, email });
      setEditing(false);
      toast.success("Profile saved successfully");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  return (
    <section className="mb-10" data-ocid="account.profile_section">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-2xl text-foreground">Profile</h2>
        {!editing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
            className="text-muted-foreground hover:text-accent transition-smooth gap-1.5"
            data-ocid="account.profile.edit_button"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </Button>
        )}
      </div>

      <div className="bg-card border border-border/60 rounded-xl p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : editing ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-name"
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body"
              >
                Full Name
              </Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-background border-border/60 focus:border-accent/60 transition-smooth"
                data-ocid="account.profile.name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-email"
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body"
              >
                Email Address
              </Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-background border-border/60 focus:border-accent/60 transition-smooth"
                data-ocid="account.profile.email_input"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <Button
                onClick={handleSave}
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-1.5"
                data-ocid="account.profile.save_button"
              >
                <Save className="h-3.5 w-3.5" />
                {isPending ? "Saving…" : "Save Changes"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  if (profile) {
                    setName(profile.name);
                    setEmail(profile.email);
                  }
                }}
                className="text-muted-foreground hover:text-foreground transition-smooth"
                data-ocid="account.profile.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1">
                Full Name
              </p>
              <p className="text-foreground font-body">
                {profile?.name || (
                  <span className="text-muted-foreground/60 italic">
                    Not set
                  </span>
                )}
              </p>
            </div>
            <Separator className="bg-border/40" />
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1">
                Email Address
              </p>
              <p className="text-foreground font-body">
                {profile?.email || (
                  <span className="text-muted-foreground/60 italic">
                    Not set
                  </span>
                )}
              </p>
            </div>
            {principal && (
              <>
                <Separator className="bg-border/40" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body mb-1">
                    Principal ID
                  </p>
                  <p className="text-xs text-muted-foreground font-mono break-all">
                    {principal}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Orders Section ───────────────────────────────────────────────────────────

function OrdersSection() {
  const { data: orders, isLoading } = useMyOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <section data-ocid="account.orders_section">
      <h2 className="font-display text-2xl text-foreground mb-5">
        Order History
      </h2>

      {isLoading ? (
        <div
          className="flex flex-col gap-4"
          data-ocid="account.orders_loading_state"
        >
          {["o1", "o2", "o3"].map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="flex flex-col gap-3" data-ocid="account.orders_list">
          {orders.map((order, i) => {
            const date = new Date(Number(order.createdAt) / 1_000_000);
            const total = Number(order.totalAmount) / 100;
            return (
              <motion.div
                key={String(order.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group bg-card border border-border/60 rounded-xl p-5 hover:border-accent/30 transition-smooth cursor-pointer"
                onClick={() => setSelectedOrder(order)}
                data-ocid={`account.order.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <p className="font-display text-sm text-foreground">
                        Order #{String(order.id).padStart(6, "0")}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground font-body">
                      {date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {order.items.slice(0, 3).map((item) => (
                        <span
                          key={String(item.productId)}
                          className="text-xs text-muted-foreground/70 font-body"
                        >
                          {item.productName} ×{String(item.quantity)}
                        </span>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-xs text-muted-foreground/50 font-body">
                          +{order.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-display text-lg text-foreground">
                      ${total.toFixed(2)}
                    </span>
                    <StatusBadge status={order.status} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-accent transition-smooth" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div
          className="text-center py-16 bg-card border border-border/60 rounded-xl"
          data-ocid="account.orders_empty_state"
        >
          <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-display text-xl text-foreground mb-2">
            No orders yet
          </p>
          <p className="text-muted-foreground font-body text-sm mb-6 max-w-xs mx-auto">
            Discover our exclusive collection and place your first order.
          </p>
          <Link to="/catalog">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
              data-ocid="account.shop_now_button"
            >
              Explore Collection
            </Button>
          </Link>
        </div>
      )}

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            open={true}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Login Gate ───────────────────────────────────────────────────────────────

function LoginGate() {
  const { login } = useAuth();
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4"
      data-ocid="account.auth_gate"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 rounded-full bg-muted/60 border border-border/60 flex items-center justify-center mx-auto mb-6">
          <Lock className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-xs tracking-[0.3em] text-accent uppercase font-body mb-2">
          Account Access
        </p>
        <h1 className="font-display text-3xl text-foreground mb-3">
          My Account
        </h1>
        <p className="text-muted-foreground font-body text-sm mb-8 leading-relaxed">
          Sign in with Internet Identity to manage your profile, view your order
          history, and track your deliveries.
        </p>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated w-full gap-2"
          onClick={login}
          data-ocid="account.login_button"
        >
          <User className="h-4 w-4" />
          Sign In with Internet Identity
        </Button>
        <p className="text-xs text-muted-foreground/50 font-body mt-4">
          Secure, passwordless authentication on the Internet Computer.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Account Page ─────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { isAuthenticated, logout, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginGate />;
  }

  return (
    <div
      className="container mx-auto px-4 py-12 max-w-2xl"
      data-ocid="account.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <p className="text-xs tracking-[0.3em] text-accent uppercase font-body">
            My Account
          </p>
          <h1 className="font-display text-4xl text-foreground mt-1">
            Welcome Back
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="hover:text-destructive hover:border-destructive/60 transition-smooth gap-1.5 mt-1"
          data-ocid="account.logout_button"
        >
          <X className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </motion.div>

      <Separator className="bg-border/50 mb-8" />

      {/* Profile */}
      <ProfileSection />

      <Separator className="bg-border/50 mb-8" />

      {/* Orders */}
      <OrdersSection />
    </div>
  );
}
