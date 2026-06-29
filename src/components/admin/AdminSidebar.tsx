"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Store,
  LogOut,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/storefront", label: "Storefront", icon: ImageIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-64 shrink-0 border-r border-stone-200 bg-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-stone-200">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="LUX" width={40} height={40} className="rounded" />
          <span className="font-serif text-lg tracking-[0.1em] uppercase text-stone-900">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
              isActive(href, exact)
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-stone-200 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/">
            <Store className="size-4" />
            View Store
          </Link>
        </Button>
        <Separator className="my-2" />
        <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-600 hover:bg-stone-100 rounded-md transition-colors">
          <LogOut className="size-4 shrink-0" />
          <AdminLogoutButton />
        </div>
      </div>
    </aside>
  );
}
