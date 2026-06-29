"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/schema";
import { Price } from "@/components/Price";

export function ProductCard({ product }: { product: Product }) {
  const price = parseFloat(product.price);
  const compareAt = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const onSale = compareAt && compareAt > price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-stone-100 dark:bg-stone-800 overflow-hidden mb-3 sm:mb-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {onSale && (
          <span className="absolute top-3 left-3 bg-amber-700 text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
            Sale
          </span>
        )}
        {product.featured && !onSale && (
          <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-1">
        {product.brand}
      </p>
      <h3 className="font-serif text-sm sm:text-base text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
        {product.name}
      </h3>
      {product.size && (
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{product.size}</p>
      )}
      <div className="flex items-center gap-2 mt-2">
        <Price amount={price} className="text-sm font-medium text-stone-900 dark:text-white" />
        {onSale && (
          <Price amount={compareAt} className="text-sm text-stone-400 line-through" />
        )}
      </div>
    </Link>
  );
}
