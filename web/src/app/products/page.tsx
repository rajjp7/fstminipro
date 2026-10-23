"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { ArrowUpDown, X } from "lucide-react";

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      // In-stock filter
      if (inStockOnly && product.stockAvailability <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // Default/Featured order
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  const hasActiveFilters = selectedCategory !== "all" || searchQuery !== "" || inStockOnly || sortBy !== "featured";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("featured");
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Header */}
      <div className="border-b border-zinc-200/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Catalog & Hardware
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Displaying <strong className="text-zinc-950 font-semibold">{filteredProducts.length}</strong> precision items
          </p>
        </div>

        {/* Search in catalog */}
        <div className="w-full md:w-80">
          <SearchBar
            defaultValue={searchQuery}
            onSearch={(q) => setSearchQuery(q)}
            placeholder="Search catalog..."
          />
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-zinc-900 text-white shadow-2xs"
                : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80"
            }`}
          >
            All Items ({SAMPLE_PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = SAMPLE_PRODUCTS.filter((p) => p.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 text-white shadow-2xs"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/80"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Secondary Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center gap-4">
            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-900 border-zinc-300"
              />
              <span>In Stock Only</span>
            </label>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 hover:underline cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Results */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage={
          searchQuery
            ? `No products found matching "${searchQuery}". Try clearing search or category filters.`
            : "No products currently available in this department."
        }
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="text-xs text-zinc-500 mt-4">Loading catalog...</p>
        </div>
      }
    >
      <ProductCatalogContent />
    </Suspense>
  );
}
