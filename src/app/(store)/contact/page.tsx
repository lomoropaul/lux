export const metadata = {
  title: "Contact | LUX ESSENCE",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-amber-700 dark:text-amber-500 mb-3">
        Get in Touch
      </p>
      <h1 className="font-serif text-4xl text-stone-900 dark:text-white mb-8">Contact Us</h1>
      <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-8">
        Have a question about a fragrance or need help with your order? Reach
        out to us on WhatsApp and our team will respond promptly.
      </p>
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || ""}?text=${encodeURIComponent("Hi! I have a question about LUX ESSENCE.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#25D366] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#1da851] transition-colors"
      >
        Chat on WhatsApp
      </a>
    </div>
  );
}
