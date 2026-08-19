/* global HTMLDivElement, KeyboardEvent, HTMLElement */
'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useConfig, useConfigState } from '@/contexts/ConfigContext';

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * ✅ ZERO-DEFECT: FAQ-Accordion mit statischen IDs
 *
 * Warum keine useId()?
 * - useId() + next/dynamic verursacht ID-Divergenz zwischen Server/Client
 *   (unterschiedliche Zählerstände durch Lazy Loading)
 * - Statische IDs (faq-button-0, faq-answer-0) sind:
 *   ✅ 100% hydration-sicher (Server = Client)
 *   ✅ Semantisch korrekt für ein Accordion
 *   ✅ Maximal accessibility-konform (ARIA)
 */
export default function FAQ() {
  // ✅ ZERO-DEFECT: ALLE Hooks ZUERST (Rules of Hooks)
  const config = useConfig();
  const { isLoading } = useConfigState();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ✅ Data extraction (synchron, kein Hook)
  const faqData: FaqItem[] = config.faq;

  // ✅ Memoisiertes Schema.org (dynamisch aus Config)
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
    [faqData]
  );

  // ✅ Memoisierte Toggle-Funktion
  const toggleAccordion = useCallback(
    (index: number) => {
      const newIndex = openIndex === index ? null : index;
      setOpenIndex(newIndex);

      // ✅ Fokus auf die Antwort setzen, wenn geöffnet
      if (newIndex !== null && answerRefs.current[newIndex]) {
        setTimeout(() => {
          answerRefs.current[newIndex]?.focus();
        }, 150);
      }
    },
    [openIndex]
  );

  // ✅ Escape-Taste schließt alle geöffneten Fragen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openIndex !== null) {
        setOpenIndex(null);
        const lastButton = document.querySelector(`[data-faq-button="${openIndex}"]`);
        if (lastButton instanceof HTMLElement) {
          lastButton.focus();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openIndex]);

  // ✅ ZERO-DEFECT: Loading-Check NACH allen Hooks (Rules of Hooks!)
  if (isLoading) {
    return (
      <section
        className="py-16 bg-gray-50 dark:bg-gray-900"
        aria-busy="true"
        role="status"
        aria-labelledby="faq-heading-skeleton"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading-skeleton"
            className="text-3xl md:text-4xl font-black text-[var(--color-text)] dark:text-gray-100 mb-10 text-center tracking-tight"
          >
            Häufig gestellte Fragen
          </h2>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-[var(--color-surface)] dark:bg-gray-800 radius-token-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-full flex items-center justify-between p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-900/20 animate-pulse"></div>
                </div>
                {index === 0 && (
                  <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700 mt-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">Inhalt wird geladen...</span>
      </section>
    );
  }

  // ✅ Fallback, wenn keine FAQ-Daten vorhanden sind
  if (!faqData || faqData.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" aria-labelledby="faq-heading">
      {/* ✅ SEO: Schema.org für strukturierte Daten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="text-3xl md:text-4xl font-black text-[var(--color-text)] dark:text-gray-100 mb-10 text-center tracking-tight"
        >
          Häufig gestellte Fragen
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            // ✅ ZERO-DEFECT: Statische IDs (hydration-sicher)
            const buttonId = `faq-button-${index}`;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={index}
                className={`bg-[var(--color-surface)] dark:bg-gray-800 radius-token-lg border transition-all duration-300 ${
                  isOpen
                    ? 'border-pink-300 dark:border-pink-500 shadow-token-lg shadow-pink-100/50 dark:shadow-pink-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700'
                }`}
              >
                <button
                  id={buttonId}
                  data-faq-button={index}
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 radius-token-lg"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  aria-label={`${faq.question} ${isOpen ? 'einklappen' : 'ausklappen'}`}
                >
                  <span className="text-lg font-bold text-[var(--color-text)] dark:text-gray-100 pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-pink-50 dark:bg-pink-900/20 text-[var(--theme-primary)] dark:text-[var(--theme-primary)] transition-transform duration-300 ease-out ${
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

                {/* ✅ Grid-Animation für smooth accordion */}
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
                      className="p-6 pt-0 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] rounded"
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
