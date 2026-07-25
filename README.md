# 🍭 Kiosk Lollipop – Zero-Defect Web OS

> **Produktionsreife Next.js 15 Webanwendung mit Admin-Panel, Redis-Caching, Sicherheits-Goldstandard und vollautomatisierten E2E-Tests.**

---

## 📌 Projektübersicht

Dieses Projekt ist die offizielle Webpräsenz des **Kiosk Lollipop** in Erftstadt-Liblar.  
Es bietet:

- 🏪 **Dynamische Inhalte** – alle Geschäftsdaten werden über ein Admin-Panel verwaltet und in Redis gespeichert.
- 🔒 **Enterprise-Sicherheit** – Rate Limiting, CSP, timingSafeEqual, XSS-Schutz, Security-Header.
- ⚡ **Next.js 15 App Router** – Server-Komponenten, unstable_cache, revalidateTag.
- 🧪 **Vollständige E2E-Tests** – Playwright prüft Login, Admin-Cockpit und Health Check (6/6 grün).
- 📈 **SEO-optimiert** – Dynamische Sitemap, Robots.txt, Open Graph, JSON-LD.

---

## 🚀 Technologie-Stack

| Technologie       | Zweck                                          |
| ----------------- | ---------------------------------------------- |
| **Next.js 15**    | React-Framework mit App Router                 |
| **TypeScript**    | Strikte Typsicherheit (strict: true)           |
| **Tailwind CSS**  | Utility-First Styling                          |
| **Upstash Redis** | Serverless Caching & persistente Konfiguration |
| **Playwright**    | Cross-Browser E2E-Testing                      |
| **Vercel**        | Hosting, CI/CD & Edge Network                  |

---

## 📦 Installation & Setup

### 1. Repository klonen

git clone https://github.com/SyBa89/mein-zero-defect-projekt.git
cd mein-zero-defect-projekt

### 2. Abhängigkeiten installieren

pm install

### 3. Umgebungsvariablen einrichten

Erstelle eine .env.local-Datei im Projektroot:
KV_REST_API_URL=https://your-upstash-redis-url
KV_REST_API_TOKEN=your-upstash-redis-token
INTERN_PASSWORD=dein-sicheres-passwort-min-12-zeichen

### 4. Entwicklungsserver starten

pm run dev

---

## 🧪 Tests ausführen

px playwright test

---

## ⚠️ Rechtliche Hinweise (TODO vor Live-Gang)

Dieses Projekt ist technisch bereit für die Produktion. Vor dem öffentlichen Launch müssen jedoch folgende geschäftliche Punkte geklärt werden:

- [ ] Impressum (anwaltlich geprüft)
- [ ] Datenschutzerklärung (DSGVO-konform)
- [ ] Cookie-Consent (falls zukünftig Tracking-Cookies hinzugefügt werden)

---

_Entwickelt mit Leidenschaft für saubere Architektur und kompromisslose Qualität. © 2026_
