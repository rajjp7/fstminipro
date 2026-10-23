"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/order";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 sm:gap-5 py-5 border-b border-zinc-100 items-center">
      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-50 shrink-0 border border-zinc-200/60"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover object-center"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
              {product.category.replace("-", " ")}
            </span>
            <Link
              href={`/products/${product.id}`}
              className="block font-semibold text-zinc-950 text-xs sm:text-sm hover:text-zinc-600 transition-colors truncate tracking-tight"
            >
              {product.name}
            </Link>
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Price & Quantity Controls */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-zinc-950 text-sm">
              ${(product.price * quantity).toFixed(2)}
            </span>
            {quantity > 1 && (
              <span className="text-[11px] text-zinc-400">
                (${product.price.toFixed(2)} ea)
              </span>
            )}
          </div>

          {/* Stepper */}
          <div className="flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1.5 text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-30 cursor-pointer"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-xs font-semibold text-zinc-900">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1.5 text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
