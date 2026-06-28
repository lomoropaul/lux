import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllProductsAdmin } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "@/components/DeleteProductButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminProductsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const products = await getAllProductsAdmin();

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Products</h1>
          <p className="text-sm text-stone-500 mt-1">{products.length} total</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-stone-500">
            No products yet.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase text-stone-500">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase text-stone-500 hidden lg:table-cell">
                    Collection
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase text-stone-500 hidden sm:table-cell">
                    Price (USD)
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase text-stone-500 hidden md:table-cell">
                    Stock
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium uppercase text-stone-500 hidden md:table-cell">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium uppercase text-stone-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-stone-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 bg-stone-100 shrink-0 overflow-hidden rounded">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-stone-900">{product.name}</p>
                          <p className="text-xs text-stone-500">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {product.categoryName ? (
                        <Badge variant="outline">{product.categoryName}</Badge>
                      ) : (
                        <span className="text-stone-400 text-xs">Uncategorized</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {product.stockCount}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant={product.inStock ? "success" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
