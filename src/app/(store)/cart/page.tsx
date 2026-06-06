"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { qualifiesForFreeShipping, FREE_SHIPPING_THRESHOLD_USD } from "@/lib/currency";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const { format } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-stone-900 mb-4">Your Bag</h1>
        <p className="text-stone-500 mb-8">Your bag is empty.</p>
        <Link
          href="/shop"
          className="inline-block bg-stone-900 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">
        Your Bag
      </h1>
      <p className="text-stone-500 text-sm mb-10">
        {itemCount} item{itemCount !== 1 ? "s" : ""}
      </p>

      <div className="space-y-6 mb-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 md:gap-6 pb-6 border-b border-stone-200"
          >
            <Link
              href={`/products/${item.slug}`}
              className="relative w-24 h-32 md:w-28 md:h-36 bg-stone-100 shrink-0 overflow-hidden"
            >
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </Link>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between gap-4">
                <div>
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-serif text-lg text-stone-900 hover:text-amber-800"
                  >
                    {item.name}
                  </Link>
                  {item.size && (
                    <p className="text-xs text-stone-500 mt-0.5">{item.size}</p>
                  )}
                </div>
                <p className="text-sm font-medium text-stone-900 shrink-0">
                  {format(item.price * item.quantity)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4">
                <div className="flex items-center border border-stone-300">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-2 hover:bg-stone-50 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-stone-50"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-stone-400 hover:text-red-600 transition-colors p-2"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 p-6 md:p-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-stone-600">Subtotal</span>
          <span className="font-medium">{format(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-6">
          <span className="text-stone-600">Shipping</span>
          <span className="text-stone-500">
            {qualifiesForFreeShipping(subtotal)
              ? "Free · East Africa"
              : `Free over $${FREE_SHIPPING_THRESHOLD_USD} USD`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-medium border-t border-stone-200 pt-4 mb-6">
          <span>Total</span>
          <span>{format(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="block w-full bg-stone-900 text-white py-4 text-xs tracking-[0.2em] uppercase text-center hover:bg-amber-800 transition-colors"
        >
          Proceed to Checkout
        </Link>
        <Link
          href="/shop"
          className="block text-center text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 mt-4"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
