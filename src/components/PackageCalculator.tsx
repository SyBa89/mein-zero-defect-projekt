'use client';

import { useState } from 'react';

export default function PackageCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculatePackageSize = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      setResult('Bitte geben Sie gültige Maße ein.');
      return;
    }

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
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4 text-center text-lg">📏 Passt mein Paket?</h3>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Geben Sie die Maße Ihres Pakets ein (in cm):
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Länge</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="cm"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Breite</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="cm"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Höhe</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="cm"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-center"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculatePackageSize}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Berechnen
        </button>
        {result && (
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      {result && (
        <div
          className={`mt-4 p-4 rounded-lg border-2 ${
            result.includes('✓')
              ? 'bg-green-50 border-green-300 text-green-800'
              : result.includes('❌')
                ? 'bg-red-50 border-red-300 text-red-800'
                : 'bg-yellow-50 border-yellow-300 text-yellow-800'
          }`}
        >
          <p className="font-semibold text-center">{result}</p>
        </div>
      )}
    </div>
  );
}
