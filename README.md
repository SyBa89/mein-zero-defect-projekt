# Kiosk Lollipop – Erftstadt-Liblar

Die offizielle, produktionsreife Webpräsenz des Kiosk Lollipop in Erftstadt-Liblar. 
Diese Anwendung dient als digitale Visitenkarte, lokale SEO-Anlaufstelle und internes Verwaltungssystem (Admin-Cockpit) für den täglichen Betrieb.

## 🏢 Geschäftsfeatures
- **Dynamische Öffnungszeiten:** Inklusive Feiertags-Regelungen und Sonderöffnungszeiten.
- **Hermes Paketshop:** Informationen zu Paketgrößen und Services.
- **Lotto-Annahmestelle:** Live-Display für den aktuellen Jackpot und Tages-Highlights.
- **Notfall-Banner:** Admin-gesteuerte Sofort-Benachrichtigung bei ungeplanter Schließung (z.B. Krankheit).
- **Local SEO:** Vollständiges JSON-LD Schema (`LocalBusiness`) für optimale Sichtbarkeit in Google Maps und der lokalen Suche.

## 🏗 Technologie-Stack
Dieses Projekt wurde als moderne, serverseitig gerenderte Webanwendung (SSR) konzipiert, um maximale Performance und SEO-Güte zu gewährleisten.

| Technologie | Zweck |
| :--- | :--- |
| **Next.js 15 (App Router)** | React-Framework mit Server Components & Edge-Caching |
| **TypeScript** | Strikte Typsicherheit im Frontend und Backend |
| **Tailwind CSS** | Utility-First Styling für konsistentes, responsives Design |
| **Upstash Redis** | Serverless Datenbank für persistente Konfigurationen |
| **Playwright** | Automatisierte End-to-End (E2E) Tests für kritische Pfade |
| **Vercel** | Hosting, CI/CD-Pipeline und Edge-Network |

## 🚀 Lokale Entwicklung

### 1. Repository klonen
```bash
git clone https://github.com/SyBa89/mein-zero-defect-projekt.git
cd mein-zero-defect-projekt