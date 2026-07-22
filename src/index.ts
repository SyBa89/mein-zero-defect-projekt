/**
 * Addiert zwei Zahlen.
 * Dient als Verifikation, dass TypeScript und Linting korrekt funktionieren.
 *
 * @param a - Die erste Zahl
 * @param b - Die zweite Zahl
 * @returns Die Summe von a und b
 */
export function addiere(a: number, b: number): number {
  return a + b;
}

// ✅ ZERO-DEFECT: console.warn ist für Systemstatus erlaubt, console.log ist blockiert.
// Dieser Warnhinweis bestätigt die erfolgreiche Initialisierung des Systems.
console.warn('Zero-Defect System ist bereit und verifiziert.');
