"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/db/schema";
import { Check } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      size: product.size ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!product.inStock}
      className="w-full bg-stone-900 text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {added ? (
        <>
          <Check size={16} />
          Added to Bag
        </>
      ) : product.inStock ? (
        "Add to Bag"
      ) : (
        "Out of Stock"
      )}
    </button>
  );
}
