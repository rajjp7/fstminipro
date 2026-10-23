"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Plus, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const isInCart = !!cartItem;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-zinc-200/80 hover:border-zinc-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container with Badges & Wishlist Button */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-50">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Minimalist Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-zinc-900 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-xs">
              Bestseller
            </span>
          )}
          {product.isTrending && !product.isBestSeller && (
            <span className="bg-white/95 text-zinc-900 border border-zinc-200 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-xs backdrop-blur-xs">
              Trending
            </span>
          )}
          {discountPercent > 0 && !product.isBestSeller && (
            <span className="bg-zinc-900 text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-xs ${
            isWishlisted
              ? "bg-white text-zinc-900 scale-105"
              : "bg-white/90 text-zinc-400 hover:text-zinc-900 hover:bg-white"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted ? "fill-zinc-900 text-zinc-900" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400">
            {product.category.replace("-", " ")}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-600">
            <Star className="w-3 h-3 fill-zinc-900 text-zinc-900" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-zinc-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`} className="group-hover:text-zinc-600 transition-colors">
          <h3 className="font-semibold text-zinc-900 text-sm sm:text-[15px] line-clamp-1 tracking-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5 font-normal">
          {product.tagline}
        </p>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className={`h-9 px-3.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              isInCart
                ? "bg-zinc-100 text-zinc-900 border border-zinc-300"
                : "bg-zinc-900 text-white hover:bg-black"
            }`}
            aria-label="Add to cart"
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ({cartItem.quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
