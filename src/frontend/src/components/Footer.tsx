import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { Instagram, Sparkles, Twitter } from "lucide-react";

const SHOP_LINKS = [
  { to: "/catalog", label: "All Fragrances" },
  { to: "/catalog?category=floral", label: "Florals" },
  { to: "/catalog?category=oriental", label: "Orientals" },
  { to: "/catalog?category=woody", label: "Woods" },
];

const INFO_LINKS = [
  { href: "/catalog", label: "Our Story" },
  { href: "/catalog?type=all", label: "The Process" },
  { href: "#", label: "Sustainability" },
  { href: "#", label: "Press" },
];

const HELP_LINKS = [
  { href: "#", label: "FAQ" },
  { href: "#", label: "Shipping & Returns" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Store Locator" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border/60" data-ocid="footer">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 group w-fit"
              data-ocid="footer.logo_link"
            >
              <Sparkles className="h-5 w-5 text-accent transition-smooth group-hover:text-accent/80" />
              <span className="font-display text-xl tracking-wide text-foreground">
                Aura Sublime
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Artisan perfumery crafted for those who understand that scent is
              the most intimate form of luxury.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-smooth"
                aria-label="Instagram"
                data-ocid="footer.instagram_link"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-smooth"
                aria-label="Twitter / X"
                data-ocid="footer.twitter_link"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-sm tracking-widest text-foreground uppercase mb-4">
              Shop
            </h3>
            <ul className="flex flex-col gap-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                    data-ocid={`footer.shop.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-sm tracking-widest text-foreground uppercase mb-4">
              Maison
            </h3>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                    data-ocid={`footer.info.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display text-sm tracking-widest text-foreground uppercase mb-4">
              Assistance
            </h3>
            <ul className="flex flex-col gap-2">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-smooth"
                    data-ocid={`footer.help.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border/60" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {year} Aura Sublime Perfume. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-smooth underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
