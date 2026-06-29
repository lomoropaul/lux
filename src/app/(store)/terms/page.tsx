export const metadata = {
  title: "Terms of Service | LUX ESSENCE",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Terms of Service</h1>
      <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
        <p>Last updated: June 2026</p>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            1. Agreement
          </h2>
          <p>
            By accessing or purchasing from LUX ESSENCE, you agree to these Terms of
            Service. If you do not agree, please do not use our website or services.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            2. Products & Authenticity
          </h2>
          <p>
            All fragrances sold by LUX are sourced from authorized distributors. We
            guarantee authenticity of every product. Product images are for illustration;
            packaging may vary by batch or region.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            3. Orders & Payment
          </h2>
          <p>
            Orders are placed via WhatsApp after checkout. Payment terms, methods, and
            delivery timelines are confirmed directly with our team. Prices are displayed
            in your selected currency; final charges are confirmed at order time.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            4. Shipping
          </h2>
          <p>
            Free shipping applies to orders over $99 USD equivalent across East Africa.
            Delivery times vary by destination. Risk of loss passes to you upon delivery.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            5. Returns
          </h2>
          <p>
            Unopened items in original packaging may be returned within 30 days. Contact
            us via WhatsApp to initiate a return. Opened fragrances cannot be returned
            for hygiene reasons unless defective.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            LUX ESSENCE is not liable for indirect, incidental, or consequential
            damages arising from use of our products or website, to the fullest extent
            permitted by law.
          </p>
        </section>
      </div>
    </div>
  );
}
