import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  const slug = body.slug || slugify(body.name);

  const [category] = await db
    .insert(categories)
    .values({
      id: randomUUID(),
      name: body.name,
      slug,
      description: body.description || null,
      imageUrl: body.imageUrl || null,
    })
    .returning();

  return NextResponse.json(category);
}
