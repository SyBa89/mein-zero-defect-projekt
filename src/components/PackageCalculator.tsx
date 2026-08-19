'use client';

import { useState, KeyboardEvent } from 'react';
/* global HTMLInputElement */
import type React from 'react';

// ✅ ARCHITEKTUR: Konstanten außerhalb der Komponente verhindern unnötige Re-Allokation bei jedem Render
const HERMES_PACKAGES = [
  {
    size: 'S-Paket',
    maxLength: 31.5,
    maxWidth: 23.5,
    maxHeight: 3.5,
    description: 'Briefe, kleine Artikel, Dokumente',
  },
  {
    size: 'M-Paket',
    maxLength: 50,
    maxWidth: 30,
    maxHeight: 10,
    description: 'Schuhe, kleine Kartons, Bücher',
  },
  {
    size: 'L-Paket',
    maxLength: 120,
    maxWidth: 60,
    maxHeight: 60,
    description: 'Große Kartons, sperrige Gegenstände',
  },
];

// ✅ ZERO-DEFECT: Eindeutige ID für aria-describedby (verhindert Duplikate)
const RESULT_ID = 'package-result';

export default function PackageCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ Derived State: Fehler-Status als Boolean
  const hasError = Boolean(error);

  // ✅ UX: Akzeptiert Zahlen, ein Komma/Punkt und toleriert führende/anhängende Leerzeichen
  const validateInput = (value: string): boolean => /^\s*\d*([.,]\d{0,2})?\s*$/.test(value);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (validateInput(value) || value === '') {
        setter(value);
        setResult(null);
        setError(null);
      }
    };

  // ✅ Enter-Taste triggert Berechnung (Accessibility + UX)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculatePackageSize();
    }
  };

  const calculatePackageSize = () => {
    setError(null);
    setResult(null);

    // ✅ BUSINESS: Ersetzt deutsches Komma durch Punkt und entfernt Leerzeichen
    const l = parseFloat(length.replace(',', '.').trim());
    const w = parseFloat(width.replace(',', '.').trim());
    const h = parseFloat(height.replace(',', '.').trim());

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      setError('Bitte geben Sie gültige Maße ein (alle Werte müssen größer als 0 sein).');
      return;
    }

    // ✅ PRO-LEVEL LOGIK: Sortiert Eingabe und Grenzwerte absteigend.
    // Dadurch ist die Reihenfolge der Eingabe (Länge/Breite/Höhe) dem Nutzer egal.
    const dimensions = [l, w, h].sort((a, b) => b - a);

    for (const pkg of HERMES_PACKAGES) {
      const maxDimensions = [pkg.maxLength, pkg.maxWidth, pkg.maxHeight].sort((a, b) => b - a);

      if (
        dimensions[0] <= maxDimensions[0] &&
        dimensions[1] <= maxDimensions[1] &&
        dimensions[2] <= maxDimensions[2]
      ) {
        setResult(`${pkg.size} ✓ (${pkg.description})`);
        return;
      }
    }

    setResult('❌ Leider zu groß für alle Hermes-Paketgrößen. Bitte im Markt nachfragen.');
  };

  const resetCalculator = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 radius-token-lg shadow-token-lg border border-gray-100 dark:border-gray-700 p-6 md:p-8">
      <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-2 text-center flex items-center justify-center gap-2">
        <span aria-hidden="true">📦</span>
        Finde deine Paketgröße
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        Gib die Maße deines Pakets ein (in cm). Die Reihenfolge ist egal.
      </p>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        {[
          { id: 'length', label: 'Länge', value: length, setter: setLength },
          { id: 'width', label: 'Breite', value: width, setter: setWidth },
          { id: 'height', label: 'Höhe', value: height, setter: setHeight },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              inputMode="decimal"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              value={field.value}
              onChange={handleInputChange(field.setter)}
              onKeyDown={handleKeyDown}
              placeholder="0"
              aria-invalid={hasError}
              aria-describedby={RESULT_ID}
              className="w-full px-3 py-3 text-center bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 radius-token-md focus:ring-2 focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] outline-none transition-all font-bold text-gray-900 dark:text-white placeholder:text-gray-600 dark:text-gray-400 dark:placeholder:text-gray-600 dark:text-gray-400"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={calculatePackageSize}
          className="flex-1 bg-[var(--theme-primary)] hover:bg-[var(--theme-accent)] md:bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3.5 px-4 radius-token-md transition-all shadow-token-md hover:shadow-token-lg transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2"
        >
          Jetzt prüfen
        </button>
        <button
          onClick={resetCalculator}
          className="px-5 py-3.5 border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold radius-token-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          aria-label="Eingaben zurücksetzen"
        >
          <svg
            className="w-5 h-5 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* ✅ ACCESSIBILITY: aria-live sorgt dafür, dass Screenreader Änderungen sofort vorlesen */}
      <div
        id={RESULT_ID}
        aria-live="polite"
        aria-atomic="true"
        className="min-h-[4rem] flex items-center justify-center"
      >
        {hasError && (
          <div className="w-full bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-4 py-3 radius-token-md font-semibold text-center border border-red-200 dark:border-red-800 transition-all duration-300 ease-out flex items-center justify-center gap-2">
            <span aria-hidden="true">⚠️</span> {error}
          </div>
        )}
        {result && !hasError && (
          <div className="w-full bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-3 radius-token-md font-bold text-center border border-green-200 dark:border-green-800 transition-all duration-300 ease-out flex items-center justify-center gap-2">
            <span aria-hidden="true">✅</span> {result}
          </div>
        )}
        {!result && !hasError && (
          <p className="text-sm text-gray-400 dark:text-gray-400 text-center font-medium transition-all duration-300 ease-out">
            Das Ergebnis erscheint hier nach dem Prüfen.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-400 text-center mt-4 leading-relaxed">
        *Unverbindliche Richtwerte basierend auf Standard-Hermes-Maßen. Verbindliche Preise und Maße
        direkt im Markt oder auf hermes.de.
      </p>
    </div>
  );
}
