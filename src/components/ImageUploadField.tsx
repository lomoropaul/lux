"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { UploadDropzone, UploadButton } from "@/components/uploadthing";
import type { OurFileRouter } from "@/lib/uploadthing";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

type Endpoint = keyof OurFileRouter;

type ImageUploadFieldProps = {
  label: string;
  hint?: string;
  endpoint: Endpoint;
  value: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  onError?: (message: string) => void;
  previewAspect?: "video" | "portrait" | "square" | "wide";
  allowedContent?: string;
};

function getUploadUrl(file: { url?: string; ufsUrl?: string } | undefined) {
  if (!file) return undefined;
  return file.url ?? file.ufsUrl;
}

const previewAspectClass = {
  video: "aspect-video",
  portrait: "aspect-[3/4] max-w-[160px]",
  square: "aspect-square max-w-xs",
  wide: "aspect-[16/9] max-w-2xl",
};

export function ImageUploadField({
  label,
  hint,
  endpoint,
  value,
  onChange,
  onClear,
  onError,
  previewAspect = "square",
  allowedContent = "PNG, JPG or WEBP up to 4MB",
}: ImageUploadFieldProps) {
  function handleUploadComplete(
    res: { url?: string; ufsUrl?: string }[] | undefined,
  ) {
    const url = getUploadUrl(res?.[0]);
    if (url) onChange(url);
  }

  return (
    <div className="space-y-3">
      <div>
        <Label>{label}</Label>
        {hint && <p className="text-xs text-stone-500 mt-1">{hint}</p>}
      </div>

      {value ? (
        <div className="space-y-3">
          <div
            className={cn(
              "relative w-full bg-stone-100 rounded-md overflow-hidden border border-stone-200",
              previewAspectClass[previewAspect],
            )}
          >
            <Image
              src={value}
              alt="Upload preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition-colors"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <UploadButton
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(err) => onError?.(err.message)}
            content={{ button: "Replace image" }}
          />
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(err) => onError?.(err.message)}
          appearance={{
            container:
              "border-2 border-dashed border-stone-300 rounded-lg bg-stone-50 hover:bg-stone-100/80 transition-colors ut-uploading:opacity-60",
            label: "text-stone-600 text-sm",
            allowedContent: "text-stone-400 text-xs",
            button:
              "bg-stone-900 text-white text-xs tracking-wider uppercase px-4 py-2 rounded-md ut-ready:bg-stone-900 ut-uploading:bg-stone-600",
          }}
          content={{
            label: "Drag & drop an image here, or click to browse",
            allowedContent: allowedContent,
          }}
        />
      )}

      {!value && (
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <ImageIcon className="size-3.5 shrink-0" />
          <span>Tap the area above on mobile, or drag a file on desktop</span>
        </div>
      )}
    </div>
  );
}
