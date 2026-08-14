# 🗺️ Zukünftige Verbesserungen (für nächste Projekte)

**Status:** Referenzdokument · nicht für aktuelles Projekt
**Datum:** 2026-08-15
**Quelle:** Externe Premium-Engineering-Analyse

## Kontext

Eine tiefgründige Analyse hat Prinzipien und Referenzen identifiziert, die für
**zukünftige** Projekte von Anfang an angewendet werden sollten. Für das
aktuelle Projekt (funktional fertig, Desktop 100/100/100/100, Mobile 89)
würden weitere Änderungen gegen Grundsatz 50 (Stop Optimizing) und 51
(Diminishing Returns) verstoßen.

## Erweiterte Referenz-Architektur

| Bereich | Primäre Referenz | Prinzip |
|---------|-----------------|---------|
| Web-Infrastruktur | Vercel + Next.js | SSR/Streaming/Caching |
| Browser-Realität | MDN | Semantisches HTML, native Controls |
| Performance | web.dev + CWV | Lab + Feld-Daten |
| Visual Design | Apple HIG | Hierarchie, Klarheit, Konsistenz |
| Produktkommunikation | Stripe | Trust, Informationshierarchie |
| Service-UX | GOV.UK | Task-first, Accessibility-first |
| Accessibility | WCAG 2.2 + GOV.UK | Standard + praktische Umsetzung |
| Application Security | OWASP ASVS 5.0 | Verifikationsrahmen |
| Edge Security | Cloudflare | WAF, TLS, CDN |
| SEO | Google Search Central | Offizielle Anforderungen |
| Observability | Sentry | Error + Release + Performance |
| Design-System | Spotify + GOV.UK | System of Systems |

## System-Engineering-Prinzipien

### Requirement Traceability
Requirement → Design → Implementation → Test → Validation → Release

### Blast-Radius-Analyse
Local → Component → Feature → Tenant → Application → Infrastructure

### Invariants
- Security: keine Secrets, kein Cross-Tenant-Zugriff
- Architecture: Core tenant-unabhängig
- Data: keine inkonsistenten Zustände

### Complexity Budget
Jede zusätzliche Library/Abstraktion/Config muss Mehrwert rechtfertigen.

## Rechtliche Rahmenbedingungen (DE/EU, Stand 2026)

- **BFSG/BFSGV:** Barrierefreiheitsstärkungsgesetz (seit 28.06.2025)
- **AI Act:** EU-KI-Verordnung (grundsätzlich anwendbar seit 02.08.2026)
- **DDG:** Digitale-Dienste-Gesetz (Impressumspflicht §5)
- **TDDDG:** Cookie/Einwilligungs-Regelung §25
- **DSGVO + EDPB:** Datenverarbeitung, besonders Gesundheitsdaten
- **PAngV:** Preisangaben bei Dienstleistungen/Produkten
- **UWG §7:** E-Mail-Werbung nur mit Einwilligung

## Empfohlene Vorgehensweise für neue Projekte

1. Requirements Engineering **vor** Implementation
2. Traceability von Anfang an
3. Invariants definieren **vor** Coden
4. OWASP ASVS als Security-Baseline
5. GOV.UK als UX-Referenz (besser als Notion)
6. Rechtliche Rahmenbedingungen **früh** prüfen
7. Threat-Model pro kritischer Funktion
8. Tenant-Isolation als Architektur-Prinzip

## Warum nicht für dieses Projekt?

- Desktop bereits 100/100/100/100
- Mobile bereits 89/100/100/100 (stark)
- Security gehärtet + regression-gesichert
- Accessibility WCAG 2.2 AA
- Production live

Weitere Optimierungen würden gegen Grundsatz 8 (Fortschritt statt
Rückschritt), 17 (keine selbstverschuldeten Probleme) und 50/51 (Stop
Optimizing / Diminishing Returns) verstoßen.