import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getHeroImageUrl, getSetting, HERO_IMAGE_KEY } from "@/lib/site-settings";
import { HeroImageManager } from "@/components/HeroImageManager";

export default async function AdminStorefrontPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const [currentUrl, uploadedUrl] = await Promise.all([
    getHeroImageUrl(),
    getSetting(HERO_IMAGE_KEY),
  ]);

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold text-stone-900 mb-2">Storefront</h1>
      <p className="text-sm text-stone-500 mb-8">
        Manage homepage visuals. To change the hero on production (Vercel), upload
        here — you do not need to edit public/hero.jpg directly.
      </p>
      <HeroImageManager
        currentUrl={currentUrl}
        usingUploadedImage={Boolean(uploadedUrl)}
      />
    </div>
  );
}
