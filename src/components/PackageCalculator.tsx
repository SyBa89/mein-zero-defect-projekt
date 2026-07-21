'use client';

import { useState } from 'react';

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

export default function PackageCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ UX: Akzeptiert nur Zahlen und ein einziges Komma oder Punkt (max. 2 Dezimalstellen)
  const validateInput = (value: string) => /^\d*([.,]\d{0,2})?$/.test(value);

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

  const calculatePackageSize = () => {
    setError(null);
    setResult(null);

    // ✅ BUSINESS: Ersetzt deutsches Komma durch Punkt für parseFloat
    const l = parseFloat(length.replace(',', '.'));
    const w = parseFloat(width.replace(',', '.'));
    const h = parseFloat(height.replace(',', '.'));

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

    setResult(
      '❌ Paket zu groß für Standard-Versand. Bitte wenden Sie sich an uns für Sperrgut-Lösungen.'
    );
  };

  const resetCalculator = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setResult(null);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculatePackageSize();
    }
  };

  const hasError = !!error;
  const resultId = 'calculator-result';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
      <h3 className="text-xl font-black text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden="true">
          📏
        </span>
        Finde deine Paketgröße
      </h3>
      <p className="text-sm text-gray-600 mb-6 text-center">
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
              className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide"
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
              aria-describedby={resultId}
              className="w-full px-3 py-3 text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={calculatePackageSize}
          className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
        >
          Jetzt prüfen
        </button>
        <button
          onClick={resetCalculator}
          className="px-5 py-3.5 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          aria-label="Eingaben zurücksetzen"
        >
          ↺
        </button>
      </div>

      {/* ✅ ACCESSIBILITY: aria-live sorgt dafür, dass Screenreader Änderungen sofort vorlesen */}
      <div
        id={resultId}
        aria-live="polite"
        aria-atomic="true"
        className="min-h-[4rem] flex items-center justify-center"
      >
        {hasError && (
          <div className="w-full bg-red-50 text-red-800 px-4 py-3 rounded-xl font-semibold text-center border border-red-200 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-2">
            <span aria-hidden="true">⚠️</span> {error}
          </div>
        )}
        {result && !hasError && (
          <div className="w-full bg-green-50 text-green-800 px-4 py-3 rounded-xl font-bold text-center border border-green-200 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-center gap-2">
            <span aria-hidden="true">✅</span> {result}
          </div>
        )}
        {!result && !hasError && (
          <p className="text-sm text-gray-400 text-center font-medium">
            Das Ergebnis erscheint hier nach dem Prüfen.
          </p>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        *Unverbindliche Richtwerte basierend auf Standard-Hermes-Maßen. Verbindliche Preise und Maße
        direkt im Markt oder auf hermes.de.
      </p>
    </div>
  );
}
