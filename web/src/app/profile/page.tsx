"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { Button } from "@/components/Button";
import {
  User as UserIcon,
  Package,
  MapPin,
  LogOut,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, orders, logout, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses">("orders");

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-500">
          <UserIcon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-zinc-950">Sign In Required</h2>
        <p className="text-xs text-zinc-500">Please sign in to view your account orders and saved delivery address.</p>
        <Link href="/login">
          <Button variant="primary">Sign In</Button>
        </Link>
      </div>
    );
  }

  const handleReorder = (order: (typeof orders)[0]) => {
    order.items.forEach((item) => {
      const prod = SAMPLE_PRODUCTS.find((p) => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.quantity);
      }
    });
    router.push("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative w-18 h-18 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name} fill sizes="72px" className="object-cover" />
            ) : (
              <UserIcon className="w-8 h-8 text-zinc-500 m-auto mt-5" />
            )}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md border border-zinc-200">
              Verified Member
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-1">
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500">{user.email} • {user.phone || "+1 (555) 349-2041"}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 gap-8">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "orders"
              ? "border-zinc-900 text-zinc-950"
              : "border-transparent text-zinc-400 hover:text-zinc-800"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("addresses")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "addresses"
              ? "border-zinc-900 text-zinc-950"
              : "border-transparent text-zinc-400 hover:text-zinc-800"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Delivery Destination</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200/80">
              <Package className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-zinc-900">No orders yet</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Once you place an order, its real-time shipping status and tracking history will appear right here.
              </p>
              <div className="pt-4">
                <Link href="/products">
                  <Button variant="primary" size="sm">
                    Explore Catalog
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-2xs hover:border-zinc-300 transition-all"
              >
                {/* Order Top Meta Strip */}
                <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Placed</span>
                      <span className="font-semibold text-zinc-900">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Order ID</span>
                      <span className="font-mono font-bold text-zinc-900">{order.id}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold">Total</span>
                      <span className="font-bold text-zinc-950">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-md text-[11px] font-bold inline-flex items-center gap-1.5 ${
                        order.status === "Delivered"
                          ? "bg-zinc-100 text-zinc-900 border border-zinc-200"
                          : "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {order.status === "Delivered" && <CheckCircle className="w-3.5 h-3.5 text-zinc-900" />}
                      {order.status === "Processing" && <Clock className="w-3.5 h-3.5 text-zinc-600" />}
                      {order.status === "Shipped" && <Truck className="w-3.5 h-3.5 text-zinc-800" />}
                      <span>{order.status}</span>
                    </span>

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3 py-1 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="p-6 divide-y divide-zinc-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
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
                          <h4 className="font-semibold text-zinc-950 text-xs sm:text-sm">{item.productName}</h4>
                          <p className="text-[11px] text-zinc-400">
                            Qty: {item.quantity} • ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-zinc-950 text-xs sm:text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {order.trackingNumber && (
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Saved Addresses */}
      {activeTab === "addresses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-zinc-300 shadow-2xs relative space-y-3">
            <span className="inline-block px-2.5 py-0.5 bg-zinc-100 text-zinc-800 text-[10px] font-bold rounded-md uppercase border border-zinc-200">
              Default Destination
            </span>
            <h4 className="font-bold text-zinc-950">{user.name}</h4>
            <div className="text-xs text-zinc-600 space-y-0.5 font-normal">
              <p>742 Evergreen Terrace</p>
              <p>San Francisco, CA 94107</p>
              <p>United States</p>
              <p className="pt-2 text-zinc-400">Phone: {user.phone || "+1 (555) 349-2041"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
