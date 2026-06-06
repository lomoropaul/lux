import { redirect, notFound } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getProductById, getCategories } from "@/lib/products";
import { ProductForm } from "@/components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-stone-900 mb-8">Edit Product</h1>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
