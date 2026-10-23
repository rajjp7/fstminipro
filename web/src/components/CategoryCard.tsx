import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/product";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-zinc-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 block"
    >
      {/* Background Image */}
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
      />

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {category.itemCount} Items
          </span>
          <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5 font-normal">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
