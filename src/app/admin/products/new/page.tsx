import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCategories } from "@/lib/products";
import { ProductForm } from "@/components/ProductForm";

export default async function NewProductPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const categories = await getCategories();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-stone-900 mb-8">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
