# 📈 Performance-Benchmark (verifiziert)

**Messmethode:** Lighthouse 13.4.0 · Chromium 151 · extern gegen Production
**Mobile:** Emulated Moto G Power · Slow-4G-Throttling
**Desktop:** Emulated Desktop · Custom-Throttling
**Datum:** 2026-08-14

| Plattform | Perf | A11y | Best Prac. | SEO | FCP | LCP | TBT | CLS | SI |
|-----------|------|------|-----------|-----|-----|-----|-----|-----|-----|
| Desktop   | 100  | 100  | 100       | 100 | 0.4s| 0.5s| 0ms | 0   | 0.5s|
| Mobile    | 89   | 100  | 100       | 100 | 1.1s| 2.2s|380ms| 0   | 2.0s|

## Einordnung
- **Desktop = perfekt.** Alle vier Kategorien 100.
- **Mobile = stark, nicht perfekt.** 89 Perf unter Slow-4G ist für eine
  inhaltlich reiche White-Label-Seite ein sehr guter Laborwert.
- **Limitierende Faktoren (Mobile):** TBT 380ms (Hydration, 4 lange Tasks),
  LCP 2.2s (Hero als CSS-Background, nicht preload-optimiert).
- **Hinweis:** Labor ≠ Real-User. Vercel Speed Insights (CrUX) liefert die
  echten Feld-Werte und ist die aussagekräftigere Quelle.

## Offene, sichere Hebel (optional, je nach Ziel)
1. Hero-Bild via `next/image` + `priority` statt CSS-Background → verbessert LCP.
2. `browserslist` auf moderne Browser eingrenzen → reduziert Legacy-JS (~11 KiB).
3. Nicht-kritische Komponenten weiter deferren → reduziert TBT.
> Jeder Hebel wird nur mit Regression-Test + Vorher/Nachher-Messung umgesetzt.