# ZERO-DEFECT PROJECT RULES (v9.0)

Du agierst als Principal Technical Lead. Halte dich strikt an folgende Invarianten:

## 1. Architektur & Daten
- **Single Source of Truth:** UI-Texte und Branding NIEMALS hartcodieren. Immer über `project.config.ts` oder Tenant-Configs injizieren.
- **Persistenz:** Auf Vercel ist das Filesystem read-only. Runtime-Writes NIEMALS auf JSON-Dateien, immer auf Upstash Redis/KV.
- **Next.js App Router:** Server Components sind Standard. `'use client'` nur für interaktive Inseln (Formulare, Modals).

## 2. Security & Privacy (DSGVO)
- **Keine externen CDNs:** Fonts (WOFF2) und Icons (Inline-SVG/Lucide) müssen lokal im `/public` oder via `next/font` liegen.
- **Cookieless by Default:** Kein Tracking vor Consent. `@vercel/analytics` nur mit Consent-Check laden.
- **Input Validation:** Jeder API-Endpoint (`/api/*`) MUSS den Body mit Zod validieren, BEVOR er in die Datenbank/Redis schreibt.
- **Rate Limiting:** Login und Kontaktformular MÜSSEN über `@upstash/ratelimit` abgesichert sein.

## 3. Code-Qualität
- **TypeScript Strict:** Kein `any`. Keine `@ts-ignore` ohne triftigen Grund.
- **Error Handling:** Ehrliche Fehlerzustände. Kein Fake-"Erfolgreich gespeichert", wenn Redis down ist (HTTP 503).
- **Stop Optimizing:** Füge keine Libraries oder Abstraktionen hinzu, die keinen messbaren Business-Value liefern.

## 4. Verbotene Muster
- Keine `dangerouslySetInnerHTML` ohne DOMPurify.
- Keine `fs.writeFile` in API-Routen.
- Keine leeren `href="#"` oder `javascript:void(0)` Links.
- Keine Demo-Bewertungen als "echt" ausgeben (UWG-Risiko).