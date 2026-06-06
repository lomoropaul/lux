import { FREE_SHIPPING_THRESHOLD_USD } from "@/lib/currency";

export const metadata = {
  title: "Shipping & Returns | LUX Fragrances",
};

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="font-serif text-4xl text-stone-900 text-center mb-10">
        Shipping & Returns
      </h1>
      <div className="space-y-8 text-sm text-stone-600 leading-relaxed">
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Shipping — East Africa
          </h2>
          <p>
            Free standard shipping on all orders over ${FREE_SHIPPING_THRESHOLD_USD}{" "}
            USD equivalent across East Africa, including Uganda, Kenya, Tanzania,
            Rwanda, and Burundi. Orders are processed within 1–2 business days.
            Delivery typically takes 3–7 business days depending on your location.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            International
          </h2>
          <p>
            We also ship outside East Africa. Shipping rates for international
            orders are calculated and confirmed via WhatsApp at checkout.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Returns
          </h2>
          <p>
            We accept returns within 30 days of delivery for unopened items in
            original packaging. Contact us via WhatsApp to initiate a return.
            Refunds are processed within 5–7 business days after we receive the
            item.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Authenticity Guarantee
          </h2>
          <p>
            Every fragrance we sell is 100% authentic. We source directly from
            authorized distributors and stand behind the quality of every
            product.
          </p>
        </section>
      </div>
    </div>
  );
}
