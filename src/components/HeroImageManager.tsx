"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageUploadField } from "@/components/ImageUploadField";
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
          Upload a new hero image — works on Vercel without editing files.
          Recommended: 1920×1080, under 4MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!usingUploadedImage && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-stone-700">Current hero</p>
            <div className="relative w-full aspect-[16/9] max-w-2xl bg-stone-100 rounded-md overflow-hidden border border-stone-200">
              <Image
                src={currentUrl}
                alt="Current hero"
                fill
                className="object-cover object-[center_30%] sm:object-center"
                sizes="(max-width: 768px) 100vw, 672px"
                unoptimized={currentUrl.startsWith("/")}
              />
            </div>
            <p className="text-xs text-stone-500">
              Using default public/hero.jpg — upload below to replace on production.
            </p>
          </div>
        )}

        <ImageUploadField
          label={usingUploadedImage ? "Hero image" : "Upload new hero"}
          hint="Drag & drop or tap to upload"
          endpoint="heroImage"
          value={usingUploadedImage ? currentUrl : ""}
          onChange={saveHeroUrl}
          onError={setError}
          previewAspect="wide"
          allowedContent="PNG, JPG or WEBP up to 8MB"
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

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-700 text-sm">{success}</p>}
        {loading && <p className="text-stone-500 text-sm">Saving...</p>}
      </CardContent>
    </Card>
  );
}
