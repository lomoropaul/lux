import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getLocalHeroImageUrl } from "@/lib/public-assets";

export const HERO_IMAGE_KEY = "hero_image_url";

export async function getSetting(key: string): Promise<string | null> {
  try {
    const [row] = await db
      .select({ value: siteSettings.value })
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);
    return row?.value ?? null;
  } catch {
    return null;
  }
}

export async function setSetting(key: string, value: string) {
  await db
    .insert(siteSettings)
    .values({ key, value, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

export async function getHeroImageUrl(): Promise<string> {
  const url = await getSetting(HERO_IMAGE_KEY);
  if (url) return url;
  return getLocalHeroImageUrl();
}

export async function setHeroImageUrl(url: string) {
  await setSetting(HERO_IMAGE_KEY, url);
}

export async function clearHeroImageUrl() {
  await db.delete(siteSettings).where(eq(siteSettings.key, HERO_IMAGE_KEY));
}
