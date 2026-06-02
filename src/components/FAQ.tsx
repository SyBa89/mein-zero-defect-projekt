'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '📦 Kann ich meine Hermes-Pakete auch sonntags abholen?',
    answer:
      'Nein, sonntags haben wir geschlossen. Sie können Ihre Pakete zu unseren regulären Öffnungszeiten abholen. Die Lagerfrist beträgt in der Regel 7 Tage. Sie erhalten eine Benachrichtigung von Hermes, wenn Ihr Paket eingetroffen ist.',
  },
  {
    question: '💳 Welche Zahlungsmethoden akzeptiert ihr?',
    answer:
      'Wir akzeptieren Barzahlung und EC-Karte (girocard). Kontaktlose Zahlungen mit Karte oder Smartphone (Apple Pay, Google Pay) sind ebenfalls möglich. Kreditkarten werden derzeit nicht akzeptiert.',
  },
  {
    question: '🚗 Gibt es Parkmöglichkeiten?',
    answer:
      'Ja, direkt vor unserem Geschäft gibt es kurze Haltemöglichkeiten zum schnellen Ein- und Ausladen. Für längere Aufenthalte nutzen Sie bitte die öffentlichen Parkplätze in der Umgebung. Der Bürgerplatz bietet ebenfalls Parkmöglichkeiten.',
  },
  {
    question: '↩️ Kann ich Retouren bei euch abgeben?',
    answer:
      'Ja, wir nehmen Hermes-Retouren während unserer Öffnungszeiten entgegen. Bitte bringen Sie Ihr Retourenlabel mit oder lassen Sie es uns vor Ort erstellen. Wir prüfen das Paket und bestätigen Ihnen die Annahme.',
  },
  {
    question: '🚫 Bietet ihr einen Lieferservice an?',
    answer:
      'Nein, wir bieten keinen Lieferservice an. Alle Produkte sind jedoch sofort vor Ort verfügbar - ohne Wartezeit und ohne Mindestbestellwert. Sie können auch telefonisch vorbestellen und die Ware dann abholen.',
  },
  {
    question: '📏 Welche Paketgrößen kann ich bei euch versenden?',
    answer:
      'Wir versenden Hermes-Pakete in den Größen S, M und L. Die maximalen Maße sind: S (31,5 x 23,5 x 3,5 cm), M (50 x 30 x 10 cm) und L (120 x 60 x 60 cm). Größere Pakete müssen direkt bei Hermes abgegeben werden.',
  },
  {
    question: '🎫 Kann ich hier Lotto spielen?',
    answer:
      'Ja, wir sind offizielle Lotto-Annahmestelle und bieten Lotto 6aus49, Eurojackpot, Rubbellose und weitere Lotterieprodukte an. Sie können Tippscheine ausfüllen oder direkt am Terminal spielen.',
  },
  {
    question: '📱 Kann ich hier Handy-Guthaben aufladen?',
    answer:
      'Ja, wir bieten Aufladungen für alle gängigen Mobilfunkanbieter an (Telekom, Vodafone, O2, Aldi Talk, etc.). Sie können den Betrag frei wählen oder vorgefertigte Aufladungen kaufen.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Häufige Fragen</h2>
          <p className="text-lg text-gray-600">
            Hier finden Sie Antworten auf die am häufigsten gestellten Fragen
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              {/* Frage-Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-pink-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Antwort-Bereich mit Animation */}
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zusätzlicher Hinweis */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Ihre Frage war nicht dabei?</p>
          <a
            href="/kontakt"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold transition-colors"
          >
            Kontaktieren Sie uns
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
