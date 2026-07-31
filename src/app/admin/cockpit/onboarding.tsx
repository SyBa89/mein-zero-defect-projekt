'use client';

import { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    title: 'Willkommen im Admin-Cockpit!',
    description: 'Hier verwalten Sie alle wichtigen Einstellungen Ihres Kiosk Lollipop.',
    icon: '👋',
  },
  {
    title: 'Öffnungszeiten verwalten',
    description: 'Passen Sie Ihre Öffnungszeiten dynamisch an – auch für Feiertage und Sonderöffnungen.',
    icon: '🕒',
  },
  {
    title: 'Notfall-Banner steuern',
    description: 'Schalten Sie in Sekunden ein Banner für ungeplante Schließungen oder wichtige Hinweise.',
    icon: '🚨',
  },
  {
    title: 'Bereit für den Start',
    description: 'Alles eingestellt? Dann ist Ihr Kiosk live und für Kunden erreichbar.',
    icon: '🚀',
  },
];

export default function CockpitOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="text-3xl">{steps[currentStep].icon}</div>
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-gray-600 text-sm"
          aria-label="Onboarding schließen"
        >
          ✕
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {steps[currentStep].title}
      </h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {steps[currentStep].description}
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentStep ? 'w-8 bg-pink-600' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Zurück
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={() => setDismissed(true)}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-md transition-all"
          >
            Fertig
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-md transition-all"
          >
            Weiter →
          </button>
        )}
      </div>
    </div>
  );
}
