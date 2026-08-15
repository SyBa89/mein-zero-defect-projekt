# ADR-003: Config-Architektur – Static (Build) + Live (Redis) Split

**Status:** Akzeptiert
**Datum:** 2026-08-15

## Entscheidung
- **Statische Config** (Marke, Kontakt, Theme, Sections) bleibt Build-Time (SSG) für Performance/Lighthouse.
- **Live-Felder** (Öffnungszeiten, Notfall-Banner, Jackpot, Highlight) werden per Admin-Cockpit in Redis
  (`tenant:{id}:config-override`) gespeichert und client-seitig nach Mount gemerged (`/api/config`).

## Warum
- Erhalt von Lighthouse 100 (kein voll-dynamischer Render der Hauptseite).
- Ehrliches Live-Speichern ohne fake-Erfolg; auth-gated POST; Redis-Fallback sicher.

## Konsequenzen
- Hauptseite zeigt Live-Felder nach ~1 Client-Fetch (kein Layout-Shift).
- Statische Felder ändern sich weiterhin per Deployment.

## Verbindliche Invarianten (übernommen aus Architekturreview, 2026-08-15)

### I1: Single Source of Truth
Jede Marke hat genau **eine** Config-Quelle. Kein paralleles `configs/*.json` + `tenants/*.ts`.
Strings wie Markenname, Telefon, E-Mail, Farbe **dürfen nur** via `useConfig()`/`getClientConfig()`
in den Code kommen. Jede Abweichung ist ein Bug.

### I2: Marketing-Website ≠ Back-Office
Umsatz-Tracking, Lieferantenverwaltung, Notizen, Mehrfach-Rollen gehören nicht in die öffentliche
Website. Falls benötigt: separates internes Tool mit eigenem Auth. Grund: Angriffsfläche.

### I3: Secrets = Fail-Closed
Keine Fallback-Secrets im Code, auch nicht „nur für Dev". Fehlt ein Secret → Fehler werfen,
nicht ersetzen. Secrets sind bei öffentlichem Repo öffentlich.

### I4: Security-Gates ohne Bypass
`npm audit --audit-level=high` ohne `continue-on-error`. Ein Gate, das bei Findings nachgibt,
ist kein Gate.

### I5: Performance-Trade-off bewusst
Live-Update via Server-Merge macht `/` dynamisch (ƒ). Trade-off: Static-Perf vs. Live-Reflexion.
Akzeptiert für Live-Feature. Für später: `unstable_cache`-Wrapper erwägen.

## Tech-Debt (registriert, nicht sofort)
- Dual-Config-Source (`configs/*.json` + `tenants/*.ts`) → inkrementell auf `/tenants/{id}/` konsolidieren
- Admin-Scope (Umsatz/Lieferanten/Notizen) → mittelfristig aus Website auslagern
- `/` dynamisch → optional `unstable_cache` für ISR-Re-Optimierung