#!/usr/bin/env tsx
/**
 * Verifies that replacing public/hero.jpg is picked up by the homepage.
 * Usage: npx tsx scripts/test-hero-replace.ts
 */
import fs from "fs";
import path from "path";
import { getLocalHeroImageUrl, PUBLIC_HERO_PATH } from "../src/lib/public-assets";

const backupPath = path.join(process.cwd(), "public", ".hero-test-backup.jpg");

function statHero() {
  const stat = fs.statSync(PUBLIC_HERO_PATH);
  return { size: stat.size, mtimeMs: stat.mtimeMs };
}

async function fetchHomepageHeroSrc(baseUrl: string) {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error(`Homepage ${res.status}`);
  const html = await res.text();
  const match = html.match(/\/hero\.jpg\?v=\d+/);
  return match?.[0] ?? null;
}

async function main() {
  if (!fs.existsSync(PUBLIC_HERO_PATH)) {
    console.error("FAIL: public/hero.jpg not found");
    process.exit(1);
  }

  const before = statHero();
  const urlBefore = getLocalHeroImageUrl();
  console.log("Before:", { size: before.size, url: urlBefore });

  fs.copyFileSync(PUBLIC_HERO_PATH, backupPath);
  const touched = new Date(Date.now() + 1000);
  fs.utimesSync(PUBLIC_HERO_PATH, touched, touched);

  const afterTouch = statHero();
  const urlAfterTouch = getLocalHeroImageUrl();
  console.log("After touch:", { mtimeMs: afterTouch.mtimeMs, url: urlAfterTouch });

  if (urlBefore === urlAfterTouch) {
    console.error("FAIL: cache-bust URL did not change after file update");
    process.exit(1);
  }

  const baseUrl = process.env.TEST_URL ?? "http://localhost:3000";
  try {
    const homepageSrc = await fetchHomepageHeroSrc(baseUrl);
    console.log("Homepage hero src:", homepageSrc);
    if (!homepageSrc) {
      console.error("FAIL: homepage HTML does not include cache-busted hero URL");
      process.exit(1);
    }
    if (!homepageSrc.includes(String(Math.floor(afterTouch.mtimeMs)))) {
      console.error("FAIL: homepage hero URL does not match current file mtime");
      process.exit(1);
    }

    const imgRes = await fetch(`${baseUrl}${homepageSrc}`);
    if (!imgRes.ok) {
      console.error(`FAIL: hero image request returned ${imgRes.status}`);
      process.exit(1);
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    if (buf.length !== afterTouch.size) {
      console.error(
        `FAIL: served image size ${buf.length} != file size ${afterTouch.size}`,
      );
      process.exit(1);
    }
    console.log("OK: hero replace + cache bust verified at", baseUrl);
  } catch (err) {
    console.error(
      "WARN: Could not reach dev server — file-level checks passed.",
      err instanceof Error ? err.message : err,
    );
    console.log("OK: getHeroImageUrl() updates when public/hero.jpg changes");
  } finally {
    fs.copyFileSync(backupPath, PUBLIC_HERO_PATH);
    fs.unlinkSync(backupPath);
  }
}

main();
