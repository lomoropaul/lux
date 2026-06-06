export const metadata = {
  title: "Privacy Policy | LUX Fragrances",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="font-serif text-4xl text-stone-900 mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-sm text-stone-600 leading-relaxed">
        <p>Last updated: June 2026</p>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Information We Collect
          </h2>
          <p>
            When you place an order or create an account, we collect your name, email,
            phone number, and shipping address. We also collect usage data such as pages
            visited and products viewed to improve our service.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            How We Use Your Information
          </h2>
          <p>
            We use your information to process orders, communicate about your purchase,
            send promotional offers (with your consent), and improve our website and
            product selection.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Data Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share data with delivery
            partners and payment processors solely to fulfill your order. We may disclose
            information if required by law.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Cookies & Storage
          </h2>
          <p>
            We use local storage for your shopping cart and currency preference. Account
            sessions are managed securely via encrypted cookies.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Your Rights
          </h2>
          <p>
            You may request access to, correction of, or deletion of your personal data
            by contacting us via WhatsApp or email. You may opt out of marketing
            communications at any time.
          </p>
        </section>
        <section>
          <h2 className="text-xs tracking-[0.2em] uppercase text-stone-900 mb-3">
            Contact
          </h2>
          <p>
            For privacy-related inquiries, contact us through the{" "}
            <a href="/contact" className="text-amber-700 hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
