import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  /** Suppress header/footer for full-screen pages like checkout */
  minimal?: boolean;
}

export function Layout({ children, minimal = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!minimal && <Header />}
      <main className="flex-1">{children}</main>
      {!minimal && <Footer />}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
