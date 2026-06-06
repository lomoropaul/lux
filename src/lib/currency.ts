export const FREE_SHIPPING_THRESHOLD_USD = 99;

export const CURRENCIES = {
  UGX: { code: "UGX", label: "Ugandan Shilling", symbol: "USh", rateFromUsd: 3800 },
  USD: { code: "USD", label: "US Dollar", symbol: "$", rateFromUsd: 1 },
  KES: { code: "KES", label: "Kenyan Shilling", symbol: "KSh", rateFromUsd: 129 },
  TZS: { code: "TZS", label: "Tanzanian Shilling", symbol: "TSh", rateFromUsd: 2650 },
  RWF: { code: "RWF", label: "Rwandan Franc", symbol: "FRw", rateFromUsd: 1350 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const DEFAULT_CURRENCY: CurrencyCode = "UGX";

export function convertFromUsd(amountUsd: number, currency: CurrencyCode) {
  return amountUsd * CURRENCIES[currency].rateFromUsd;
}

export function formatCurrency(amountUsd: number, currency: CurrencyCode) {
  const converted = convertFromUsd(amountUsd, currency);
  const { code } = CURRENCIES[currency];

  if (code === "UGX" || code === "TZS" || code === "RWF") {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 0,
    }).format(Math.round(converted));
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
}

export function qualifiesForFreeShipping(subtotalUsd: number) {
  return subtotalUsd >= FREE_SHIPPING_THRESHOLD_USD;
}
