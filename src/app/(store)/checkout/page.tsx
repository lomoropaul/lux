"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { qualifiesForFreeShipping, FREE_SHIPPING_THRESHOLD_USD } from "@/lib/currency";
import { buildWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { format, currency } = useCurrency();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-stone-900 mb-4">Checkout</h1>
        <p className="text-stone-500 mb-8">Your bag is empty.</p>
        <Link
          href="/shop"
          className="inline-block bg-stone-900 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const message = buildWhatsAppMessage({
      ...form,
      currency,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      })),
    });

    const url = getWhatsAppUrl(message);
    window.open(url, "_blank");
    clearCart();
  }

  const inputClass =
    "w-full border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 bg-white";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name *"
                required
                value={form.firstName}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="lastName"
                placeholder="Last Name *"
                required
                value={form.lastName}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                placeholder="Email *"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone *"
                required
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <input
                name="address"
                placeholder="Street Address *"
                required
                value={form.address}
                onChange={handleChange}
                className={inputClass}
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <input
                  name="city"
                  placeholder="City *"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="state"
                  placeholder="State *"
                  required
                  value={form.state}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="zip"
                  placeholder="ZIP *"
                  required
                  value={form.zip}
                  onChange={handleChange}
                  className={`${inputClass} col-span-2 sm:col-span-1`}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Order Notes
            </h2>
            <textarea
              name="notes"
              placeholder="Any special instructions?"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </section>

          <button
            type="submit"
            className="w-full bg-[#25D366] text-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Complete Order via WhatsApp
          </button>

          <p className="text-xs text-stone-500 text-center">
            You&apos;ll be redirected to WhatsApp to confirm your order with our
            team. Payment details will be arranged there.
          </p>
        </form>

        <div className="lg:col-span-2">
          <div className="bg-stone-50 p-6 sticky top-28">
            <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-20 bg-stone-100 shrink-0 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-900 truncate">{item.name}</p>
                    {item.size && (
                      <p className="text-xs text-stone-500">{item.size}</p>
                    )}
                    <p className="text-sm font-medium mt-1">
                      {format(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Shipping</span>
                <span className="text-stone-500">
                  {qualifiesForFreeShipping(subtotal)
                    ? "Free · East Africa"
                    : `Free over $${FREE_SHIPPING_THRESHOLD_USD} USD`}
                </span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-stone-200">
                <span>Total</span>
                <span>{format(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
