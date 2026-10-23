import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <div className="space-y-2 mt-1">
        <Skeleton className="w-20 h-4 rounded-full" />
        <Skeleton className="w-full h-5 rounded" />
        <Skeleton className="w-3/4 h-4 rounded" />
      </div>
      <div className="flex items-center justify-between pt-2 mt-auto">
        <Skeleton className="w-16 h-6 rounded" />
        <Skeleton className="w-24 h-9 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
