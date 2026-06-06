import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify } from "@/lib/utils";
import { randomUUID } from "crypto";

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  const id = randomUUID();
  const slug = body.slug || slugify(body.name);

  const [product] = await db
    .insert(products)
    .values({
      id,
      name: body.name,
      slug,
      description: body.description,
      price: body.price,
      compareAtPrice: body.compareAtPrice || null,
      imageUrl: body.imageUrl,
      images: body.images || [],
      categoryId: body.categoryId || null,
      brand: body.brand || "LUX",
      size: body.size || null,
      notes: body.notes || null,
      featured: body.featured ?? false,
      inStock: body.inStock ?? true,
      stockCount: body.stockCount ?? 0,
    })
    .returning();

  return NextResponse.json(product);
}
