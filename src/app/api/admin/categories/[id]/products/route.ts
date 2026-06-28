import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { setCategoryProducts } from "@/lib/categories";

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const rows = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.categoryId, id));

  return NextResponse.json({ productIds: rows.map((r) => r.id) });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const { productIds } = await request.json();

  if (!Array.isArray(productIds)) {
    return NextResponse.json({ error: "productIds must be an array" }, { status: 400 });
  }

  await setCategoryProducts(id, productIds);
  return NextResponse.json({ success: true, count: productIds.length });
}
