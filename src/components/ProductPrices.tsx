"use client";

import { Price } from "@/components/Price";

export function ProductPrices({
  price,
  compareAtPrice,
}: {
  price: string;
  compareAtPrice: string | null;
}) {
  const num = parseFloat(price);
  const compareAt = compareAtPrice ? parseFloat(compareAtPrice) : null;
  const onSale = compareAt && compareAt > num;

  return (
    <div className="flex items-center gap-3 mb-6">
      <Price amount={num} className="text-2xl font-medium text-stone-900" />
      {onSale && (
        <Price amount={compareAt} className="text-lg text-stone-400 line-through" />
      )}
    </div>
  );
}
