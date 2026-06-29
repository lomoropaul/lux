export const metadata = {
  title: "About | LUX ESSENCE",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <p className="text-xs tracking-[0.3em] uppercase text-amber-700 dark:text-amber-500 mb-3 text-center">
        Our Story
      </p>
      <h1 className="font-serif text-4xl text-stone-900 dark:text-white text-center mb-8">
        About LUX
      </h1>
      <div className="prose prose-stone dark:prose-invert text-stone-600 dark:text-stone-300 space-y-4 text-sm leading-relaxed">
        <p>
          LUX ESSENCE was born from a passion for authentic luxury scents.
          Inspired by the world&apos;s finest perfumeries, we curate a collection
          of premium fragrances that capture the essence of elegance, mystery,
          and sophistication.
        </p>
        <p>
          Every bottle in our collection is selected for its exceptional quality,
          longevity, and artistry. From rich oud compositions to delicate floral
          bouquets, we offer something for every discerning nose.
        </p>
        <p>
          Order with confidence through our WhatsApp checkout — our team is
          always ready to help you find your perfect scent.
        </p>
      </div>
    </div>
  );
}
