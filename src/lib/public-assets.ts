import fs from "fs";
import path from "path";

export const PUBLIC_HERO_FILENAME = "hero.jpg";
export const PUBLIC_HERO_PATH = path.join(
  process.cwd(),
  "public",
  PUBLIC_HERO_FILENAME,
);

/** Cache-busted URL so replacing public/hero.jpg shows up immediately. */
export function getLocalHeroImageUrl(): string {
  try {
    const { mtimeMs } = fs.statSync(PUBLIC_HERO_PATH);
    return `/${PUBLIC_HERO_FILENAME}?v=${Math.floor(mtimeMs)}`;
  } catch {
    return `/${PUBLIC_HERO_FILENAME}`;
  }
}

export function heroImageExists(): boolean {
  try {
    return fs.statSync(PUBLIC_HERO_PATH).isFile();
  } catch {
    return false;
  }
}
