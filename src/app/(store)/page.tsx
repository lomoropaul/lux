export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getHomepageProducts } from "@/lib/products";
import { getAllCategoriesWithProductCounts } from "@/lib/categories";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getHomepageProducts(8),
    getAllCategoriesWithProductCounts(),
  ]);

  const heroCollection =
    categories.find((c) => c.slug.includes("oud")) ?? categories[0];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <Image
            src="/hero.jpg"
            alt="Luxury fragrances"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 text-amber-300">
            New Collection 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl tracking-wide mb-6 leading-tight">
            The Art of
            <br />
            Fragrance
          </h1>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Explore our curated collection of luxury perfumes — from rich oud
            blends to delicate florals, crafted for those who appreciate the
            extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-stone-900 px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-100 transition-colors"
            >
              Shop Collection
            </Link>
            {heroCollection && (
              <Link
                href={`/shop?category=${heroCollection.slug}`}
                className="border border-white text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                {heroCollection.name.trim()}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-3">
              Browse by
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
              Collections
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-square bg-stone-100 overflow-hidden flex items-end p-6"
              >
                {cat.imageUrl && (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent z-10" />
                <div className="relative z-20">
                  <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-amber-200 transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-stone-300 text-xs mt-1 hidden md:block line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <p className="text-stone-400 text-xs mt-2">
                    {cat.productCount} product{cat.productCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-3">
                Handpicked
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                Our Fragrances
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.2em] uppercase text-stone-600 hover:text-amber-700 border-b border-stone-300 hover:border-amber-700 pb-0.5 transition-colors self-start md:self-auto"
            >
              View All
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-500 py-12">
              No products yet. Add some from the{" "}
              <Link href="/admin" className="text-amber-700 underline">
                admin panel
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-stone-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-4">
            Limited Time
          </p>
          <h2 className="font-serif text-3xl md:text-5xl mb-6">
            Buy 2, Get 1 Free
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-8">
            Mix and match any three fragrances from our collection. The lowest
            priced item is free. Use code LUX3 at checkout via WhatsApp.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-amber-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Authentic", desc: "100% genuine fragrances" },
            { title: "Free Shipping", desc: "On orders over $99 USD · East Africa" },
            { title: "Easy Returns", desc: "30-day return policy" },
            { title: "Secure Order", desc: "Order via WhatsApp" },
          ].map((badge) => (
            <div key={badge.title}>
              <h3 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-2">
                {badge.title}
              </h3>
              <p className="text-xs text-stone-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
