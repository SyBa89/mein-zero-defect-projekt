# ADR-001: Hero Section als Client-Komponente

**Status:** Akzeptiert  
**Datum:** 2026-08-14  
**Entscheider:** Project Lead + AI Assistant  
**Kontext:** Lighthouse Mobile Performance 89 vs. Desktop 100

## Kontext

Die Hero Section ist als `'use client'`-Komponente implementiert, obwohl sie primär statischen Content (Bild, Headline, CTAs) rendert.

**Warum nicht Server-Komponente?**
- Benötigt `useConfig()` aus ConfigContext für tenant-spezifische Daten
- ConfigContext ist ein Client-Context (lädt Config via API-Call)
- Tenant-Wechsel muss ohne Page-Reload funktionieren (White-Label-Requirement)

## Entscheidung

Hero bleibt Client-Komponente mit folgenden Optimierungen:
- `<Image priority fetchPriority="high" sizes="100vw">` für LCP
- Skeleton-UI während Config lädt (verhindert Layout-Shift)
- CSS-Animationen mit GPU-Compositing (kein Framer Motion)

## Konsequenzen

### ✅ Vorteile
- Tenant-Wechsel funktioniert ohne Reload
- Skeleton-UI gibt sofortiges Feedback
- Keine zusätzlichen API-Calls (Config wird einmal geladen)

### ⚠️ Nachteile
- LCP wartet auf JS-Hydration + Config-API-Call
- Mobile Performance: 89 statt 100 (Lab-Messung unter Slow-4G)
- Desktop Performance: 100 (kein Unterschied messbar)

## Alternative Lösungen (evaluiert, aber verworfen)

### 1. Server-Komponente + Client-Hydration
**Problem:** Config-Daten müssten im HTML vorgerendert werden → kein dynamischer Tenant-Wechsel

### 2. Split in Server (Image) + Client (Content)
**Problem:** Skeleton-UI bricht, Animationen müssen refactored werden, Risiko von Regressionen

### 3. Config-Preloading via `<link rel="preload">`
**Problem:** Config ist JSON, nicht statisch → kein Preloading möglich

## Messwerte

| Plattform | Performance | LCP | Begründung |
|-----------|-------------|-----|------------|
| Desktop   | 100         | 0.5s| JS-Hydration schnell genug |
| Mobile    | 89          | 2.2s| JS-Hydration + API-Call + Slow-4G |

## Zukünftige Optimierungen (optional)

Falls Mobile 100/100/100/100 ein **hartes Requirement** wird:
1. Config-Preloading via Inline-Script (risikoreich)
2. Server-Komponente + Client-Hydration (Architektur-Refactor)
3. Edge-Caching der Config-API (Infrastruktur-Änderung)

**Aktuelle Empfehlung:** Status quo akzeptieren. 89 Mobile ist stark für eine inhaltlich reiche White-Label-Seite.