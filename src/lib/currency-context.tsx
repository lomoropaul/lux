"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type CurrencyCode,
  DEFAULT_CURRENCY,
  CURRENCIES,
  formatCurrency,
  convertFromUsd,
} from "@/lib/currency";

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountUsd: number) => string;
  convert: (amountUsd: number) => number;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const STORAGE_KEY = "lux-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (stored && stored in CURRENCIES) setCurrencyState(stored);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const format = useCallback(
    (amountUsd: number) => formatCurrency(amountUsd, currency),
    [currency],
  );

  const convert = useCallback(
    (amountUsd: number) => convertFromUsd(amountUsd, currency),
    [currency],
  );

  if (!hydrated) {
    return (
      <CurrencyContext.Provider
        value={{
          currency: DEFAULT_CURRENCY,
          setCurrency,
          format: (n) => formatCurrency(n, DEFAULT_CURRENCY),
          convert: (n) => convertFromUsd(n, DEFAULT_CURRENCY),
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
