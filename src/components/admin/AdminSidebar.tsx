"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Layers,
  Store,
  LogOut,
  ImageIcon,
  Menu,
  X,
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

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <>
      {navItems.map(({ href, label, icon: Icon, exact }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
            isActive(href, exact)
              ? "bg-stone-900 text-white"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900",
          )}
        >
          <Icon className="size-4 shrink-0" />
          {label}
        </Link>
      ))}
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-stone-200 bg-white px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2 min-w-0">
          <Image src="/logo.png" alt="LUX" width={32} height={32} className="rounded shrink-0" />
          <span className="font-serif text-base tracking-[0.08em] uppercase text-stone-900 truncate">
            Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 text-stone-700 shrink-0"
          aria-label="Toggle admin menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-stone-200 bg-white flex flex-col min-h-screen transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "md:top-0 top-[57px]",
        )}
      >
        <div className="hidden md:block p-5 border-b border-stone-200">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="LUX" width={40} height={40} className="rounded" />
            <span className="font-serif text-lg tracking-[0.1em] uppercase text-stone-900">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </nav>

        <div className="p-3 border-t border-stone-200 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3" asChild>
            <Link href="/" onClick={() => setOpen(false)}>
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
    </>
  );
}
