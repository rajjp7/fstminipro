"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Headphones, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const { success } = useToast();

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    success("Subscribed", "You have joined the AURA newsletter.");
    setEmail("");
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-900">
      {/* Brand Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-zinc-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Complimentary over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider">30-Day Guarantee</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Hassle-free return labels</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Official Warranty</h4>
              <p className="text-xs text-zinc-400 mt-0.5">2-Year hardware coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider">24/7 Concierge</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Expert customer support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 font-black text-sm flex items-center justify-center">
                A
              </div>
              <span className="font-bold text-lg text-white tracking-widest uppercase">AURA</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Curating architectural audio, titanium wearables, aerodynamic footwear, and minimalist desk gear designed for longevity and performance.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="mt-4 max-w-sm flex gap-2">
              <input
                type="email"
                placeholder="Enter email for private drops"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-3.5 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                Join <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 tracking-wider uppercase">Collections</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/products?category=audio" className="hover:text-white transition-colors">Audio & Acoustics</Link></li>
              <li><Link href="/products?category=watches" className="hover:text-white transition-colors">Watches & Chrono</Link></li>
              <li><Link href="/products?category=footwear" className="hover:text-white transition-colors">Footwear & Runners</Link></li>
              <li><Link href="/products?category=tech-essentials" className="hover:text-white transition-colors">Desk Tech & Keyboards</Link></li>
              <li><Link href="/products?category=bags" className="hover:text-white transition-colors">Everyday Carry</Link></li>
              <li><Link href="/products?category=apparel" className="hover:text-white transition-colors">Technical Apparel</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 tracking-wider uppercase">Support</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><Link href="/profile" className="hover:text-white transition-colors">Order Status & Tracking</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors">Warranty Registration</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Product Specifications</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Account Access</Link></li>
            </ul>
          </div>

          {/* About / Store */}
          <div>
            <h4 className="font-semibold text-white text-xs mb-4 tracking-wider uppercase">Philosophy</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><span className="text-zinc-500">Material Integrity</span></li>
              <li><span className="text-zinc-500">Responsible Sourcing</span></li>
              <li><span className="text-zinc-500">Editorial Archive</span></li>
              <li><span className="text-zinc-500">Privacy Policy</span></li>
              <li><span className="text-zinc-500">Terms of Service</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>© 2026 AURA Store Inc. Clean & Minimalist College Mini-Project.</p>
        <div className="flex items-center gap-6 text-[11px]">
          <span>256-Bit SSL Secured</span>
          <span>Apple Pay • Google Pay • Visa</span>
        </div>
      </div>
    </footer>
  );
}
