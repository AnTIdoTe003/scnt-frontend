"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cart, setCartOpen } = useCart()
  const cartCount = cart?.lines?.edges?.reduce((sum, e) => sum + e.node.quantity, 0) ?? 0

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "glass border-b border-border shadow-sm"
        : "bg-background/80 backdrop-blur-sm border-b border-border/70"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/vybz-logo.png"
              alt="VYBZ"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-2xl md:text-3xl font-bebas tracking-wider text-foreground hover:scale-105 transition-transform duration-300">
            VYBZ
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/men"
            className="text-sm font-space font-semibold tracking-wider hover:text-accent transition-colors relative group"
          >
            MEN
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/women"
            className="text-sm font-space font-semibold tracking-wider hover:text-accent transition-colors relative group"
          >
            WOMEN
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/unisex"
            className="text-sm font-space font-semibold tracking-wider hover:text-accent transition-colors relative group"
          >
            UNISEX
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/combos"
            className="text-sm font-space font-semibold tracking-wider hover:text-accent transition-colors relative group"
          >
            COMBOS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/about"
            className="text-sm font-space font-semibold tracking-wider hover:text-accent transition-colors relative group"
          >
            STORY
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:text-primary transition-colors group"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:text-primary transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card border-t border-primary/20 backdrop-blur-xl">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/men"
              className="block text-base font-space font-semibold tracking-wider hover:text-primary hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              MEN
            </Link>
            <Link
              href="/women"
              className="block text-base font-space font-semibold tracking-wider hover:text-primary hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              WOMEN
            </Link>
            <Link
              href="/unisex"
              className="block text-base font-space font-semibold tracking-wider hover:text-primary hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              UNISEX
            </Link>
            <Link
              href="/combos"
              className="block text-base font-space font-semibold tracking-wider hover:text-primary hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              COMBOS
            </Link>
            <Link
              href="/about"
              className="block text-base font-space font-semibold tracking-wider hover:text-primary hover:translate-x-2 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              STORY
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
