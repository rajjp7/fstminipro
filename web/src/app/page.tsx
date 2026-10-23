"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ArrowUpRight } from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/Button";

export default function HomePage() {
  const featuredProducts = SAMPLE_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const trendingProducts = SAMPLE_PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = SAMPLE_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. Clean Architectural Hero */}
      <section className="relative overflow-hidden bg-white border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-semibold tracking-wider uppercase">
                <span>Release 04 // Studio Acoustics</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-zinc-950">
                Purity of sound. <br />
                <span className="text-zinc-500 font-normal">
                  Precision in form.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Studio-grade titanium drivers, sapphire crystal chronographs, and aerodynamic carbon footwear engineered for the discerning minimalists.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/products">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Collection
                  </Button>
                </Link>
                <Link href="/products?category=audio">
                  <Button variant="outline" size="lg">
                    Discover Acoustics
                  </Button>
                </Link>
              </div>

              {/* Minimal Specs Strip */}
              <div className="pt-8 border-t border-zinc-100 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight">40H</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Battery Reserve</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight">4.9/5</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Verified Acoustic Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight">2-YR</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">Official Warranty</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Product */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden border border-zinc-200/90 shadow-sm bg-zinc-100 p-2">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                  alt="Aura Pro ANC Headphones"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover rounded-2xl"
                />

                {/* Refined Glass Product Tag */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-sm flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Flagship Hardware
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900">Aura Pro ANC Headphones</h4>
                    <p className="text-xs text-zinc-500 font-medium">$249.99 • Titanium Drivers</p>
                  </div>
                  <Link href="/products/prod-1">
                    <button className="h-8 px-3.5 bg-zinc-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer">
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Curated Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-200/60 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
              Curated Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            <span>All Departments</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-200/60 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
              Featured Hardware
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            <span>View Catalog ({SAMPLE_PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Minimalist Editorial Promotion Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-zinc-950 p-8 sm:p-14 text-white border border-zinc-800 shadow-sm">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block px-3 py-1 bg-zinc-800 text-zinc-200 font-semibold text-[10px] uppercase tracking-wider rounded-md border border-zinc-700">
              Private Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Enjoy 20% off with invitation code.
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Apply code <strong className="font-mono text-white">AURA20</strong> at checkout to redeem savings across the entire store. All orders include insured express dispatch.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button variant="outline" size="md" className="bg-white text-zinc-950 border-white hover:bg-zinc-100">
                  Shop Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-200/60 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              Curator Selected
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
              Trending Right Now
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            <span>Explore Trending</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-200/60 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              Enduring Classics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
              Best-Selling Items
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            <span>All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Minimalist Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-12 shadow-2xs">
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              Editorial Reviews
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-1">
              Endorsed by Designers & Engineers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-zinc-900 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                  &ldquo;The Aura Pro headphones completely transformed my remote work focus. The battery life is astonishing, and they look stunning on my desk.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center">
                  ER
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-950">Elena Rostova</h5>
                  <p className="text-[11px] text-zinc-500">Audio Engineer, London</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-zinc-900 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                  &ldquo;AeroGlide runners helped me set a personal 10k record. Super springy and featherweight. AURA’s customer support is also top tier.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center">
                  MV
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-950">Marcus Vance</h5>
                  <p className="text-[11px] text-zinc-500">Marathon Runner, NYC</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-zinc-900 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                  &ldquo;Keychron Studio aluminum keyboard sounds like rain on marble. Outstanding craftsmanship and seamless Mac pairing.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-800 font-bold text-xs flex items-center justify-center">
                  AT
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-950">Alex Thorne</h5>
                  <p className="text-[11px] text-zinc-500">Software Architect, SF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
