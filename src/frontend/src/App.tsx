import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─── Lazy pages ──────────────────────────────────────────────────────────────
const HomePage = lazy(() => import("@/pages/Home"));
const CatalogPage = lazy(() => import("@/pages/Catalog"));
const ProductPage = lazy(() => import("@/pages/Product"));
const CartPage = lazy(() => import("@/pages/Cart"));
const CheckoutPage = lazy(() => import("@/pages/Checkout"));
const OrderConfirmationPage = lazy(() => import("@/pages/OrderConfirmation"));
const AccountPage = lazy(() => import("@/pages/Account"));
const AdminPage = lazy(() => import("@/pages/Admin"));

// ─── Page fallback ───────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col gap-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full max-w-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
          <Skeleton key={k} className="h-72 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ─── Root route ──────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// ─── Routes ──────────────────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: CatalogPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: OrderConfirmationPage,
});

// Protected: redirect to home if not authenticated
const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  beforeLoad: () => {
    // Guard handled inside the page itself to avoid hook-outside-component
  },
  component: AccountPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => {
    // Guard handled inside the page itself
  },
  component: AdminPage,
});

// ─── Router ──────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  catalogRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  accountRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
