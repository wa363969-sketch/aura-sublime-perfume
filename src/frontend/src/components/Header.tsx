import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, Sparkles, User, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Collection" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, login, logout, principal } = useAuth();
  const totalItems = useCartStore((s) => s.totalItems)();

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-elevated backdrop-blur-sm"
      data-ocid="header"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="header.logo_link"
        >
          <Sparkles className="h-5 w-5 text-accent transition-smooth group-hover:text-accent/80" />
          <span className="font-display text-xl tracking-wide text-foreground">
            Aura Sublime
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-accent transition-smooth font-body tracking-wide"
              data-ocid={`header.nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link to="/cart" data-ocid="header.cart_button">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-accent transition-smooth"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground border-0"
                  data-ocid="header.cart_badge"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-accent transition-smooth"
                aria-label="Account menu"
                data-ocid="header.account_button"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48"
              data-ocid="header.account_dropdown"
            >
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/account" data-ocid="header.account_link">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" data-ocid="header.orders_link">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" data-ocid="header.admin_link">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive"
                    data-ocid="header.logout_button"
                  >
                    Sign Out
                  </DropdownMenuItem>
                  {principal && (
                    <DropdownMenuItem
                      disabled
                      className="text-xs text-muted-foreground truncate max-w-[180px]"
                    >
                      {principal.slice(0, 12)}…
                    </DropdownMenuItem>
                  )}
                </>
              ) : (
                <DropdownMenuItem
                  onClick={login}
                  data-ocid="header.login_button"
                >
                  Sign In with Internet Identity
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-accent transition-smooth"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-ocid="header.mobile_menu_toggle"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="md:hidden border-t border-border/60 bg-card px-4 py-4 flex flex-col gap-4 animate-slide-up"
          aria-label="Mobile navigation"
          data-ocid="header.mobile_nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-accent transition-smooth font-body tracking-wide"
              data-ocid={`header.mobile.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-muted-foreground hover:text-accent transition-smooth font-body tracking-wide"
            data-ocid="header.mobile.cart_link"
          >
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
        </nav>
      )}
    </header>
  );
}
