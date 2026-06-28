"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CollectionProductsManagerProps = {
  categoryId: string;
  categoryName: string;
  allProducts: Product[];
  initialProductIds: string[];
};

export function CollectionProductsManager({
  categoryId,
  categoryName,
  allProducts,
  initialProductIds,
}: CollectionProductsManagerProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set(initialProductIds));
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSelected(new Set(initialProductIds));
  }, [initialProductIds]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q),
    );
  }, [allProducts, search]);

  function toggleProduct(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSuccess("");
  }

  function selectAllVisible() {
    setSelected((prev) => {
      const next = new Set(prev);
      filtered.forEach((p) => next.add(p.id));
      return next;
    });
    setSuccess("");
  }

  function clearAll() {
    setSelected(new Set());
    setSuccess("");
  }

  async function handleSave() {
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch(`/api/admin/categories/${categoryId}/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds: Array.from(selected) }),
    });

    if (res.ok) {
      setSuccess(`Saved ${selected.size} product${selected.size !== 1 ? "s" : ""} to ${categoryName}`);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save products");
    }
    setLoading(false);
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Products in this collection</CardTitle>
        <CardDescription>
          Select which products belong to &ldquo;{categoryName}&rdquo;. They will appear when
          customers browse this collection on the storefront.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-xs"
          />
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{selected.size} selected</Badge>
            <Button type="button" variant="outline" size="sm" onClick={selectAllVisible}>
              Select visible
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={clearAll}>
              Clear
            </Button>
          </div>
        </div>

        {allProducts.length === 0 ? (
          <p className="text-sm text-stone-500 py-6 text-center">
            No products yet.{" "}
            <a href="/admin/products/new" className="text-amber-700 hover:underline">
              Add a product
            </a>{" "}
            first, then assign it here.
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-stone-500 py-6 text-center">No products match your search.</p>
        ) : (
          <ul className="divide-y divide-stone-100 border border-stone-200 rounded-md max-h-96 overflow-y-auto">
            {filtered.map((product) => {
              const checked = selected.has(product.id);
              return (
                <li key={product.id}>
                  <label className="flex items-center gap-3 p-3 hover:bg-stone-50 cursor-pointer">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleProduct(product.id)}
                    />
                    <div className="relative w-10 h-12 bg-stone-100 rounded overflow-hidden shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{product.name}</p>
                      <p className="text-xs text-stone-500">{product.brand}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-700 text-sm">{success}</p>}

        <Button type="button" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save products to collection"}
        </Button>
      </CardContent>
    </Card>
  );
}
