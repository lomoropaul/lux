import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { randomUUID } from "crypto";
import * as schema from "../src/lib/db/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

const categories = [
  {
    id: randomUUID(),
    name: "Oud Collection",
    slug: "oud",
    description: "Rich, woody oud fragrances",
  },
  {
    id: randomUUID(),
    name: "Floral",
    slug: "floral",
    description: "Elegant floral compositions",
  },
  {
    id: randomUUID(),
    name: "Unisex",
    slug: "unisex",
    description: "Versatile scents for everyone",
  },
  {
    id: randomUUID(),
    name: "Men",
    slug: "men",
    description: "Bold masculine fragrances",
  },
];

const products = [
  {
    name: "Oud for Glory",
    slug: "oud-for-glory",
    description:
      "A majestic blend of saffron, nutmeg, and rich agarwood. Warm, spicy, and deeply luxurious — a signature scent for the discerning.",
    price: "49.99",
    compareAtPrice: "65.00",
    imageUrl:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Saffron, Nutmeg · Heart: Agarwood · Base: Patchouli, Musk",
    featured: true,
    categorySlug: "oud",
  },
  {
    name: "Yara",
    slug: "yara",
    description:
      "A sweet and tropical floral with notes of vanilla orchid and heliotrope. Playful yet sophisticated, perfect for everyday elegance.",
    price: "39.99",
    compareAtPrice: "55.00",
    imageUrl:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Heliotrope · Heart: Orchid, Tuberose · Base: Vanilla, Musk",
    featured: true,
    categorySlug: "floral",
  },
  {
    name: "Asad",
    slug: "asad",
    description:
      "A powerful amber-spice fragrance with black pepper and tobacco. Bold and commanding, made for those who leave a lasting impression.",
    price: "44.99",
    compareAtPrice: null,
    imageUrl:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Black Pepper, Pineapple · Heart: Tobacco · Base: Amber, Vanilla",
    featured: true,
    categorySlug: "men",
  },
  {
    name: "Raghba",
    slug: "raghba",
    description:
      "An intoxicating gourmand oud with caramel and vanilla sweetness. Warm, inviting, and utterly addictive.",
    price: "34.99",
    compareAtPrice: "45.00",
    imageUrl:
      "https://images.unsplash.com/photo-1523293182083-76590a94900c?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Caramel · Heart: Oud, Rose · Base: Vanilla, Sandalwood",
    featured: true,
    categorySlug: "oud",
  },
  {
    name: "Nebras",
    slug: "nebras",
    description:
      "A luminous unisex fragrance blending saffron, rose, and soft musk. Radiant and modern with timeless appeal.",
    price: "42.99",
    compareAtPrice: null,
    imageUrl:
      "https://images.unsplash.com/photo-1595425970377-c9700294a2a4?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Saffron · Heart: Rose, Jasmine · Base: Musk, Amber",
    featured: false,
    categorySlug: "unisex",
  },
  {
    name: "Fakhar",
    slug: "fakhar",
    description:
      "A fresh aromatic fougère with lavender and ambergris. Clean, confident, and effortlessly stylish.",
    price: "37.99",
    compareAtPrice: "50.00",
    imageUrl:
      "https://images.unsplash.com/photo-1547883524-a02151c009ff?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Lavender, Bergamot · Heart: Geranium · Base: Ambergris, Cedar",
    featured: false,
    categorySlug: "men",
  },
  {
    name: "Mayar",
    slug: "mayar",
    description:
      "A delicate floral musk with peony and white amber. Soft, feminine, and gracefully enchanting.",
    price: "36.99",
    compareAtPrice: null,
    imageUrl:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Peony · Heart: Rose, Jasmine · Base: White Amber, Musk",
    featured: true,
    categorySlug: "floral",
  },
  {
    name: "Khamrah",
    slug: "khamrah",
    description:
      "A warm spicy gourmand with cinnamon, dates, and praline. Cozy, indulgent, and perfect for cooler evenings.",
    price: "46.99",
    compareAtPrice: "60.00",
    imageUrl:
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&q=80",
    brand: "LUX",
    size: "100ml EDP",
    notes: "Top: Cinnamon, Nutmeg · Heart: Dates, Praline · Base: Vanilla, Benzoin",
    featured: true,
    categorySlug: "unisex",
  },
];

async function seed() {
  console.log("Seeding database...");

  for (const cat of categories) {
    await db
      .insert(schema.categories)
      .values(cat)
      .onConflictDoNothing({ target: schema.categories.slug });
  }

  const allCategories = await db.select().from(schema.categories);
  const catMap = Object.fromEntries(allCategories.map((c) => [c.slug, c.id]));

  for (const p of products) {
    const { categorySlug, ...product } = p;
    await db
      .insert(schema.products)
      .values({
        id: randomUUID(),
        ...product,
        categoryId: catMap[categorySlug] ?? null,
        inStock: true,
        stockCount: 50,
        images: [product.imageUrl],
      })
      .onConflictDoNothing({ target: schema.products.slug });
  }

  console.log("Seed complete!");
  await client.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
