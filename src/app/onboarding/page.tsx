'use client';

import { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    title: 'Willkommen beim Kiosk Lollipop',
    description: 'Ihr digitales Verwaltungs-Cockpit für den Kiosk am Bürgerplatz.',
    icon: '🍭',
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
    description: 'Alles eingestellt? Dann geht es direkt zum Admin-Cockpit.',
    icon: '🚀',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
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
            className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Zurück
          </button>

          {currentStep === steps.length - 1 ? (
            <Link
              href="/admin/cockpit"
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg transition-all"
            >
              Zum Cockpit
            </Link>
          ) : (
            <button
              onClick={nextStep}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg transition-all"
            >
              Weiter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}