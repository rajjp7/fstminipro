"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  placeholder = "Search products, audio, watches...",
  defaultValue = "",
  onSearch,
  className = "",
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else {
      if (trimmed) {
        router.push(`/products?search=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/products");
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center ${className}`}>
      <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
        <Search className="w-3.5 h-3.5" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch) {
            onSearch(e.target.value);
          }
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-zinc-100/70 hover:bg-zinc-100 focus:bg-white text-zinc-900 placeholder:text-zinc-400 rounded-xl border border-zinc-200/60 focus:border-zinc-400 focus:outline-none transition-all duration-200"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 text-zinc-400 hover:text-zinc-700 transition-colors p-0.5 cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
