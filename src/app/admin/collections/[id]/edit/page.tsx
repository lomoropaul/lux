import { redirect, notFound } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCategoryById } from "@/lib/categories";
import { CategoryForm } from "@/components/CategoryForm";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) notFound();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-stone-900 mb-8">Edit Collection</h1>
      <CategoryForm category={category} />
    </div>
  );
}
