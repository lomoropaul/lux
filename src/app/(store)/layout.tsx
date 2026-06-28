export const dynamic = "force-dynamic";

import { getCategories } from "@/lib/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCategories();

  return (
    <>
      <Header collections={collections} />
      <main className="flex-1">{children}</main>
      <Footer collections={collections} />
    </>
  );
}
