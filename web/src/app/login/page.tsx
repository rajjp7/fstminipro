"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/Button";
import { Lock, Mail, User, Eye, EyeOff, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated, user } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-zinc-900 text-white flex items-center justify-center mx-auto shadow-sm">
          <Check className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950">Signed in as {user.name}</h2>
        <p className="text-xs text-zinc-500">{user.email}</p>
        <div className="pt-4 flex justify-center gap-3">
          <Link href="/profile">
            <Button variant="primary">View Account & Orders</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (isRegisterMode && !name.trim()) {
      errs.name = "Full name is required";
    }
    if (!email.trim() || !email.includes("@")) {
      errs.email = "Valid email address is required";
    }
    if (!password || password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (isRegisterMode) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      router.push("/profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setIsLoading(true);
    await login("alex.rivera@example.com", "demopassword", "Alex Rivera");
    setIsLoading(false);
    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-6">
      {/* Brand Icon & Heading */}
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-black text-xl flex items-center justify-center mx-auto shadow-xs">
          A
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
          {isRegisterMode ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-xs text-zinc-500">
          {isRegisterMode
            ? "Register to track your shipments, orders, and saved wishlist."
            : "Sign in to access your orders, default address, and express checkout."}
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-5">
        {/* Tab Toggle */}
        <div className="flex p-1 bg-zinc-100 rounded-xl text-xs font-semibold text-zinc-600">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(false);
              setErrors({});
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              !isRegisterMode ? "bg-white text-zinc-950 shadow-2xs font-bold" : "hover:text-zinc-950"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(true);
              setErrors({});
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              isRegisterMode ? "bg-white text-zinc-950 shadow-2xs font-bold" : "hover:text-zinc-950"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-zinc-50/70 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                    errors.name ? "border-zinc-500" : "border-zinc-200"
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-zinc-500">{errors.name}</p>}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm bg-zinc-50/70 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                  errors.email ? "border-zinc-500" : "border-zinc-200"
                }`}
              />
            </div>
            {errors.email && <p className="text-[11px] text-zinc-500">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-700">Password</label>
              {!isRegisterMode && (
                <span className="text-[11px] text-zinc-500 hover:text-zinc-950 underline cursor-pointer">
                  Forgot password?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-2 text-xs sm:text-sm bg-zinc-50/70 border rounded-xl focus:bg-white focus:outline-none focus:border-zinc-400 ${
                  errors.password ? "border-zinc-500" : "border-zinc-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-zinc-500">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full text-xs sm:text-sm font-bold shadow-xs"
          >
            {isRegisterMode ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-3 text-zinc-400 font-semibold tracking-wider">
              Quick Testing Demo
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleQuickDemo}
          variant="outline"
          size="md"
          className="w-full text-xs font-semibold"
        >
          Instant Demo Login (Alex Rivera)
        </Button>
      </div>
    </div>
  );
}
