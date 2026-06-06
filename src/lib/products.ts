import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq, desc, and, ilike, or } from "drizzle-orm";
import type { Product } from "@/lib/db/schema";

export { formatPrice, slugify } from "@/lib/utils";

export async function getFeaturedProducts(limit = 8) {
  return db
    .select()
    .from(products)
    .where(and(eq(products.featured, true), eq(products.inStock, true)))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function getAllProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.inStock, true))
    .orderBy(desc(products.createdAt));
}

export async function getProductBySlug(slug: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return product ?? null;
}

export async function getProductById(id: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  return product ?? null;
}

export async function getAllProductsAdmin() {
  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function getCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function searchProducts(query: string) {
  const pattern = `%${query}%`;
  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.inStock, true),
        or(
          ilike(products.name, pattern),
          ilike(products.brand, pattern),
          ilike(products.description, pattern),
        ),
      ),
    )
    .orderBy(desc(products.createdAt));
}

export async function getProductsByCategory(slug: string) {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  if (!category) return { category: null, products: [] as Product[] };

  const items = await db
    .select()
    .from(products)
    .where(and(eq(products.categoryId, category.id), eq(products.inStock, true)))
    .orderBy(desc(products.createdAt));

  return { category, products: items };
}
