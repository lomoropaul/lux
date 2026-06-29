import { redirect, notFound } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCategoryById, getCategoryProductIds } from "@/lib/categories";
import { getAllProductsAdmin } from "@/lib/products";
import { CategoryForm } from "@/components/CategoryForm";
import { CollectionProductsManager } from "@/components/CollectionProductsManager";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { id } = await params;
  const [category, allProducts, productIds] = await Promise.all([
    getCategoryById(id),
    getAllProductsAdmin(),
    getCategoryProductIds(id),
  ]);

  if (!category) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-stone-900 mb-2">Edit Collection</h1>
      <p className="text-sm text-stone-500 mb-8">
        Update collection details and assign products below
      </p>
      <CategoryForm category={category} stayOnPage />
      <CollectionProductsManager
        categoryId={category.id}
        categoryName={category.name}
        allProducts={allProducts}
        initialProductIds={productIds}
      />
    </div>
  );
}
