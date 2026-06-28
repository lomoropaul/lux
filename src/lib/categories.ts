import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { eq, count, inArray } from "drizzle-orm";

export async function getAllCategoriesAdmin() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function getAllCategoriesWithProductCounts() {
  const allCategories = await db.select().from(categories).orderBy(categories.name);

  const counts = await db
    .select({
      categoryId: products.categoryId,
      productCount: count(),
    })
    .from(products)
    .groupBy(products.categoryId);

  const countMap = Object.fromEntries(
    counts
      .filter((row) => row.categoryId)
      .map((row) => [row.categoryId!, Number(row.productCount)]),
  );

  return allCategories.map((cat) => ({
    ...cat,
    productCount: countMap[cat.id] ?? 0,
  }));
}

export async function getCategoryById(id: string) {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
  return category ?? null;
}

export async function getCategoryProductIds(categoryId: string) {
  const rows = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.categoryId, categoryId));
  return rows.map((r) => r.id);
}

export async function setCategoryProducts(categoryId: string, productIds: string[]) {
  await db
    .update(products)
    .set({ categoryId: null, updatedAt: new Date() })
    .where(eq(products.categoryId, categoryId));

  if (productIds.length > 0) {
    await db
      .update(products)
      .set({ categoryId, updatedAt: new Date() })
      .where(inArray(products.id, productIds));
  }
}

export type CategoryWithCount = Awaited<
  ReturnType<typeof getAllCategoriesWithProductCounts>
>[number];
