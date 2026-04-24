import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Gift, Package, Sparkles, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Generate a deterministic order number seeded by timestamp floor to session
function generateOrderNumber(): string {
  const base = Math.floor(Date.now() / 1000);
  const suffix = (base % 1_000_000).toString().padStart(6, "0");
  return `AS-${suffix}`;
}

const ESTIMATED_DELIVERY = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
})();

const STEPS = [
  {
    icon: CheckCircle2,
    label: "Order Received",
    description: "We have your order",
    done: true,
  },
  {
    icon: Package,
    label: "Being Prepared",
    description: "Luxury gift packaging",
    done: false,
  },
  {
    icon: Truck,
    label: "On Its Way",
    description: "Tracked delivery",
    done: false,
  },
  {
    icon: Gift,
    label: "Delivered",
    description: `By ${ESTIMATED_DELIVERY}`,
    done: false,
  },
];

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(generateOrderNumber);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="order_confirmation.page"
    >
      {/* Decorative top band */}
      <div className="bg-card border-b border-border/60 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-body uppercase tracking-widest mb-2">
            Aura Sublime
          </p>
          <h1 className="font-display text-4xl text-foreground">
            Order Confirmed
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Hero success badge */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="flex flex-col items-center text-center mb-12"
          data-ocid="order_confirmation.success_state"
        >
          <div className="relative mb-6">
            <div className="h-28 w-28 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
              <CheckCircle2 className="h-14 w-14 text-accent" />
            </div>
            {showConfetti &&
              ([0, 1, 2, 3, 4, 5] as const).map((i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute h-2 w-2 rounded-full bg-accent/60"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i / 6) * Math.PI * 2) * 60,
                    y: Math.sin((i / 6) * Math.PI * 2) * 60,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                  style={{
                    top: "50%",
                    left: "50%",
                    marginTop: -4,
                    marginLeft: -4,
                  }}
                />
              ))}
          </div>

          <h2 className="font-display text-3xl text-foreground mb-3">
            Thank you for your order
          </h2>
          <p className="text-muted-foreground font-body max-w-sm leading-relaxed">
            Your fragrance is being carefully prepared with our signature luxury
            packaging and will be on its way soon.
          </p>
        </motion.div>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border/60 rounded-xl p-7 mb-6"
          data-ocid="order_confirmation.order_details"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Order Number
              </p>
              <p
                className="font-display text-2xl text-accent"
                data-ocid="order_confirmation.order_number"
              >
                {orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Estimated Delivery
              </p>
              <p
                className="font-body text-sm text-foreground font-medium leading-snug"
                data-ocid="order_confirmation.estimated_delivery"
              >
                {ESTIMATED_DELIVERY}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Order Date
              </p>
              <p className="font-body text-sm text-foreground">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Status
              </p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs text-accent font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Processing
              </span>
            </div>
          </div>
        </motion.div>

        {/* Order progress tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-card border border-border/60 rounded-xl p-7 mb-6"
          data-ocid="order_confirmation.progress_tracker"
        >
          <h3 className="font-display text-lg text-foreground mb-6">
            Your Order Journey
          </h3>
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-5 left-5 right-5 h-px bg-border/60" />
            <div
              className="absolute top-5 left-5 h-px bg-accent/60"
              style={{ width: "8%" }}
            />

            <div className="grid grid-cols-4 gap-2 relative">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <div
                      className={`h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        step.done
                          ? "bg-accent/15 border-accent text-accent"
                          : "bg-card border-border/60 text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p
                        className={`text-xs font-medium leading-tight ${step.done ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5 leading-tight hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* What to expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-muted/30 border border-border/40 rounded-xl p-6 mb-8"
          data-ocid="order_confirmation.expectations"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <h3 className="font-display text-base text-foreground">
              What to expect
            </h3>
          </div>
          <ul className="space-y-2.5">
            {[
              "A confirmation will appear in your account orders section.",
              "Each bottle is hand-wrapped in our signature dark velvet packaging.",
              "Your order will be dispatched within 2–3 business days.",
              "Tracked shipping with real-time updates via your account.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <span className="text-accent mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/account">
            <Button
              variant="outline"
              size="lg"
              className="hover:text-accent hover:border-accent transition-smooth min-w-44"
              data-ocid="order_confirmation.view_orders_button"
            >
              View My Orders
            </Button>
          </Link>
          <Link to="/catalog">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-elevated min-w-44"
              data-ocid="order_confirmation.continue_shopping_button"
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        {/* Branding footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-xs text-muted-foreground mt-12"
        >
          Thank you for choosing Aura Sublime — where every drop tells a story.
        </motion.p>
      </div>
    </div>
  );
}
