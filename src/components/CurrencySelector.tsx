"use client";

import { useCurrency } from "@/lib/currency-context";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className="text-xs tracking-wider uppercase bg-transparent border border-stone-300 px-2 py-1.5 focus:outline-none focus:border-stone-900 cursor-pointer"
      aria-label="Select currency"
    >
      {Object.entries(CURRENCIES).map(([code, { label }]) => (
        <option key={code} value={code}>
          {code} — {label}
        </option>
      ))}
    </select>
  );
}
