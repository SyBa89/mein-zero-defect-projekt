'use client';

import { useState, useEffect } from 'react';

export default function OnboardingGuide() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('onboarding-dismissed');
      if (dismissed !== 'true') {
        setIsVisible(true);
      }
    }
  }, []);

  const dismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding-dismissed', 'true');
    }
    setIsVisible(false);
  };

  const steps = [
    {
      icon: '🚨',
      title: 'Notfall-Banner',
      description: 'Markiere den Kiosk als geschlossen bei Krankheit, Urlaub oder Notfällen.',
    },
    {
      icon: '🎰',
      title: 'Lotto Jackpot',
      description: 'Trage den aktuellen Lotto-Jackpot ein (z.B. 45.000.000).',
    },
    {
      icon: '⭐',
      title: 'Tages-Highlight',
      description: 'Bewirb Sonderaktionen wie "Frische Brezeln" oder "Neue Zeitschriften".',
    },
    {
      icon: '📅',
      title: 'Öffnungszeiten',
      description: 'Passe die Öffnungszeiten an. Diese werden automatisch angezeigt.',
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            👋 Willkommen im Admin-Cockpit!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Kurze Einführung ({activeStep + 1}/{steps.length})
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Einführung schließen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm mb-4">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{steps[activeStep].icon}</div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              {steps[activeStep].title}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeStep
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 w-2'
              }`}
              aria-label={`Schritt ${idx + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Zurück
          </button>
          {activeStep < steps.length - 1 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Weiter →
            </button>
          ) : (
            <button
              onClick={dismiss}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:shadow-lg transition-all"
            >
              Los geht's! 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}