import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  clearHeroImageUrl,
  getHeroImageUrl,
  setHeroImageUrl,
} from "@/lib/site-settings";

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const url = await getHeroImageUrl();
  return NextResponse.json({ url });
}

export async function PUT(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { url } = await request.json();
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  await setHeroImageUrl(url);
  return NextResponse.json({ success: true, url });
}

export async function DELETE() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await clearHeroImageUrl();
  const url = await getHeroImageUrl();
  return NextResponse.json({ success: true, url });
}
