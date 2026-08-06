# Kiosk Lollipop â€“ Erftstadt-Liblar

Die offizielle, produktionsreife WebprÃ¤senz des Kiosk Lollipop in Erftstadt-Liblar.
Diese Anwendung dient als digitale Visitenkarte, lokale SEO-Anlaufstelle und internes Verwaltungssystem (Admin-Cockpit) fÃ¼r den tÃ¤glichen Betrieb.

## ðŸ¢ GeschÃ¤ftsfeatures

- **Dynamische Ã–ffnungszeiten:** Inklusive Feiertags-Regelungen und SonderÃ¶ffnungszeiten.
- **Hermes Paketshop:** Informationen zu PaketgrÃ¶ÃŸen und Services.
- **Lotto-Annahmestelle:** Live-Display fÃ¼r den aktuellen Jackpot und Tages-Highlights.
- **Notfall-Banner:** Admin-gesteuerte Sofort-Benachrichtigung bei ungeplanter SchlieÃŸung (z.B. Krankheit).
- **Local SEO:** VollstÃ¤ndiges JSON-LD Schema (`LocalBusiness`) fÃ¼r optimale Sichtbarkeit in Google Maps und der lokalen Suche.

## ðŸ— Technologie-Stack

Dieses Projekt wurde als moderne, serverseitig gerenderte Webanwendung (SSR) konzipiert, um maximale Performance und SEO-GÃ¼te zu gewÃ¤hrleisten.

| Technologie                 | Zweck                                                       |
| :-------------------------- | :---------------------------------------------------------- |
| **Next.js 15 (App Router)** | React-Framework mit Server Components & Edge-Caching        |
| **TypeScript**              | Strikte Typsicherheit im Frontend und Backend               |
| **Tailwind CSS**            | Utility-First Styling fÃ¼r konsistentes, responsives Design |
| **Upstash Redis**           | Serverless Datenbank fÃ¼r persistente Konfigurationen       |
| **Playwright**              | Automatisierte End-to-End (E2E) Tests fÃ¼r kritische Pfade  |
| **Vercel**                  | Hosting, CI/CD-Pipeline und Edge-Network                    |

## ðŸš€ Lokale Entwicklung

### 1. Repository klonen

```bash
git clone https://github.com/SyBa89/mein-zero-defect-projekt.git
cd mein-zero-defect-projekt

## White-Label Setup

Branchen-Configs in `configs/`:
- `kiosk.json` (Kiosk Lollipop)
- `handwerk.json` (Handwerk) - Phase 1.3
- `arzt.json` (Arzt) - Phase 1.3

Wechsel: `CLIENT_TYPE=<branche>` in `.env.local`

Architektur: Zod-Schema + Config-Loader + Fallback
```
