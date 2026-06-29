export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductPrices } from "@/components/ProductPrices";
import { FREE_SHIPPING_THRESHOLD_USD } from "@/lib/currency";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} | LUX Fragrances`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const extraImages = product.images?.filter((img) => img !== product.imageUrl) ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {extraImages.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {extraImages.slice(0, 4).map((img) => (
                <div
                  key={img}
                  className="relative aspect-square bg-stone-100 dark:bg-stone-800 overflow-hidden"
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400 mb-2">
            {product.brand}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-white mb-4">
            {product.name}
          </h1>

          <ProductPrices
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />

          {product.size && (
            <p className="text-sm text-stone-600 dark:text-stone-300 mb-4">
              Size: <span className="text-stone-900 dark:text-white">{product.size}</span>
            </p>
          )}

          <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {product.notes && (
            <div className="mb-8 p-4 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
              <p className="text-xs tracking-[0.15em] uppercase text-stone-500 dark:text-stone-400 mb-2">
                Fragrance Notes
              </p>
              <p className="text-sm text-stone-700 dark:text-stone-300">{product.notes}</p>
            </div>
          )}

          <div className="mt-auto space-y-4">
            <AddToCartButton product={product} />
            <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
              Free shipping on orders over ${FREE_SHIPPING_THRESHOLD_USD} USD · East Africa wide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
