'use client';

import { useState, useMemo, useCallback, useId, useRef, useEffect } from 'react';

// ✅ ZERO-DEFECT: Explizite Typisierung für maximale Sicherheit
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
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ ZERO-DEFECT: Eindeutige IDs für SSR-Konsistenz
  const id = useId();

  // ✅ ZERO-DEFECT: Memoisierte Schema.org-Daten
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
    [] // faqData ist statisch, aber könnte als Abhängigkeit hinzugefügt werden
  );

  // ✅ ZERO-DEFECT: Memoisierte Toggle-Funktion
  const toggleAccordion = useCallback((index: number) => {
    const newIndex = openIndex === index ? null : index;
    setOpenIndex(newIndex);

    // ✅ ZERO-DEFECT: Fokus auf die Antwort setzen, wenn geöffnet
    if (newIndex !== null && answerRefs.current[newIndex]) {
      // Kleiner Delay, damit die Animation abgeschlossen ist
      setTimeout(() => {
        answerRefs.current[newIndex]?.focus();
      }, 150);
    }
  }, [openIndex]);

  // ✅ ZERO-DEFECT: Escape-Taste schließt alle geöffneten Fragen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openIndex !== null) {
        setOpenIndex(null);
        // Fokus auf den zuletzt geöffneten Button zurücksetzen
        const lastButton = document.querySelector(`[data-faq-button="${openIndex}"]`);
        if (lastButton instanceof HTMLElement) {
          lastButton.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openIndex]);

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
      {/* ✅ SEO: Schema.org für strukturierte Daten */}
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
            const buttonId = `${id}-button-${index}`;
            const answerId = `${id}-answer-${index}`;

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
                  id={buttonId}
                  data-faq-button={index}
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  aria-label={`${faq.question} ${isOpen ? 'ausklappen' : 'einklappen'}`}
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

                {/* ✅ ZERO-DEFECT: Bulletproof Grid-Animation */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      ref={(el) => {
                        if (el) answerRefs.current[index] = el;
                      }}
                      tabIndex={isOpen ? 0 : -1}
                      className="p-6 pt-0 text-gray-700 leading-relaxed border-t border-gray-100 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded"
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