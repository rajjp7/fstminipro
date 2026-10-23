"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Tag, Sparkles, Truck, Check } from "lucide-react";
import { Button } from "./Button";

interface PriceSummaryProps {
  showCouponInput?: boolean;
}

export function PriceSummary({ showCouponInput = true }: PriceSummaryProps) {
  const {
    subtotal,
    shipping,
    tax,
    discount,
    discountCode,
    applyDiscountCode,
    removeDiscountCode,
    total,
    freeShippingThreshold,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyDiscountCode(inputCode);
    if (!success) {
      setErrorMsg("Invalid code. Try 'AURA20' or 'WELCOME10'");
    } else {
      setErrorMsg("");
      setInputCode("");
    }
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
      <h3 className="text-base font-bold text-zinc-900 mb-4 tracking-tight">Order Summary</h3>

      {/* Free Shipping Progress */}
      <div className="mb-5 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-800 mb-2">
          <Truck className="w-3.5 h-3.5 text-zinc-900" />
          {amountNeededForFreeShipping > 0 ? (
            <span>
              Add <strong className="text-zinc-950 font-bold">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Delivery
            </span>
          ) : (
            <span className="text-zinc-900 flex items-center gap-1 font-semibold">
              <Check className="w-3 h-3 text-zinc-900" /> Free express delivery unlocked
            </span>
          )}
        </div>
        <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-zinc-900 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-xs sm:text-sm text-zinc-600 border-b border-zinc-100 pb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-zinc-900 font-medium">
            <span className="flex items-center gap-1 text-xs">
              <Tag className="w-3 h-3" /> Discount ({discountCode})
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-zinc-900">
            {shipping === 0 ? (
              <span className="font-bold text-zinc-900 text-xs">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-semibold text-zinc-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Coupon Form */}
      {showCouponInput && (
        <div className="my-4">
          {discountCode ? (
            <div className="flex items-center justify-between p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-800">
              <span className="font-medium flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-zinc-600" />
                Code: <strong className="font-bold">{discountCode}</strong>
              </span>
              <button
                onClick={removeDiscountCode}
                className="text-zinc-500 hover:text-zinc-900 text-xs font-semibold underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (AURA20)"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setErrorMsg("");
                  }}
                  className="flex-1 px-3 py-2 text-xs uppercase bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400"
                />
                <Button type="submit" variant="outline" size="sm">
                  Apply
                </Button>
              </div>
              {errorMsg && <p className="text-[11px] text-zinc-500">{errorMsg}</p>}
            </form>
          )}
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-baseline pt-2">
        <span className="text-base font-bold text-zinc-900">Total</span>
        <div className="text-right">
          <span className="text-2xl font-black text-zinc-900 tracking-tight">${total.toFixed(2)}</span>
          <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">USD • All taxes included</p>
        </div>
      </div>
    </div>
  );
}
