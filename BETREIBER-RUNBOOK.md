# BETREIBER-RUNBOOK v1.0 — Nach der Uebergabe

Runbook fuer den menschlichen Betreiber (SyBa). Exakte Anleitungen fuer
Aufgaben, die die KI nicht selbst ausfuehren kann (UI, Entscheidungen).

## AUFGABE 1: Custom Domain verbinden (Vercel)
1. https://vercel.com/syba89/mein-zero-defect-projekt/settings/domains
2. "Add" -> Domain eingeben (z.B. kiosk-lollipop.de)
3. DNS-Records kopieren: A 76.76.21.21 | CNAME www cname.vercel-dns.com | TXT
4. Beim Registrar exakt eintragen; 5-60 Min warten; Status "Ready"
5. SSL kommt automatisch (Let's Encrypt)
Nachbereitung: metadataBase in src/app/layout.tsx auf neue Domain setzen.

## AUFGABE 2: SENTRY_*-Env-Vars entfernen
1. Vercel -> Settings -> Environment Variables
2. SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT loeschen
3. Redeploy (Use existing Build Cache); 2 Min warten

## AUFGABE 3: Kundenkontakt Max Mustermann + DSGVO
1. /admin -> Kontakte -> Anfrage oeffnen
2. Per E-Mail-Client beantworten; als erledigt markieren ODER loeschen
3. Retention: max. 6 Monate (Art. 5 DSGVO); Kalender-Erinnerung setzen

## AUFGABE 4: hstspreload.org (OPTIONAL — nur wenn gewollt!)
Voraussetzung: Domain laeuft stabil >= 1 Woche, ALLE Subdomains mit HTTPS.
Warnung: Einmal gelistet = kein Zurueck zu HTTP. Bei Zweifel: NICHT einreichen.
Erst NACH Annahme: "preload" in next.config.ts wieder aktivieren.

## AUFGABE 5: Montag-Frueh-Check (woechentlich, 2 Min)
1. Website oeffnen -> steht "Heute geoeffnet: 07:30 - 19:00 Uhr"?
2. Ja: ok. Nein: Admin-Cockpit pruefen; Eskalation unten.

## Eskalation (lokal)
cd <projekt>; npm run build
$env:E2E_MUTATE="true"; npx playwright test tests/e2e/live-save.spec.ts --reporter=line

## Notfall
- Offline: vercel-status.com -> GitHub Actions -> /api/redis-health -> git revert HEAD + Redeploy
- Passwort vergessen: npm run pw:hash -> .env.local -> Vercel ADMIN_PASSWORD -> Redeploy

## Strategie-Annex (NICHT auf Vorrat bauen; Regel 50)
Platform-Pivot (P2) | Booking-Embed (P2) | JSON-LD (P2) | Hermes-API (P3)
ISR statt force-dynamic (P3) | jose/jsonwebtoken konsolidieren (P3)
Entscheidungsregel: nur bauen, wenn zahlender Kunde es konkret anfragt.

*Version 1.0 — Uebergabetag. Teil der Git-History.*