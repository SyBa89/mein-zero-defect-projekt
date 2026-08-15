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