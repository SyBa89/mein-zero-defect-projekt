# PREMIUM-STATUS & ENTSCHEIDUNGSLOG (v1.0 - 13.08.2026)

## Verifizierte Scores (Lighthouse 13.4, externe Validierung)
- Mobile:  97 Performance / 100 Accessibility / 100 BP / 100 SEO (TBT 160ms, CLS 0)
- Desktop: 100 / 100 / 100 / 100
- Cross-Browser: Chrome/Brave/Firefox validiert (Inhalte, Theme, Buttons korrekt)

## Architektur-Entscheidungen (mit Begründung)
1. White-Label Single Source of Truth: configs/{tenant}.json (ENV: NEXT_PUBLIC_TENANT_ID)
   - Grund: Trennung Kernlogik/Marken-Daten (Grundsatz 6); Legacy-Dateien eliminiert.
2. framer-motion -> CSS-Transitions + IntersectionObserver (API-identisch)
   - Grund: -92,9 KB Chunk, TBT 420->160ms; prefers-reduced-motion via Media Query.
3. phoneDisplay (Tenant-kontrolliert) statt kaputter Format-Regex.
4. Encoding-Guard: tests/unit/config-encoding.test.ts (verhindert UTF-8-Mojibake dauerhaft).
5. Dependabot-Major-PRs (TS 7, TW 4) NICHT mergen - geplante Migration erforderlich.

## Bekannte, akzeptierte Grenzen (ehrlich dokumentiert)
- Mobile-Perf 97: 11 KiB Legacy-JS (Next-Polyfills) + 11 KiB Bild-Delta nicht ohne
  Framework-Wechsel entfernbar. Desktop beweist Code-Optimalitaet (100).
- 100 mobil zu erzwingen = Regressionsrisiko (Grundsatz 7/8/17) -> bewusst gestoppt.

## Changelog (Session 12./13.08.2026)
- fix(white-label) 6f05f22 | fix(content) 9272745 | fix(encoding) 0bc3f6b
- perf(framer->CSS/IO) 4a0410e | 13/13 Unit-Tests gruen | CI gruen