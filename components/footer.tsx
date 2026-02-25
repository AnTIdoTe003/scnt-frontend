import Link from "next/link"
import { Instagram, Twitter, Mail, Heart, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-primary/20 bg-secondary/50 mt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="scale-fade-in">
            <h3 className="text-3xl font-bebas tracking-wider text-foreground mb-4">XPerfumes</h3>
            <p className="text-muted-foreground text-sm mb-4 font-space">
              Scent Your Vibe.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xs">Made with</span>
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              <span className="text-xs">in India</span>
            </div>
          </div>

          {/* Shop */}
          <div className="scale-fade-in" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-space font-bold text-lg mb-4 gradient-text">SHOP</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-dm">
              <li>
                <Link
                  href="/men"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/women"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/unisex"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Unisex Vibes
                </Link>
              </li>
              <li>
                <Link
                  href="/combos"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Bundle Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="scale-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-space font-bold text-lg mb-4 gradient-text">SUPPORT</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-dm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Hit Us Up
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-primary hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="scale-fade-in" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-space font-bold text-lg mb-4 gradient-text">CONNECT</h4>
            <p className="text-sm text-muted-foreground mb-4 font-dm">
              Follow our journey
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-3 glass-card rounded-xl hover:glow-primary hover:scale-110 hover:-rotate-6 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="p-3 glass-card rounded-xl hover:glow-accent hover:scale-110 hover:rotate-6 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="p-3 glass-card rounded-xl hover:glow-primary hover:scale-110 hover:-rotate-6 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground font-space">
          <p className="mb-4 sm:mb-0">
            © 2026 XPerfumes. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors hover:scale-105 inline-block"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors hover:scale-105 inline-block"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
