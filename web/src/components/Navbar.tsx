"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchBar } from "./SearchBar";

function NavbarContent() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/products" },
    { label: "Audio", href: "/products?category=audio" },
    { label: "Watches", href: "/products?category=watches" },
    { label: "Footwear", href: "/products?category=footwear" },
    { label: "Desk Tech", href: "/products?category=tech-essentials" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      {/* Top Refined Notice Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-[11px] sm:text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-2">
        <span>Complimentary worldwide express delivery on orders over $100</span>
        <span className="text-zinc-600 hidden sm:inline">•</span>
        <span className="text-zinc-400 hidden sm:inline">Code <strong className="text-white font-semibold">AURA20</strong> for 20% savings</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Clean Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-xs group-hover:bg-black transition-colors">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-widest text-zinc-950 uppercase">
                A U R A
              </span>
              <span className="text-[9px] uppercase font-medium tracking-[0.2em] text-zinc-400 -mt-1 hidden sm:block">
                Design & Technology
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-colors ${
                    isActive
                      ? "text-zinc-950 bg-zinc-100 font-semibold"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm">
            <SearchBar />
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-zinc-900 text-white text-[9px] font-bold flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-zinc-900 text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Profile / Account */}
            <Link
              href={user ? "/profile" : "/login"}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-700 hover:text-zinc-950 text-xs font-medium"
              aria-label="User Account"
            >
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline">
                {user ? user.name.split(" ")[0] : "Sign In"}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-800 hover:bg-zinc-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-medium px-3">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-600 hover:text-zinc-900"
            >
              My Account
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-900 font-semibold"
            >
              Wishlist ({totalWishlist})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="h-18 bg-white border-b border-zinc-200" />}>
      <NavbarContent />
    </Suspense>
  );
}
