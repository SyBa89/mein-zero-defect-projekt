// Eine einfache Funktion, um zu prüfen, ob TypeScript und Linting funktionieren
export function addiere(a: number, b: number): number {
  return a + b;
}

// console.warn ist erlaubt, console.log ist blockiert (Zero-Defect Regel)
console.warn('Zero-Defect System ist bereit!');
