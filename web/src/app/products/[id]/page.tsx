"use client";

import React, { useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  Check,
  Share2,
} from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useToast();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-zinc-900">Product not found</h2>
        <p className="text-xs text-zinc-500 mt-2">The product you are looking for does not exist.</p>
        <Link href="/products" className="inline-block mt-6">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl];
  const relatedProducts = SAMPLE_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success("Link Copied", "Product URL copied to clipboard.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-zinc-900 transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="capitalize hover:text-zinc-900 transition-colors"
        >
          {product.category.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="text-zinc-800 font-medium truncate max-w-[200px] sm:max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Product Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200/80 shadow-2xs">
            <Image
              src={images[selectedImageIndex] || product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-cover object-center transition-all duration-300"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              {product.isBestSeller && (
                <span className="bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                  Bestseller
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-xs">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Top Right Quick Actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-zinc-700 hover:text-zinc-900 shadow-xs hover:bg-white transition-all cursor-pointer"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-xs transition-all cursor-pointer ${
                  isWishlisted
                    ? "bg-white text-zinc-950"
                    : "bg-white/90 text-zinc-400 hover:text-zinc-950 hover:bg-white"
                }`}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-zinc-950" : ""}`} />
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-zinc-900 ring-2 ring-zinc-900/10"
                      : "border-zinc-200 hover:border-zinc-300 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mt-1">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">{product.tagline}</p>
          </div>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between py-2 border-y border-zinc-100">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-zinc-900">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-800">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-zinc-400">({product.reviewsCount} reviews)</span>
            </div>

            <div className="text-xs font-semibold">
              {product.stockAvailability > 0 ? (
                <span className="text-zinc-800 bg-zinc-100 px-2.5 py-0.5 rounded-md border border-zinc-200/60">
                  In Stock ({product.stockAvailability})
                </span>
              ) : (
                <span className="text-zinc-400 bg-zinc-50 px-2.5 py-0.5 rounded-md">Sold Out</span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-zinc-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md">
                Save ${(product.originalPrice! - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">{product.description}</p>

          {/* Key Features Bullet List */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200/60">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Key Highlights
              </h4>
              <ul className="space-y-1.5">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                    <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-zinc-700">Quantity</span>
              <div className="flex items-center border border-zinc-200 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-9 text-center font-bold text-xs text-zinc-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockAvailability, quantity + 1))}
                  className="p-2 text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
                className="w-full"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Instant Checkout
              </Button>
            </div>
          </div>

          {/* Assurance perks */}
          <div className="pt-4 border-t border-zinc-100 space-y-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-zinc-900" />
              <span>Complimentary express insured delivery on orders over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-zinc-900" />
              <span>30-day trial with prepaid return labels</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
              <span>Official 2-Year Manufacturer Warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews Section */}
      <div className="pt-8 border-t border-zinc-200 space-y-10">
        {/* Specifications Table */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-zinc-950 mb-4 tracking-tight">Technical Specifications</h3>
            <div className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-2xs divide-y divide-zinc-100">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs sm:text-sm">
                  <span className="font-semibold text-zinc-900">{key}</span>
                  <span className="sm:col-span-2 text-zinc-600">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-950 tracking-tight">Customer Reviews</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Verified purchaser testimonials</p>
            </div>
            <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-xl">
              <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
              <span className="font-bold text-zinc-900 text-xs sm:text-sm">{product.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-zinc-950">{rev.userName}</span>
                    <span className="text-[11px] text-zinc-400">{rev.date}</span>
                  </div>
                  <div className="flex text-zinc-900">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-normal">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-500">No customer reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-zinc-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                Recommendations
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-950 tracking-tight mt-0.5">
                Related Essentials
              </h3>
            </div>
            <Link
              href={`/products?category=${product.category}`}
              className="text-xs font-semibold text-zinc-900 hover:underline"
            >
              View More in Department
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mx-auto"></div>
          <p className="text-xs text-zinc-500 mt-4">Loading hardware details...</p>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
