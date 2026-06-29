"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadButton } from "@/components/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type HeroImageManagerProps = {
  currentUrl: string;
  usingUploadedImage: boolean;
};

export function HeroImageManager({
  currentUrl,
  usingUploadedImage,
}: HeroImageManagerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function saveHeroUrl(url: string) {
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      setSuccess("Hero image updated. Check the storefront homepage.");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save hero image");
    }
    setLoading(false);
  }

  async function resetToDefault() {
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/admin/hero", { method: "DELETE" });
    if (res.ok) {
      setSuccess("Using default public/hero.jpg again.");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to reset hero image");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage hero image</CardTitle>
        <CardDescription>
          Upload a new hero image here — works on Vercel production without editing
          files. Recommended: 1920×1080 or similar, under 4MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full max-w-2xl aspect-[16/9] bg-stone-100 rounded-md overflow-hidden">
          <Image
            src={currentUrl}
            alt="Current hero"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            unoptimized={currentUrl.startsWith("/")}
          />
        </div>

        <p className="text-sm text-stone-500">
          {usingUploadedImage
            ? "Using uploaded hero image (stored in database)."
            : "Using default file at public/hero.jpg."}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <UploadButton
            endpoint="heroImage"
            onClientUploadComplete={(res) => {
              const url =
                res?.[0]?.url ?? (res?.[0] as { ufsUrl?: string } | undefined)?.ufsUrl;
              if (url) saveHeroUrl(url);
            }}
            onUploadError={(err) => setError(err.message)}
          />
          {usingUploadedImage && (
            <Button
              type="button"
              variant="outline"
              onClick={resetToDefault}
              disabled={loading}
            >
              Use default hero.jpg
            </Button>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-700 text-sm">{success}</p>}
        {loading && <p className="text-stone-500 text-sm">Saving...</p>}
      </CardContent>
    </Card>
  );
}
