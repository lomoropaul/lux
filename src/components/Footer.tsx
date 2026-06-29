import Image from "next/image";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD_USD } from "@/lib/currency";
import type { Category } from "@/lib/db/schema";

type FooterProps = {
  collections: Category[];
};

export function Footer({ collections }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Image
            src="/logo.png"
            alt="LUX ESSENCE"
            width={100}
            height={36}
            className="h-9 w-auto mb-4"
          />
          <p className="text-sm leading-relaxed text-stone-400">
            Curated luxury fragrances inspired by the world&apos;s finest
            perfumeries. Authentic scents, exceptional quality.
          </p>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-white mb-4">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-white transition-colors">
                All Fragrances
              </Link>
            </li>
            {collections.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-white mb-4">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.2em] uppercase text-white mb-4">
            Newsletter
          </h3>
          <p className="text-sm text-stone-400 mb-4">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-stone-800 border border-stone-700 px-3 py-2.5 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-700"
            />
            <button
              type="submit"
              className="bg-amber-700 text-white px-4 py-2.5 text-xs tracking-wider uppercase hover:bg-amber-600 transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500 tracking-wide px-4">
        © {new Date().getFullYear()} LUX ESSENCE. All rights reserved.
        &nbsp;·&nbsp; Free shipping over ${FREE_SHIPPING_THRESHOLD_USD} USD across East Africa
      </div>
    </footer>
  );
}
