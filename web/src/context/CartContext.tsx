"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/types/product";
import { CartItem } from "@/types/order";
import { useToast } from "./ToastContext";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  discountCode: string;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  total: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "aura_cart_v1";
const DISCOUNT_KEY = "aura_discount_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, info } = useToast();

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedDiscount = localStorage.getItem(DISCOUNT_KEY);
      if (savedDiscount) {
        setDiscountCode(savedDiscount);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart, isLoaded]);

  // Save discount code
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (discountCode) {
        localStorage.setItem(DISCOUNT_KEY, discountCode);
      } else {
        localStorage.removeItem(DISCOUNT_KEY);
      }
    } catch (e) {
      console.error("Failed to save discount code", e);
    }
  }, [discountCode, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    success("Added to Cart", `${product.name} (${quantity}) added to your shopping bag.`);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (item) {
      info("Removed from Cart", `${item.product.name} was removed.`);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode("");
  };

  const applyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "AURA20" || clean === "WELCOME10" || clean === "STUDENT15") {
      setDiscountCode(clean);
      success("Promo Applied!", `Coupon "${clean}" has been activated.`);
      return true;
    }
    return false;
  };

  const removeDiscountCode = () => {
    setDiscountCode("");
    info("Promo Removed", "Discount code has been cleared.");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const freeShippingThreshold = 100;
  const shipping = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 12;
  const tax = subtotal * 0.08;

  let discount = 0;
  if (discountCode === "AURA20") {
    discount = subtotal * 0.20;
  } else if (discountCode === "WELCOME10") {
    discount = Math.min(subtotal, 10);
  } else if (discountCode === "STUDENT15") {
    discount = subtotal * 0.15;
  }

  const total = Math.max(0, subtotal - discount + shipping + tax);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        tax,
        discount,
        discountCode,
        applyDiscountCode,
        removeDiscountCode,
        total,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
