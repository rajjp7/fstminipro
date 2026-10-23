"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/CartItem";
import { PriceSummary } from "@/components/PriceSummary";
import { Button } from "@/components/Button";
import { ShoppingBag, ArrowRight, ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-500 flex items-center justify-center mx-auto border border-zinc-200">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            You haven&apos;t added any items to your shopping cart yet. Explore our curated hardware and essentials.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/products">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-zinc-200/80 pb-6 gap-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Shopping Bag
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
            Your Cart ({totalItems})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Cart</span>
        </button>
      </div>

      {/* Grid: Cart Items (left) + Order Summary (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200/80 p-6 shadow-2xs divide-y divide-zinc-100">
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <div className="pt-6 flex justify-between items-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Sticky Price Summary Box */}
        <div className="lg:col-span-5 space-y-4">
          <PriceSummary showCouponInput={true} />

          <Link href="/checkout" className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-sm sm:text-base font-bold shadow-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>
          </Link>

          <p className="text-center text-[11px] text-zinc-400 font-normal">
            Complimentary 30-day returns & official 2-year warranty on all shipments.
          </p>
        </div>
      </div>
    </div>
  );
}
