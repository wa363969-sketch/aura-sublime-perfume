import type {
  Review as BackendReview,
  UserProfile as BackendUserProfile,
  CartEntry,
} from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import {
  useAddProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/useProducts";
import {
  useAllUsers,
  useDeleteUserProfile,
  useUpdateAdminUserProfile,
} from "@/hooks/useProfile";
import {
  useAllCarts,
  useAllReviews,
  useDeleteReview,
} from "@/hooks/useReviews";
import type {
  AddProductInput,
  Order,
  OrderStatus,
  Product,
  ProductCategory,
} from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  Database,
  Edit2,
  Filter,
  Lock,
  Package,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-muted text-muted-foreground border-border",
  confirmed: "bg-accent/15 text-accent border-accent/30",
  processing: "bg-accent/15 text-accent border-accent/30",
  shipped: "bg-primary/15 text-primary-foreground border-primary/30",
  delivered: "bg-accent/20 text-accent border-accent/40",
  cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

const FRAGRANCE_TYPES: ProductCategory[] = [
  "floral",
  "woody",
  "oriental",
  "fresh",
  "citrus",
  "aquatic",
];

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const EMPTY_PRODUCT_FORM: AddProductInput = {
  name: "",
  brand: "Aura Sublime",
  description: "",
  price: 0,
  imageUrl: "",
  category: "oriental",
  volume: "100ml",
  notes: [],
  inStock: true,
  featured: false,
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

function truncatePrincipal(id: string): string {
  return id.length > 20 ? `${id.slice(0, 10)}…${id.slice(-6)}` : id;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TableSearch({
  value,
  onChange,
  placeholder,
  ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  ocid: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 h-9 text-sm border-border bg-background"
        data-ocid={ocid}
      />
    </div>
  );
}

function RecordCount({ count, noun }: { count: number; noun: string }) {
  return (
    <Badge
      variant="outline"
      className="text-muted-foreground border-border font-body text-xs tabular-nums"
    >
      {count} {noun}
      {count !== 1 ? "s" : ""}
    </Badge>
  );
}

function EmptyState({
  icon: Icon,
  message,
  ocid,
}: { icon: React.ElementType; message: string; ocid: string }) {
  return (
    <div
      className="text-center py-16 bg-card border border-border/60 rounded-xl"
      data-ocid={ocid}
    >
      <Icon className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
      <p className="text-muted-foreground font-body text-sm">{message}</p>
    </div>
  );
}

function SkeletonRows({ n }: { n: number }) {
  return (
    <div className="flex flex-col gap-3">
      {["a", "b", "c", "d", "e", "f", "g", "h"].slice(0, n).map((id) => (
        <Skeleton key={id} className="h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

function ConfirmDeleteDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  loading,
  ocid,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
  ocid: string;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent
        className="max-w-sm bg-card border-border"
        data-ocid={`${ocid}.dialog`}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground font-body text-sm">{description}</p>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            data-ocid={`${ocid}.cancel_button`}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={loading}
            data-ocid={`${ocid}.confirm_button`}
          >
            {loading ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  ocid,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  loading?: boolean;
  ocid: string;
}) {
  return (
    <div
      className="bg-card border border-border/60 rounded-xl p-6 flex flex-col gap-3"
      data-ocid={ocid}
    >
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-accent/10">
          <Icon className="h-4 w-4 text-accent" />
        </div>
        <span className="text-xs tracking-widest text-muted-foreground uppercase font-body">
          {label}
        </span>
      </div>
      {loading ? (
        <Skeleton className="h-9 w-24" />
      ) : (
        <p className="font-display text-4xl text-foreground">{value}</p>
      )}
    </div>
  );
}

// ─── Product Form ─────────────────────────────────────────────────────────────

function ProductForm({
  initial,
  onSubmit,
  onCancel,
  loading,
  mode,
}: {
  initial: AddProductInput;
  onSubmit: (data: AddProductInput) => void;
  onCancel: () => void;
  loading: boolean;
  mode: "add" | "edit";
}) {
  const [form, setForm] = useState<AddProductInput>(initial);
  const [notesRaw, setNotesRaw] = useState(initial.notes.join(", "));

  const set = (key: keyof AddProductInput, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.price <= 0) {
      toast.error("Name and a valid price are required.");
      return;
    }
    onSubmit({
      ...form,
      notes: notesRaw
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-name">Name</Label>
          <Input
            id="pf-name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Midnight Oud"
            required
            data-ocid="product_form.name_input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-brand">Brand</Label>
          <Input
            id="pf-brand"
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            placeholder="Aura Sublime"
            data-ocid="product_form.brand_input"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-desc">Description</Label>
        <Textarea
          id="pf-desc"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe the fragrance…"
          rows={3}
          data-ocid="product_form.description_textarea"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-price">Price ($)</Label>
          <Input
            id="pf-price"
            type="number"
            min={0}
            step={0.01}
            value={form.price}
            onChange={(e) =>
              set("price", Number.parseFloat(e.target.value) || 0)
            }
            data-ocid="product_form.price_input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="pf-volume">Volume</Label>
          <Input
            id="pf-volume"
            value={form.volume}
            onChange={(e) => set("volume", e.target.value)}
            placeholder="100ml"
            data-ocid="product_form.volume_input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Fragrance Type</Label>
          <Select
            value={form.category}
            onValueChange={(v) => set("category", v as ProductCategory)}
          >
            <SelectTrigger data-ocid="product_form.category_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FRAGRANCE_TYPES.map((t) => (
                <SelectItem key={t} value={t} className="capitalize">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>In Stock</Label>
          <Select
            value={form.inStock ? "yes" : "no"}
            onValueChange={(v) => set("inStock", v === "yes")}
          >
            <SelectTrigger data-ocid="product_form.instock_select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-notes">Fragrance Notes (comma-separated)</Label>
        <Input
          id="pf-notes"
          value={notesRaw}
          onChange={(e) => setNotesRaw(e.target.value)}
          placeholder="e.g. Rose, Oud, Amber"
          data-ocid="product_form.notes_input"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pf-image">Image URL</Label>
        <Input
          id="pf-image"
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://… or /assets/generated/…"
          data-ocid="product_form.image_input"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="product_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
          data-ocid="product_form.submit_button"
        >
          {loading
            ? "Saving…"
            : mode === "add"
              ? "Add Product"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

function DashboardTab({
  products,
  orders,
  loading,
}: {
  products: Product[];
  orders: Order[];
  loading: boolean;
}) {
  const totalRevenue = orders.reduce(
    (s, o) => s + Number(o.totalAmount) / 100,
    0,
  );
  const lowStock = products.filter((p) => !p.inStock).length;
  const recentOrders = [...orders]
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-10">
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        data-ocid="admin.stats_section"
      >
        <StatCard
          icon={ShoppingBag}
          label="Products"
          value={products.length}
          loading={loading}
          ocid="admin.products_stat"
        />
        <StatCard
          icon={Package}
          label="Orders"
          value={orders.length}
          loading={loading}
          ocid="admin.orders_stat"
        />
        <StatCard
          icon={BarChart3}
          label="Revenue"
          value={`$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          loading={loading}
          ocid="admin.revenue_stat"
        />
        <StatCard
          icon={AlertTriangle}
          label="Low / Out of Stock"
          value={lowStock}
          loading={loading}
          ocid="admin.low_stock_stat"
        />
      </div>

      <Separator className="bg-border/60" />

      <section data-ocid="admin.recent_orders_section">
        <div className="flex items-center gap-3 mb-5">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h2 className="font-display text-xl text-foreground">
            Recent Orders
          </h2>
          <Badge
            variant="outline"
            className="text-muted-foreground border-border font-body text-xs"
          >
            Last 5
          </Badge>
        </div>

        {loading ? (
          <SkeletonRows n={3} />
        ) : recentOrders.length === 0 ? (
          <EmptyState
            icon={Package}
            message="No orders yet."
            ocid="admin.recent_orders_empty_state"
          />
        ) : (
          <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr
                    key={order.id}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.recent_order.item.${i + 1}`}
                  >
                    <td className="px-5 py-4 font-mono text-xs text-foreground">
                      #{String(order.id).slice(-8).toUpperCase()}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground font-body hidden sm:table-cell">
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        className={`capitalize text-xs border ${STATUS_COLORS[order.status]}`}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right font-display text-foreground">
                      ${(Number(order.totalAmount) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

function ProductsTab({
  products,
  loading,
}: { products: Product[]; loading: boolean }) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleAdd = async (data: AddProductInput) => {
    try {
      await addProduct.mutateAsync(data);
      toast.success("Product added successfully.");
      setShowAdd(false);
    } catch {
      toast.error("Failed to add product.");
    }
  };

  const handleEdit = async (data: AddProductInput) => {
    if (!editTarget) return;
    try {
      await updateProduct.mutateAsync({ id: editTarget.id, input: data });
      toast.success("Product updated.");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success("Product deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">
          Product Catalog
        </h2>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth gap-2"
          onClick={() => setShowAdd(true)}
          data-ocid="admin.add_product_button"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent
          className="max-w-2xl bg-card border-border"
          data-ocid="admin.add_product_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Add New Product
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            initial={EMPTY_PRODUCT_FORM}
            onSubmit={handleAdd}
            onCancel={() => setShowAdd(false)}
            loading={addProduct.isPending}
            mode="add"
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editTarget}
        onOpenChange={(v) => !v && setEditTarget(null)}
      >
        <DialogContent
          className="max-w-2xl bg-card border-border"
          data-ocid="admin.edit_product_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Edit Product
            </DialogTitle>
          </DialogHeader>
          {editTarget && (
            <ProductForm
              initial={{
                name: editTarget.name,
                brand: editTarget.brand,
                description: editTarget.description,
                price: editTarget.price,
                imageUrl: editTarget.imageUrl,
                category: editTarget.category,
                volume: editTarget.volume,
                notes: editTarget.notes,
                inStock: editTarget.inStock,
                featured: editTarget.featured,
              }}
              onSubmit={handleEdit}
              onCancel={() => setEditTarget(null)}
              loading={updateProduct.isPending}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteProduct.isPending}
        ocid="admin.delete_product"
      />

      {loading ? (
        <SkeletonRows n={4} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          message="No products yet. Add your first product above."
          ocid="admin.products_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="admin.products_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Fragrance
                  </th>
                  <th className="text-right px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-right px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product.id}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.product.item.${i + 1}`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-10 w-8 object-cover rounded-md shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-display text-sm text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-body">
                            {product.volume}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className="capitalize text-xs border-border text-muted-foreground font-body"
                      >
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right font-display text-foreground tabular-nums">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      {product.inStock ? (
                        <Badge className="bg-accent/15 text-accent border border-accent/30 text-xs font-body">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/15 text-destructive border border-destructive/30 text-xs font-body">
                          Out of Stock
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-accent/10 hover:text-accent transition-smooth"
                          onClick={() => setEditTarget(product)}
                          data-ocid={`admin.product.edit_button.${i + 1}`}
                          aria-label={`Edit ${product.name}`}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-smooth"
                          onClick={() => setDeleteTarget(product)}
                          data-ocid={`admin.product.delete_button.${i + 1}`}
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

function OrdersTab({ orders, loading }: { orders: Order[]; loading: boolean }) {
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      toast.success("Order status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-xl text-foreground">All Orders</h2>

      {loading ? (
        <SkeletonRows n={5} />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={Package}
          message="No orders yet."
          ocid="admin.orders_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="admin.orders_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr
                    key={String(order.id)}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.order.item.${i + 1}`}
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-mono text-xs text-foreground">
                          #{String(order.id).slice(-10).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="font-mono text-xs text-muted-foreground">
                        {truncatePrincipal(order.userId)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground font-body hidden sm:table-cell">
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <Select
                        value={order.status}
                        onValueChange={(v) =>
                          handleStatusChange(order.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger
                          className="h-7 text-xs w-[130px] border-border"
                          data-ocid={`admin.order.status_select.${i + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_STATUSES.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="capitalize text-xs"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-5 py-4 text-right font-display text-foreground tabular-nums">
                      ${(Number(order.totalAmount) / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Database: Products sub-section ──────────────────────────────────────────

function DbProductsSection({
  products,
  loading,
}: { products: Product[]; loading: boolean }) {
  const [search, setSearch] = useState("");
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          search === "" ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const handleEdit = async (data: AddProductInput) => {
    if (!editTarget) return;
    try {
      await updateProduct.mutateAsync({ id: editTarget.id, input: data });
      toast.success("Product updated.");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success("Product deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <RecordCount count={products.length} noun="product" />
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by name, brand, type…"
          ocid="db.products.search_input"
        />
      </div>

      <Dialog
        open={!!editTarget}
        onOpenChange={(v) => !v && setEditTarget(null)}
      >
        <DialogContent
          className="max-w-2xl bg-card border-border"
          data-ocid="db.products.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Edit Product
            </DialogTitle>
          </DialogHeader>
          {editTarget && (
            <ProductForm
              initial={{
                name: editTarget.name,
                brand: editTarget.brand,
                description: editTarget.description,
                price: editTarget.price,
                imageUrl: editTarget.imageUrl,
                category: editTarget.category,
                volume: editTarget.volume,
                notes: editTarget.notes,
                inStock: editTarget.inStock,
                featured: editTarget.featured,
              }}
              onSubmit={handleEdit}
              onCancel={() => setEditTarget(null)}
              loading={updateProduct.isPending}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Product"
        description={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteProduct.isPending}
        ocid="db.products.delete"
      />

      {loading ? (
        <SkeletonRows n={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          message={
            search
              ? "No products match your search."
              : "No products in database."
          }
          ocid="db.products_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="db.products_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`db.product.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {p.id}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-foreground">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                      {p.brand}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className="capitalize text-xs border-border text-muted-foreground"
                      >
                        {p.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-display tabular-nums text-foreground">
                      ${p.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      {p.inStock ? (
                        <Badge className="bg-accent/15 text-accent border border-accent/30 text-xs">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/15 text-destructive border border-destructive/30 text-xs">
                          Out
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {p.featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-accent/10 hover:text-accent"
                          onClick={() => setEditTarget(p)}
                          data-ocid={`db.product.edit_button.${i + 1}`}
                          aria-label="Edit"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setDeleteTarget(p)}
                          data-ocid={`db.product.delete_button.${i + 1}`}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Database: Orders sub-section ─────────────────────────────────────────────

function DbOrdersSection({
  orders,
  loading,
}: { orders: Order[]; loading: boolean }) {
  const [search, setSearch] = useState("");
  const [detailTarget, setDetailTarget] = useState<Order | null>(null);
  const updateStatus = useUpdateOrderStatus();

  const filtered = useMemo(
    () =>
      orders.filter(
        (o) =>
          search === "" ||
          String(o.id).includes(search) ||
          o.userId.toLowerCase().includes(search.toLowerCase()) ||
          o.status.toLowerCase().includes(search.toLowerCase()),
      ),
    [orders, search],
  );

  const handleStatusChange = async (orderId: bigint, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <RecordCount count={orders.length} noun="order" />
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by ID, user, status…"
          ocid="db.orders.search_input"
        />
      </div>

      {/* Order detail dialog */}
      <Dialog
        open={!!detailTarget}
        onOpenChange={(v) => !v && setDetailTarget(null)}
      >
        <DialogContent
          className="max-w-lg bg-card border-border"
          data-ocid="db.orders.detail_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Order #
              {String(detailTarget?.id ?? "")
                .slice(-10)
                .toUpperCase()}
            </DialogTitle>
          </DialogHeader>
          {detailTarget && (
            <div className="flex flex-col gap-4 mt-1">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                    User
                  </p>
                  <p className="font-mono text-xs text-foreground break-all">
                    {detailTarget.userId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                    Date
                  </p>
                  <p className="font-body text-sm text-foreground">
                    {formatDate(detailTarget.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <Badge
                    className={`capitalize text-xs border ${STATUS_COLORS[detailTarget.status]}`}
                  >
                    {detailTarget.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                    Total
                  </p>
                  <p className="font-display text-foreground">
                    ${(Number(detailTarget.totalAmount) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
              <Separator className="bg-border/60" />
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
                  Items ({detailTarget.items.length})
                </p>
                <div className="flex flex-col gap-2">
                  {detailTarget.items.map((item) => (
                    <div
                      key={String(item.productId)}
                      className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2"
                    >
                      <div>
                        <p className="font-body text-sm text-foreground">
                          {item.productName}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          ID: {String(item.productId)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-xs text-muted-foreground">
                          ×{String(item.quantity)}
                        </p>
                        <p className="font-display text-sm text-foreground">
                          ${(Number(item.priceAtPurchase) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <Button
                  variant="outline"
                  onClick={() => setDetailTarget(null)}
                  data-ocid="db.orders.detail.close_button"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {loading ? (
        <SkeletonRows n={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          message={
            search ? "No orders match your search." : "No orders in database."
          }
          ocid="db.orders_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="db.orders_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Items
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr
                    key={String(o.id)}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`db.order.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-foreground">
                      #{String(o.id).slice(-10).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(o.userId)}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {o.items.length}
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={o.status}
                        onValueChange={(v) =>
                          handleStatusChange(o.id, v as OrderStatus)
                        }
                      >
                        <SelectTrigger
                          className="h-7 text-xs w-[120px] border-border"
                          data-ocid={`db.order.status_select.${i + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_STATUSES.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="capitalize text-xs"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-right font-display tabular-nums text-foreground">
                      ${(Number(o.totalAmount) / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs hover:bg-accent/10 hover:text-accent"
                        onClick={() => setDetailTarget(o)}
                        data-ocid={`db.order.detail_button.${i + 1}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Database: Users sub-section ──────────────────────────────────────────────

function DbUsersSection() {
  const { data: users = [], isLoading } = useAllUsers();
  const deleteUser = useDeleteUserProfile();
  const updateUser = useUpdateAdminUserProfile();
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<{
    principalId: string;
    profile: BackendUserProfile;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    principalId: string;
    profile: BackendUserProfile;
  } | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          search === "" ||
          u.profile.name.toLowerCase().includes(search.toLowerCase()) ||
          u.profile.email.toLowerCase().includes(search.toLowerCase()) ||
          u.principalId.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  );

  const openEdit = (u: {
    principalId: string;
    profile: BackendUserProfile;
  }) => {
    setEditForm({ name: u.profile.name, email: u.profile.email });
    setEditTarget(u);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    try {
      await updateUser.mutateAsync({
        name: editForm.name,
        email: editForm.email,
      });
      toast.success("User profile updated.");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update user.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUser.mutateAsync(deleteTarget.principalId);
      toast.success("User profile deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <RecordCount count={users.length} noun="user" />
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by name, email, principal…"
          ocid="db.users.search_input"
        />
      </div>

      {/* Edit dialog */}
      <Dialog
        open={!!editTarget}
        onOpenChange={(v) => !v && setEditTarget(null)}
      >
        <DialogContent
          className="max-w-sm bg-card border-border"
          data-ocid="db.users.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Edit User
            </DialogTitle>
          </DialogHeader>
          {editTarget && (
            <form onSubmit={handleEdit} className="flex flex-col gap-4 mt-1">
              <div className="flex flex-col gap-1.5">
                <Label>Principal ID</Label>
                <p className="font-mono text-xs text-muted-foreground break-all bg-muted/30 rounded-lg px-3 py-2">
                  {editTarget.principalId}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="user-name">Name</Label>
                <Input
                  id="user-name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, name: e.target.value }))
                  }
                  data-ocid="db.users.edit.name_input"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, email: e.target.value }))
                  }
                  data-ocid="db.users.edit.email_input"
                />
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditTarget(null)}
                  data-ocid="db.users.edit.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateUser.isPending}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="db.users.edit.save_button"
                >
                  {updateUser.isPending ? "Saving…" : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete User Profile"
        description={`Delete profile for "${deleteTarget?.profile.name || deleteTarget?.principalId}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteUser.isPending}
        ocid="db.users.delete"
      />

      {isLoading ? (
        <SkeletonRows n={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          message={
            search
              ? "No users match your search."
              : "No user profiles in database."
          }
          ocid="db.users_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="db.users_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Principal ID
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr
                    key={u.principalId}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`db.user.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(u.principalId)}
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-foreground">
                      {u.profile.name || (
                        <span className="text-muted-foreground italic">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                      {u.profile.email || "—"}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                      {formatDate(u.profile.joinDate)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-accent/10 hover:text-accent"
                          onClick={() => openEdit(u)}
                          data-ocid={`db.user.edit_button.${i + 1}`}
                          aria-label="Edit user"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setDeleteTarget(u)}
                          data-ocid={`db.user.delete_button.${i + 1}`}
                          aria-label="Delete user"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Database: Reviews sub-section ────────────────────────────────────────────

function DbReviewsSection() {
  const { data: reviews = [], isLoading } = useAllReviews();
  const deleteReview = useDeleteReview();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<BackendReview | null>(null);

  const filtered = useMemo(
    () =>
      reviews.filter(
        (r) =>
          search === "" ||
          r.comment.toLowerCase().includes(search.toLowerCase()) ||
          String(r.productId).includes(search) ||
          r.userId.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    [reviews, search],
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteReview.mutateAsync(deleteTarget.id);
      toast.success("Review deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <RecordCount count={reviews.length} noun="review" />
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by comment, product ID, user…"
          ocid="db.reviews.search_input"
        />
      </div>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        title="Delete Review"
        description="Delete this review permanently? This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteReview.isPending}
        ocid="db.reviews.delete"
      />

      {isLoading ? (
        <SkeletonRows n={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Star}
          message={
            search ? "No reviews match your search." : "No reviews in database."
          }
          ocid="db.reviews_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="db.reviews_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr
                    key={String(r.id)}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`db.review.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {String(r.id)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {String(r.productId)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(r.userId.toString())}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-accent fill-accent" />
                        <span className="font-body text-xs text-foreground">
                          {String(r.rating)}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[200px] truncate"
                      title={r.comment}
                    >
                      {r.comment}
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-muted-foreground">
                      {formatDate(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(r)}
                        data-ocid={`db.review.delete_button.${i + 1}`}
                        aria-label="Delete review"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Database: Carts sub-section ──────────────────────────────────────────────

function DbCartsSection() {
  const { data: carts = [], isLoading } = useAllCarts();
  const [search, setSearch] = useState("");
  const [detailTarget, setDetailTarget] = useState<CartEntry | null>(null);

  const filtered = useMemo(
    () =>
      carts.filter(
        (c) =>
          search === "" ||
          c.principalId.toLowerCase().includes(search.toLowerCase()),
      ),
    [carts, search],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <RecordCount count={carts.length} noun="cart" />
        <TableSearch
          value={search}
          onChange={setSearch}
          placeholder="Search by principal ID…"
          ocid="db.carts.search_input"
        />
      </div>

      {/* Cart detail dialog */}
      <Dialog
        open={!!detailTarget}
        onOpenChange={(v) => !v && setDetailTarget(null)}
      >
        <DialogContent
          className="max-w-sm bg-card border-border"
          data-ocid="db.carts.detail_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              Cart Details
            </DialogTitle>
          </DialogHeader>
          {detailTarget && (
            <div className="flex flex-col gap-4 mt-1">
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                  Principal ID
                </p>
                <p className="font-mono text-xs text-foreground break-all bg-muted/30 rounded-lg px-3 py-2">
                  {detailTarget.principalId}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
                  Items ({detailTarget.cart.items.length})
                </p>
                {detailTarget.cart.items.length === 0 ? (
                  <p className="text-muted-foreground text-sm font-body">
                    Empty cart.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {detailTarget.cart.items.map((item) => (
                      <div
                        key={String(item.productId)}
                        className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2"
                      >
                        <div>
                          <p className="text-xs text-muted-foreground font-body">
                            Product ID
                          </p>
                          <p className="font-mono text-xs text-foreground">
                            {String(item.productId)}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-border text-muted-foreground"
                        >
                          ×{String(item.quantity)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-1">
                <Button
                  variant="outline"
                  onClick={() => setDetailTarget(null)}
                  data-ocid="db.carts.detail.close_button"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <SkeletonRows n={4} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          message={
            search
              ? "No carts match your search."
              : "No active carts in database."
          }
          ocid="db.carts_empty_state"
        />
      ) : (
        <div
          className="bg-card border border-border/60 rounded-xl overflow-hidden"
          data-ocid="db.carts_table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-muted/40 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Principal ID
                  </th>
                  <th className="text-left px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Items
                  </th>
                  <th className="text-right px-4 py-3 font-body text-xs text-muted-foreground uppercase tracking-wider">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.principalId}
                    className="border-t border-border/40 hover:bg-muted/20 transition-colors"
                    data-ocid={`db.cart.item.${i + 1}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(c.principalId)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {truncatePrincipal(c.cart.userId.toString())}
                    </td>
                    <td className="px-4 py-3 text-right text-foreground font-body text-sm">
                      {c.cart.items.length}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs hover:bg-accent/10 hover:text-accent"
                        onClick={() => setDetailTarget(c)}
                        data-ocid={`db.cart.detail_button.${i + 1}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Database Tab ─────────────────────────────────────────────────────────────

const DB_SECTIONS = [
  { key: "products", label: "Products", icon: ShoppingBag },
  { key: "orders", label: "Orders", icon: Package },
  { key: "users", label: "Users", icon: Users },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "carts", label: "Carts", icon: ShoppingCart },
] as const;

type DbSection = (typeof DB_SECTIONS)[number]["key"];

function DatabaseTab({
  products,
  orders,
  productsLoading,
  ordersLoading,
}: {
  products: Product[];
  orders: Order[];
  productsLoading: boolean;
  ordersLoading: boolean;
}) {
  const [section, setSection] = useState<DbSection>("products");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Database className="h-5 w-5 text-accent" />
        <h2 className="font-display text-xl text-foreground">
          Database Explorer
        </h2>
      </div>

      {/* Section selector */}
      <div className="flex flex-wrap gap-2" data-ocid="db.section_tabs">
        {DB_SECTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSection(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body transition-smooth border ${
              section === key
                ? "bg-accent/15 text-accent border-accent/30"
                : "bg-card text-muted-foreground border-border/60 hover:bg-muted/40 hover:text-foreground"
            }`}
            data-ocid={`db.${key}_tab`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <Separator className="bg-border/60" />

      {section === "products" && (
        <DbProductsSection products={products} loading={productsLoading} />
      )}
      {section === "orders" && (
        <DbOrdersSection orders={orders} loading={ordersLoading} />
      )}
      {section === "users" && <DbUsersSection />}
      {section === "reviews" && <DbReviewsSection />}
      {section === "carts" && <DbCartsSection />}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const { isAuthenticated, isAdmin, login } = useAuth();
  const { data: orders = [], isLoading: ordersLoading } = useAllOrders();
  const { data: products = [], isLoading: productsLoading } = useProducts();

  if (!isAuthenticated) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6"
        data-ocid="admin.auth_gate"
      >
        <div className="p-5 rounded-2xl bg-card border border-border/60">
          <Lock className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Authentication Required
          </h1>
          <p className="text-muted-foreground font-body mt-2">
            Sign in to access the admin dashboard.
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-sm"
          onClick={login}
          data-ocid="admin.login_button"
        >
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6"
        data-ocid="admin.unauthorized"
      >
        <div className="p-5 rounded-2xl bg-destructive/10 border border-destructive/30">
          <Lock className="h-12 w-12 text-destructive/60" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground">
            Access Denied
          </h1>
          <p className="text-muted-foreground font-body mt-2">
            This area is restricted to administrators only.
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" data-ocid="admin.go_home_button">
            Return to Store
          </Button>
        </Link>
      </div>
    );
  }

  const isLoading = ordersLoading || productsLoading;

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      <div className="bg-card border-b border-border/60">
        <div className="container mx-auto px-4 py-8">
          <span className="text-xs tracking-[0.3em] text-accent uppercase font-body">
            Administration
          </span>
          <h1 className="font-display text-4xl text-foreground mt-1">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList
            className="bg-card border border-border/60 mb-8 h-auto p-1 gap-1 flex-wrap"
            data-ocid="admin.tabs"
          >
            <TabsTrigger
              value="dashboard"
              className="font-body text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-smooth"
              data-ocid="admin.dashboard_tab"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="font-body text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-smooth"
              data-ocid="admin.products_tab"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="font-body text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-smooth"
              data-ocid="admin.orders_tab"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="font-body text-sm px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-smooth gap-1.5"
              data-ocid="admin.database_tab"
            >
              <Database className="h-3.5 w-3.5" />
              Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab
              products={products}
              orders={orders}
              loading={isLoading}
            />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab products={products} loading={productsLoading} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab orders={orders} loading={ordersLoading} />
          </TabsContent>

          <TabsContent value="database">
            <DatabaseTab
              products={products}
              orders={orders}
              productsLoading={productsLoading}
              ordersLoading={ordersLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
