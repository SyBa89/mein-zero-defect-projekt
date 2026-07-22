export default function BrandsSection() {
  const brands = [
    '🥤 Coca-Cola & Fanta',
    '🍫 Milka & Ritter Sport',
    '🚬 Marlboro & Camel',
    '🎫 Lotto 6aus49 & Eurojackpot',
    '📰 Express & Kölner Stadt-Anzeiger',
    '📱 Vodafone & Telekom',
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">
          Beliebte Marken bei uns
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {brands.map((brand, i) => (
            <span
              key={i}
              className="px-5 py-3 bg-white text-pink-700 rounded-full font-bold shadow-sm border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
