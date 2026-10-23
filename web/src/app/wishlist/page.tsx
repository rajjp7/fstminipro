"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, clearWishlist, totalWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((p) => addToCart(p, 1));
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-500 flex items-center justify-center mx-auto border border-zinc-200">
          <Heart className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Your Wishlist is Empty</h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            Save hardware and essentials you wish to revisit by tapping the heart icon on any card.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/products">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Discover Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-zinc-200/80 pb-6 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Saved Hardware
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
            Wishlist ({totalWishlist})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleMoveAllToCart}
            variant="primary"
            size="sm"
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Move All to Cart
          </Button>

          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 hover:underline px-2 py-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlisted Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
