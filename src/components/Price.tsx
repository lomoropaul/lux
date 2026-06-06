"use client";

import { useCurrency } from "@/lib/currency-context";

export function Price({
  amount,
  className,
}: {
  amount: string | number;
  className?: string;
}) {
  const { format } = useCurrency();
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return <span className={className}>{format(num)}</span>;
}
