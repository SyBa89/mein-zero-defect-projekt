'use client';

import { useState, useMemo } from 'react';

// Explizite Typisierung für maximale Code-Sicherheit und Wartbarkeit
interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'Wo genau befindet sich der Kiosk Lollipop?',
    answer:
      'Wir befinden uns direkt am Bürgerplatz in der Theodor-Heuss-Straße 35, 50374 Erftstadt-Liblar, in unmittelbarer Nähe zum Bahnhof.',
  },
  {
    question: 'Kann ich bei Ihnen Pakete mit Hermes versenden und abholen?',
    answer:
      'Ja, wir sind ein offizieller Hermes Paketshop. Sie können bei uns Pakete versenden, abholen und Retouren einfach abgeben.',
  },
  {
    question: 'Welche Zahlungsmethoden akzeptieren Sie?',
    answer:
      'Sie können bei uns bar, mit EC-Karte, kontaktlos sowie mit Apple Pay und Google Pay bezahlen.',
  },
  {
    question: 'Haben Sie an Sonn- und Feiertagen geöffnet?',
    answer:
      'Nein, an Sonn- und Feiertagen haben wir geschlossen. Unsere regulären Öffnungszeiten sind Mo-Fr von 07:30 bis 19:00 Uhr und samstags von 07:30 bis 14:30 Uhr.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ✅ PERFORMANCE: useMemo verhindert unnötige Neuberechnung des Schema-Objekts bei jedem Render
  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }),
    []
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center tracking-tight"
        >
          Häufig gestellte Fragen
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-pink-300 shadow-lg shadow-pink-100/50'
                    : 'border-gray-200 hover:border-pink-200'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-bold text-gray-900 pr-4">{faq.question}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* ✅ ARCHITEKTUR: Bulletproof Grid-Animation statt willkürlicher max-h-[1000px] Werte */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      id={`faq-question-${index}`} // Verknüpfung für Screenreader
                      className="p-6 pt-0 text-gray-700 leading-relaxed border-t border-gray-100 mt-2"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
