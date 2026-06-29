export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getHomepageProducts } from "@/lib/products";
import { getAllCategoriesWithProductCounts } from "@/lib/categories";
import { getHeroImageUrl } from "@/lib/site-settings";

export default async function HomePage() {
  const [bestSellers, categories, heroSrc] = await Promise.all([
    getHomepageProducts(8),
    getAllCategoriesWithProductCounts(),
    getHeroImageUrl(),
  ]);

  return (
    <>
      {/* Hero — tuned for mobile viewports (svh) and focal point */}
      <section className="relative flex items-center justify-center overflow-hidden h-[52svh] min-h-[300px] sm:h-[58svh] sm:min-h-[380px] md:h-[70vh] md:min-h-[480px]">
        <div className="absolute inset-0 bg-stone-900">
          <Image
            src={heroSrc}
            alt="Luxury fragrances"
            fill
            className="object-cover object-[center_30%] sm:object-[center_35%] md:object-center opacity-65 sm:opacity-60"
            priority
            sizes="100vw"
            unoptimized={heroSrc.startsWith("/")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/70 md:from-stone-900/30 md:via-transparent md:to-stone-900/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-3xl w-full">
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 text-amber-300">
            New Collection 2026
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl tracking-wide mb-4 sm:mb-6 leading-tight">
            WHERE LUXURY MEETS ELEGANCE
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto px-1">
            Explore our curated collection of luxury perfumes — crafted for those
            who appreciate the extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
            <Link
              href="/shop"
              className="bg-white text-stone-900 px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-amber-100 transition-colors text-center"
            >
              Shop Collection
            </Link>
            <Link
              href="#best-sellers"
              className="border border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors text-center"
            >
              Best Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers — primary product showcase */}
      <section
        id="best-sellers"
        className="py-12 sm:py-16 md:py-24 bg-white scroll-mt-16 md:scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 mb-2 sm:mb-3">
                Handpicked
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-stone-600 hover:text-amber-700 border-b border-stone-300 hover:border-amber-700 pb-0.5 transition-colors self-start"
            >
              View All
            </Link>
          </div>

          {bestSellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-6 md:gap-y-12">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-500 py-12 text-sm">
              No products yet. Add some from the{" "}
              <Link href="/admin" className="text-amber-700 underline">
                admin panel
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Collections */}
      {categories.length > 0 && (
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 mb-2 sm:mb-3">
              Browse by
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900">
              Collections
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-[4/3] sm:aspect-square bg-stone-100 overflow-hidden flex items-end p-4 sm:p-6 rounded-sm"
              >
                {cat.imageUrl && (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent z-10" />
                <div className="relative z-20 w-full">
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-white group-hover:text-amber-200 transition-colors line-clamp-2">
                    {cat.name.trim()}
                  </h3>
                  {cat.description && (
                    <p className="text-stone-300 text-[10px] sm:text-xs mt-1 line-clamp-2 hidden sm:block">
                      {cat.description}
                    </p>
                  )}
                  <p className="text-stone-400 text-[10px] sm:text-xs mt-1.5 sm:mt-2">
                    {cat.productCount} product{cat.productCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="bg-stone-900 text-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-400 mb-3 sm:mb-4">
            Limited Time
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-6">
            Buy 2, Get 1 Free
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto">
            Mix and match any three fragrances. The lowest priced item is free.
            Use code LUX3 at checkout via WhatsApp.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-amber-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-amber-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-10 sm:py-16 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { title: "Authentic", desc: "100% genuine fragrances" },
            { title: "Free Shipping", desc: "Orders over $99 USD · East Africa" },
            { title: "Easy Returns", desc: "30-day return policy" },
            { title: "Secure Order", desc: "Order via WhatsApp" },
          ].map((badge) => (
            <div key={badge.title}>
              <h3 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-stone-900 mb-1.5 sm:mb-2">
                {badge.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-stone-500 leading-relaxed">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
