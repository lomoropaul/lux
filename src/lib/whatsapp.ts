import {
  formatCurrency,
  type CurrencyCode,
  FREE_SHIPPING_THRESHOLD_USD,
  qualifiesForFreeShipping,
} from "@/lib/currency";

export type CheckoutItem = {
  name: string;
  quantity: number;
  price: number;
  size?: string;
};

export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
  currency: CurrencyCode;
  items: CheckoutItem[];
};

export function buildWhatsAppMessage(details: CheckoutDetails) {
  const { currency } = details;
  const lines: string[] = [
    "🛍️ *New Order — LUX Fragrances*",
    "",
    "*Customer Details*",
    `Name: ${details.firstName} ${details.lastName}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    "",
    "*Shipping Address*",
    details.address,
    `${details.city}, ${details.state} ${details.zip}`,
  ];

  if (details.notes) {
    lines.push("", `*Notes:* ${details.notes}`);
  }

  lines.push("", `*Order Items* (${currency})`);

  let total = 0;
  for (const item of details.items) {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    const size = item.size ? ` (${item.size})` : "";
    lines.push(
      `• ${item.name}${size} × ${item.quantity} — ${formatCurrency(lineTotal, currency)}`,
    );
  }

  const shippingNote = qualifiesForFreeShipping(total)
    ? "Free (East Africa)"
    : "To be confirmed";

  lines.push(
    "",
    `*Subtotal: ${formatCurrency(total, currency)}*`,
    `*Shipping: ${shippingNote}* (free over $${FREE_SHIPPING_THRESHOLD_USD} USD)`,
    `*Total: ${formatCurrency(total, currency)}*`,
    "",
    "Please confirm availability and payment details. Thank you!",
  );

  return lines.join("\n");
}

export function getWhatsAppUrl(message: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const cleanPhone = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
