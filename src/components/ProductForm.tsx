"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/ImageUploadField";
import type { Product, Category } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type ProductFormProps = {
  product?: Product;
  categories: Category[];
};

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    compareAtPrice: product?.compareAtPrice ?? "",
    imageUrl: product?.imageUrl ?? "",
    images: product?.images ?? ([] as string[]),
    categoryId: product?.categoryId ?? "",
    brand: product?.brand ?? "LUX",
    size: product?.size ?? "",
    notes: product?.notes ?? "",
    featured: product?.featured ?? false,
    inStock: product?.inStock ?? true,
    stockCount: product?.stockCount ?? 0,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && !product ? { slug: slugify(value) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = product
      ? `/api/admin/products/${product.id}`
      : "/api/admin/products";
    const method = product ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        compareAtPrice: form.compareAtPrice || null,
        categoryId: form.categoryId || null,
      }),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
    setLoading(false);
  }

  const selectClass =
    "flex h-9 w-full rounded-md border border-stone-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" value={form.slug} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compareAtPrice">Compare At (USD)</Label>
          <Input id="compareAtPrice" name="compareAtPrice" type="number" step="0.01" value={form.compareAtPrice} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stockCount">Stock Count</Label>
          <Input id="stockCount" name="stockCount" type="number" value={form.stockCount} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" value={form.brand} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="size">Size</Label>
          <Input id="size" name="size" value={form.size} onChange={handleChange} placeholder="e.g. 100ml EDP" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Collection</Label>
        <select id="categoryId" name="categoryId" value={form.categoryId} onChange={handleChange} className={selectClass}>
          <option value="">No collection</option>
          {categories.length === 0 ? (
            <option value="" disabled>
              Create a collection first in Admin → Collections
            </option>
          ) : (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          )}
        </select>
        <p className="text-xs text-stone-500">
          Or assign multiple products from{" "}
          <a href="/admin/collections" className="text-amber-700 hover:underline">
            Admin → Collections → Edit &amp; products
          </a>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Fragrance Notes</Label>
        <Input id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Top: Bergamot · Heart: Rose · Base: Oud" />
      </div>

      <ImageUploadField
        label="Product Image"
        hint="Required. Drag & drop or tap to upload the main product photo."
        endpoint="productImage"
        value={form.imageUrl}
        onChange={(url) =>
          setForm((prev) => ({
            ...prev,
            imageUrl: url,
            images: [...new Set([...prev.images, url])],
          }))
        }
        onClear={() => setForm((prev) => ({ ...prev, imageUrl: "" }))}
        onError={setError}
        previewAspect="portrait"
      />

      {form.images.length > 1 && (
        <div className="space-y-2">
          <Label>Additional images</Label>
          <p className="text-xs text-stone-500">
            {form.images.length} image{form.images.length !== 1 ? "s" : ""} saved
          </p>
        </div>
      )}

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
          <Checkbox
            checked={form.featured}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, featured: checked === true }))
            }
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
          <Checkbox
            checked={form.inStock}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, inStock: checked === true }))
            }
          />
          In Stock
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading || !form.imageUrl}>
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
