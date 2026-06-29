"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Category } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { UploadButton } from "@/components/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CategoryFormProps = {
  category?: Category;
  /** When true, stay on the edit page after saving (for product assignment). */
  stayOnPage?: boolean;
};

export function CategoryForm({ category, stayOnPage = false }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? "",
    imageUrl: category?.imageUrl ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && !category ? { slug: slugify(value) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = category
      ? `/api/admin/categories/${category.id}`
      : "/api/admin/categories";
    const method = category ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      if (category && stayOnPage) {
        setSuccess("Collection details saved");
        router.refresh();
      } else if (!category) {
        router.push(`/admin/collections/${data.id}/edit`);
      } else {
        router.push("/admin/collections");
      }
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
    setLoading(false);
  }

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
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Collection Image</Label>
        {form.imageUrl && (
          <div className="relative w-full h-40 bg-stone-100 rounded-md overflow-hidden mb-3">
            <Image src={form.imageUrl} alt="Collection" fill className="object-cover" sizes="400px" />
          </div>
        )}
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
            if (res?.[0]) setForm((prev) => ({ ...prev, imageUrl: res[0].ufsUrl }));
          }}
          onUploadError={(err) => setError(err.message)}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-700 text-sm">{success}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : category ? "Update Collection" : "Create Collection"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
