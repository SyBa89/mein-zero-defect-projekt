# ðŸ­ Kiosk Lollipop â€“ Zero-Defect Web OS

> **Produktionsreife Next.js 15 Webanwendung mit Admin-Panel, Redis-Caching, Sicherheits-Goldstandard und vollautomatisierten E2E-Tests.**

---

## ðŸ“Œ ProjektÃ¼bersicht

Dieses Projekt ist die offizielle WebprÃ¤senz des **Kiosk Lollipop** in Erftstadt-Liblar.  
Es bietet:

- ðŸª **Dynamische Inhalte** â€“ alle GeschÃ¤ftsdaten werden Ã¼ber ein Admin-Panel verwaltet und in Redis gespeichert.
- ðŸ”’ **Enterprise-Sicherheit** â€“ Rate Limiting, CSP, timingSafeEqual, XSS-Schutz, Security-Header.
- âš¡ **Next.js 15 App Router** â€“ Server-Komponenten, unstable_cache, revalidateTag.
- ðŸ§ª **VollstÃ¤ndige E2E-Tests** â€“ Playwright prÃ¼ft Login, Admin-Cockpit und Health Check (6/6 grÃ¼n).
- ðŸ“ˆ **SEO-optimiert** â€“ Dynamische Sitemap, Robots.txt, Open Graph, JSON-LD.

---

## ðŸš€ Technologie-Stack

| Technologie       | Zweck                                          |
| ----------------- | ---------------------------------------------- |
| **Next.js 15**    | React-Framework mit App Router                 |
| **TypeScript**    | Strikte Typsicherheit (strict: true)           |
| **Tailwind CSS**  | Utility-First Styling                          |
| **Upstash Redis** | Serverless Caching & persistente Konfiguration |
| **Playwright**    | Cross-Browser E2E-Testing                      |
| **Vercel**        | Hosting, CI/CD & Edge Network                  |

---

## ðŸ“¦ Installation & Setup

### 1. Repository klonen

git clone https://github.com/SyBa89/mein-zero-defect-projekt.git
cd mein-zero-defect-projekt

### 2. AbhÃ¤ngigkeiten installieren

pm install

### 3. Umgebungsvariablen einrichten

Erstelle eine .env.local-Datei im Projektroot:
KV_REST_API_URL=https://your-upstash-redis-url
KV_REST_API_TOKEN=your-upstash-redis-token
INTERN_PASSWORD=dein-sicheres-passwort-min-12-zeichen

### 4. Entwicklungsserver starten

pm run dev

---

## ðŸ§ª Tests ausfÃ¼hren

px playwright test

---

## âš ï¸ Rechtliche Hinweise (TODO vor Live-Gang)

Dieses Projekt ist technisch bereit fÃ¼r die Produktion. Vor dem Ã¶ffentlichen Launch mÃ¼ssen jedoch folgende geschÃ¤ftliche Punkte geklÃ¤rt werden:

- [ ] Impressum (anwaltlich geprÃ¼ft)
- [ ] DatenschutzerklÃ¤rung (DSGVO-konform)
- [ ] Cookie-Consent (falls zukÃ¼nftig Tracking-Cookies hinzugefÃ¼gt werden)

---

_Entwickelt mit Leidenschaft fÃ¼r saubere Architektur und kompromisslose QualitÃ¤t. Â© 2026_
