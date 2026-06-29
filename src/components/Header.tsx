"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, User, Sun, Moon } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useTheme } from "@/lib/theme-context";
import { FREE_SHIPPING_THRESHOLD_USD } from "@/lib/currency";
import type { Category } from "@/lib/db/schema";

type HeaderProps = {
  collections: Category[];
};

export function Header({ collections }: HeaderProps) {
  const { itemCount } = useCart();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: "/shop", label: "Shop All" },
    ...collections.slice(0, 4).map((cat) => ({
      href: `/shop?category=${cat.slug}`,
      label: cat.name,
    })),
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="bg-stone-900 dark:bg-stone-950 text-stone-100 text-center text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase py-2 px-3 sm:py-2.5 sm:px-4">
        <span className="sm:hidden">Free shipping over ${FREE_SHIPPING_THRESHOLD_USD}</span>
        <span className="hidden sm:inline">
          Free shipping on orders over ${FREE_SHIPPING_THRESHOLD_USD} USD · East Africa wide
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            type="button"
            className="md:hidden p-2 -ml-2 text-stone-700 dark:text-stone-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LUX Fragrances"
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            {/* Dark / Light toggle */}
            <button
              type="button"
              onClick={toggle}
              className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              href="/account"
              className="hidden sm:block p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white text-[10px] font-medium w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form action="/shop" method="get" className="pb-4">
            <input
              type="search"
              name="q"
              placeholder="Search fragrances..."
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-3 text-sm focus:outline-none focus:border-stone-900 dark:focus:border-stone-400 placeholder:text-stone-400 dark:placeholder:text-stone-500"
              autoFocus
            />
          </form>
        )}
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 py-4 space-y-1">
          <div className="pb-3 sm:hidden">
            <CurrencySelector />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm tracking-[0.1em] uppercase text-stone-700 dark:text-stone-300 border-b border-stone-100 dark:border-stone-800"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
