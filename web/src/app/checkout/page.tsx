"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";
import { PriceSummary } from "@/components/PriceSummary";
import { Lock, CreditCard, Wallet, Banknote, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, tax, shipping, discount, total, clearCart } = useCart();
  const { user, createOrder } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || "Alex Rivera",
    email: user?.email || "alex.rivera@example.com",
    phone: user?.phone || "+1 (555) 349-2041",
    street: "742 Evergreen Terrace",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "cod">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("389");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Your Cart is Empty</h2>
        <p className="text-xs text-zinc-500">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/products">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Valid email is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.street.trim()) errs.street = "Street address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State or Province is required";
    if (!formData.postalCode.trim()) errs.postalCode = "ZIP / Postal Code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderItems = cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.imageUrl,
        price: i.product.price,
        quantity: i.quantity,
      }));

      const newOrder = createOrder({
        items: orderItems,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        shippingAddress: { ...formData },
        paymentMethod:
          paymentMethod === "card"
            ? "Credit Card (Visa ending in 4242)"
            : paymentMethod === "wallet"
            ? "Apple Pay / Google Wallet"
            : "Cash on Delivery",
      });

      clearCart();
      setIsSubmitting(false);
      router.push(`/order-success?orderId=${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Secure Checkout
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
            Checkout
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200/60">
          <Lock className="w-3.5 h-3.5 text-zinc-800" />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Form: Delivery Address & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Shipping Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-zinc-950 border-b border-zinc-100 pb-3 tracking-tight">
                1. Delivery Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.fullName ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-zinc-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.email ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-zinc-500">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.phone ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-zinc-500">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Street Address *</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.street ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.street && <p className="text-[11px] text-zinc-500">{errors.street}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.city ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-zinc-500">{errors.city}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">State / Region *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.state ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.state && <p className="text-[11px] text-zinc-500">{errors.state}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">ZIP Code *</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-50/60 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                      errors.postalCode ? "border-zinc-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.postalCode && <p className="text-[11px] text-zinc-500">{errors.postalCode}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-700">Country</label>
                  <input
                    type="text"
                    disabled
                    value={formData.country}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Simulated Payment Options */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-zinc-950 border-b border-zinc-100 pb-3 tracking-tight">
                2. Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-current" />
                  <span className="text-xs font-semibold">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === "wallet"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                  }`}
                >
                  <Wallet className="w-4 h-4 text-current" />
                  <span className="text-xs font-semibold">Apple / Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                  }`}
                >
                  <Banknote className="w-4 h-4 text-current" />
                  <span className="text-xs font-semibold">Pay on Arrival</span>
                </button>
              </div>

              {/* Card Inputs Simulation */}
              {paymentMethod === "card" && (
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-3 mt-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-600">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Expires</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600">Security CVC</label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            {/* Purchased Items Thumbnail preview */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Summary ({cart.length} Products)
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-11 h-11 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 truncate">{item.product.name}</p>
                      <p className="text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-zinc-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <PriceSummary showCouponInput={false} />

            {/* Place Order CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full text-base font-bold shadow-md"
            >
              Confirm Order (${total.toFixed(2)})
            </Button>

            <Link
              href="/cart"
              className="flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 text-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Shopping Cart</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
