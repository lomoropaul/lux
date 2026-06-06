import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { CategoryForm } from "@/components/CategoryForm";

export default async function NewCollectionPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-stone-900 mb-2">Add Collection</h1>
      <p className="text-sm text-stone-500 mb-8">
        Collections appear on the homepage and shop filters
      </p>
      <CategoryForm />
    </div>
  );
}
