"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Check, PackageCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { orders } = useAuth();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8">
      {/* Confirmation Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200/80 shadow-2xs text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto shadow-sm">
          <Check className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-1">
            Thank you for your order.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 max-w-md mx-auto">
            A confirmation receipt and tracking link have been dispatched to{" "}
            <strong className="text-zinc-800">
              {currentOrder?.shippingAddress?.email || "your email"}
            </strong>.
          </p>
        </div>

        {/* Order Meta Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-zinc-50 border border-zinc-200/80 px-5 py-3 rounded-xl text-xs">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Order ID</span>
            <span className="font-mono font-bold text-zinc-900">{currentOrder?.id || "ORD-94821"}</span>
          </div>
          <div className="h-6 w-px bg-zinc-200" />
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Estimated Delivery</span>
            <span className="font-bold text-zinc-900">
              {currentOrder?.estimatedDelivery || "Oct 27 - Oct 29, 2026"}
            </span>
          </div>
          <div className="h-6 w-px bg-zinc-200" />
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase font-bold">Status</span>
            <span className="font-bold text-zinc-900">{currentOrder?.status || "Processing"}</span>
          </div>
        </div>
      </div>

      {/* Order Summary Details */}
      {currentOrder && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-6">
          <h3 className="font-bold text-zinc-950 text-base border-b border-zinc-100 pb-3 flex items-center gap-2 tracking-tight">
            <PackageCheck className="w-4 h-4 text-zinc-900" />
            <span>Order Summary & Delivery Destination</span>
          </h3>

          {/* Items */}
          <div className="divide-y divide-zinc-100">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 text-xs sm:text-sm">{item.productName}</h4>
                    <span className="text-xs text-zinc-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-zinc-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Shipping & Payment Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-100 text-xs text-zinc-600">
            <div>
              <h5 className="font-bold text-zinc-950 mb-1">Delivering To:</h5>
              <p>{currentOrder.shippingAddress.fullName}</p>
              <p>{currentOrder.shippingAddress.street}</p>
              <p>
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{" "}
                {currentOrder.shippingAddress.postalCode}
              </p>
              <p className="text-zinc-400 mt-1">{currentOrder.shippingAddress.phone}</p>
            </div>

            <div>
              <h5 className="font-bold text-zinc-950 mb-1">Payment & Totals:</h5>
              <p className="text-zinc-500">Method: {currentOrder.paymentMethod}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-zinc-800">${currentOrder.subtotal.toFixed(2)}</span>
                </div>
                {currentOrder.discount > 0 && (
                  <div className="flex justify-between text-zinc-900 font-medium">
                    <span>Discount:</span>
                    <span>-${currentOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-zinc-950 pt-1 border-t border-zinc-100">
                  <span>Total:</span>
                  <span>${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/products" className="w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Continue Shopping
          </Button>
        </Link>
        <Link href="/profile" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full">
            View All Orders
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="text-xs text-zinc-500 mt-4">Retrieving order details...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
