"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Order, ShippingAddress } from "@/types/order";
import { useToast } from "./ToastContext";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (email: string, password?: string, name?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  createOrder: (data: {
    items: Order["items"];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  }) => Order;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "aura_user_v1";
const ORDERS_STORAGE_KEY = "aura_orders_v1";

const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-94821",
    date: "October 14, 2026",
    status: "Delivered",
    paymentMethod: "Apple Pay",
    subtotal: 249.99,
    tax: 20.0,
    shipping: 0,
    discount: 0,
    total: 269.99,
    trackingNumber: "TRK-98321495",
    estimatedDelivery: "Delivered on Oct 17, 2026",
    shippingAddress: {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 349-2041",
      street: "742 Evergreen Terrace",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
    },
    items: [
      {
        productId: "prod-1",
        productName: "Aura Pro Wireless ANC Headphones",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        price: 249.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-83190",
    date: "September 29, 2026",
    status: "Delivered",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    subtotal: 169.99,
    tax: 13.6,
    shipping: 0,
    discount: 0,
    total: 183.59,
    trackingNumber: "TRK-84729103",
    estimatedDelivery: "Delivered on Oct 2, 2026",
    shippingAddress: {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 349-2041",
      street: "742 Evergreen Terrace",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
    },
    items: [
      {
        productId: "prod-7",
        productName: "Keychron Studio Custom Mechanical Keyboard",
        productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
        price: 169.99,
        quantity: 1,
      },
    ],
  },
];

const DEFAULT_DEMO_USER: User = {
  id: "usr-demo",
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 349-2041",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  savedAddresses: [
    {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+1 (555) 349-2041",
      street: "742 Evergreen Terrace",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
    },
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_DEMO_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_SAMPLE_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);
  const { success, info } = useToast();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser !== null) {
        setUser(savedUser === "guest" ? null : JSON.parse(savedUser));
      }
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error("Failed to load auth/orders from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.setItem(USER_STORAGE_KEY, "guest");
      }
    } catch (e) {
      console.error("Failed to save user", e);
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders", e);
    }
  }, [orders, isLoaded]);

  const login = async (email: string, _password?: string, name?: string): Promise<boolean> => {
    const loggedUser: User = {
      id: "usr-" + Math.random().toString(36).substring(2, 7),
      name: name || (email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Shopper"),
      email: email,
      phone: "+1 (555) 234-5678",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    };
    setUser(loggedUser);
    success("Welcome back!", `Signed in as ${loggedUser.name}`);
    return true;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: User = {
      id: "usr-" + Math.random().toString(36).substring(2, 7),
      name: name,
      email: email,
      phone: "+1 (555) 000-1122",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    };
    setUser(newUser);
    success("Account Created!", `Welcome to AURA, ${name}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    info("Signed Out", "You have been logged out.");
  };

  const createOrder = (data: {
    items: Order["items"];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `ORD-${randomNum}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      items: data.items,
      subtotal: data.subtotal,
      tax: data.tax,
      shipping: data.shipping,
      discount: data.discount,
      total: data.total,
      shippingAddress: data.shippingAddress,
      status: "Processing",
      paymentMethod: data.paymentMethod,
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: "Estimated in 3-5 business days",
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        register,
        logout,
        createOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
