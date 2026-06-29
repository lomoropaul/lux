export const dynamic = "force-dynamic";

import { ProductCard } from "@/components/ProductCard";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} from "@/lib/products";

export const metadata = {
  title: "Shop All | LUX Fragrances",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  let title = "All Fragrances";
  let productList;

  if (params.q) {
    productList = await searchProducts(params.q);
    title = `Results for "${params.q}"`;
  } else if (params.category) {
    const { category, products } = await getProductsByCategory(params.category);
    productList = products;
    title = category?.name ?? "Collection";
  } else {
    productList = await getAllProducts();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-amber-700 mb-2 sm:mb-3">
          Our Collection
        </p>
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-stone-900 px-2">
          {title.trim()}
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-2 sm:mt-3">
          {productList.length} fragrance{productList.length !== 1 ? "s" : ""}
        </p>
      </div>

      {productList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-6 md:gap-y-12">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-stone-500 mb-4">No fragrances found.</p>
          <a
            href="/shop"
            className="text-xs tracking-[0.2em] uppercase text-amber-700 hover:underline"
          >
            View all products
          </a>
        </div>
      )}
    </div>
  );
}
