export default function OpeningHoursSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-gray-900 mb-10 text-center tracking-tight">
          Öffnungszeiten
        </h2>
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl border border-pink-100 overflow-hidden shadow-xl">
          <table className="w-full">
            <tbody className="divide-y divide-pink-100/50">
              <tr className="hover:bg-pink-100/50 transition-colors">
                <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">
                  Montag - Freitag
                </td>
                <td className="px-8 py-6 text-right text-pink-600 font-black text-xl">
                  07:30 - 19:00 Uhr
                </td>
              </tr>
              <tr className="hover:bg-pink-100/50 transition-colors">
                <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">Samstag</td>
                <td className="px-8 py-6 text-right text-pink-600 font-black text-xl">
                  07:30 - 14:30 Uhr
                </td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="px-8 py-6 text-left font-bold text-gray-900 text-lg">
                  Sonn- und Feiertags
                </td>
                <td className="px-8 py-6 text-right text-red-500 font-black text-xl">
                  Geschlossen
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
