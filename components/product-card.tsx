"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { formatINR } from "@/lib/currency"
import { getProduct } from "@/lib/products"

interface ProductCardProps {
  name: string
  price: string
  notes: string
  slug: string
}

export function ProductCard({ name, price, notes, slug }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const product = getProduct(slug)

  // Use the first image from the product database if it exists
  const displayImage = product?.images?.[0] || "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${slug}`}>
        <div className="relative rounded-2xl overflow-hidden glass-card hover:glow-subtle transition-all duration-500 hover:-translate-y-1">
          {/* Product Image */}
          <div className="relative h-72 bg-gradient-to-b from-secondary/70 to-background overflow-hidden">
            <Image
              src={displayImage}
              alt={name}
              fill
              className={`object-cover transition-all duration-700 ${
                isHovered ? "scale-110 rotate-3" : "scale-100"
              }`}
            />

            {/* Overlay gradient on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-accent/10 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Quick actions */}
            <div
              className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className={`p-2 glass-card rounded-xl hover:scale-110 transition-all duration-300 ${
                  isLiked ? "glow-primary" : ""
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isLiked ? "text-accent fill-accent" : "text-foreground"
                  }`}
                />
              </button>
            </div>

            {/* Add to cart button overlay */}
            <div
              className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-500 ${
                isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Add to cart logic
                }}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-space font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 group/btn"
              >
                <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                ADD TO BAG
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5">
            <h3 className="font-space font-bold text-lg mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 font-dm">{notes}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-foreground">{formatINR(price)}</span>
              <span className="text-xs text-muted-foreground font-space">Eau de Parfum</span>
            </div>
          </div>

          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border border-accent/40" />
          </div>
        </div>
      </Link>
    </div>
  )
}
