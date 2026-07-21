'use client';

import { useState } from 'react';

export default function PackageCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ PROAKTIVER FIX: Akzeptiert jetzt sowohl Punkt (.) als auch Komma (,) für den deutschen Markt
  const validateInput = (value: string) => {
    return /^\d*([.,]\d{0,2})?$/.test(value);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (validateInput(value) || value === '') {
        setter(value);
        setResult(null); // Reset Ergebnis bei Änderung
        setError(null);
      }
    };

  const calculatePackageSize = () => {
    // ✅ PROAKTIVER FIX: Ersetzt deutsches Komma durch Punkt für korrekte parseFloat-Verarbeitung
    const l = parseFloat(length.replace(',', '.'));
    const w = parseFloat(width.replace(',', '.'));
    const h = parseFloat(height.replace(',', '.'));

    // Validierung
    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      setError('Bitte geben Sie gültige Maße ein (größer als 0).');
      setResult(null);
      return;
    }

    setError(null);

    // Hermes Paketgrößen (maximal erlaubt)
    const packages = [
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

    // Sortiere Maße (größte Dimension zuerst)
    const dimensions = [l, w, h].sort((a, b) => b - a);

    for (const pkg of packages) {
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

    setResult('❌ Paket zu groß! Bitte wenden Sie sich an eine Hermes-Filiale für größere Pakete.');
  };

  const resetCalculator = () => {
    setLength('');
    setWidth('');
    setHeight('');
    setResult(null);
    setError(null);
  };

  // Handle Enter-Taste
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculatePackageSize();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
        <span className="text-2xl">📏</span>
        Finde deine Paketgröße
      </h3>
      <p className="text-sm text-gray-600 mb-5 text-center">
        Gib die Maße deines Pakets ein (in cm):
      </p>

      {/* Input-Felder */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label htmlFor="length" className="block text-xs font-medium text-gray-700 mb-1">
            Länge
          </label>
          <input
            id="length"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={length}
            onChange={handleInputChange(setLength)}
            onKeyDown={handleKeyDown}
            placeholder="cm"
            className="w-full px-3 py-3 text-center border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-semibold"
            aria-label="Länge in cm"
          />
        </div>
        <div>
          <label htmlFor="width" className="block text-xs font-medium text-gray-700 mb-1">
            Breite
          </label>
          <input
            id="width"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={width}
            onChange={handleInputChange(setWidth)}
            onKeyDown={handleKeyDown}
            placeholder="cm"
            className="w-full px-3 py-3 text-center border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-semibold"
            aria-label="Breite in cm"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-xs font-medium text-gray-700 mb-1">
            Höhe
          </label>
          <input
            id="height"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={height}
            onChange={handleInputChange(setHeight)}
            onKeyDown={handleKeyDown}
            placeholder="cm"
            className="w-full px-3 py-3 text-center border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all font-semibold"
            aria-label="Höhe in cm"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={calculatePackageSize}
          className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
          aria-label="Paketgröße berechnen"
        >
          Berechnen
        </button>
        <button
          onClick={resetCalculator}
          className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          aria-label="Eingaben zurücksetzen"
        >
          Zurücksetzen
        </button>
      </div>

      {/* Ergebnis-Anzeige */}
      <div aria-live="polite" aria-atomic="true" className="min-h-[4rem]">
        {error && (
          <div className="bg-red-50 text-red-800 px-4 py-3 rounded-xl font-semibold text-center border border-red-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
            ⚠️ {error}
          </div>
        )}
        {result && !error && (
          <div className="bg-green-50 text-green-800 px-4 py-3 rounded-xl font-bold text-center border border-green-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
            ✅ {result}
          </div>
        )}
        {!result && !error && (
          <p className="text-sm text-gray-500 text-center py-2">
            Das Ergebnis erscheint hier nach dem Berechnen.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        *Unverbindliche Richtwerte basierend auf Standard-Hermes-Maßen. Verbindliche Preise und Maße
        direkt im Markt oder auf hermes.de.
      </p>
    </div>
  );
}
