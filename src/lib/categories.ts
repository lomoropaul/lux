import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { eq, inArray, isNotNull } from "drizzle-orm";

export async function getAllCategoriesAdmin() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function getAllCategoriesWithProductCounts() {
  const allCategories = await db.select().from(categories).orderBy(categories.name);

  const assignedProducts = await db
    .select({
      id: products.id,
      name: products.name,
      categoryId: products.categoryId,
    })
    .from(products)
    .where(isNotNull(products.categoryId));

  const productsByCategory: Record<string, { id: string; name: string }[]> = {};
  for (const product of assignedProducts) {
    if (!product.categoryId) continue;
    if (!productsByCategory[product.categoryId]) {
      productsByCategory[product.categoryId] = [];
    }
    productsByCategory[product.categoryId].push({
      id: product.id,
      name: product.name,
    });
  }

  return allCategories.map((cat) => {
    const catProducts = productsByCategory[cat.id] ?? [];
    return {
      ...cat,
      productCount: catProducts.length,
      products: catProducts,
    };
  });
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
