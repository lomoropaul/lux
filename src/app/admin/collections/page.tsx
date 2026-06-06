import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllCategoriesAdmin } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DeleteCategoryButton } from "@/components/DeleteCategoryButton";

export default async function AdminCollectionsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const collections = await getAllCategoriesAdmin();

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Collections</h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage product categories shown on the storefront
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/collections/new">Add Collection</Link>
        </Button>
      </div>

      {collections.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-stone-500">
            No collections yet. Create your first collection to organize products.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {collections.map((collection) => (
            <Card key={collection.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative w-16 h-16 rounded-md bg-stone-100 overflow-hidden shrink-0">
                  {collection.imageUrl ? (
                    <Image
                      src={collection.imageUrl}
                      alt={collection.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{collection.name}</CardTitle>
                    <Badge variant="outline">{collection.slug}</Badge>
                  </div>
                  {collection.description && (
                    <p className="text-sm text-stone-500 mt-1 truncate">
                      {collection.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/collections/${collection.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteCategoryButton id={collection.id} name={collection.name} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
