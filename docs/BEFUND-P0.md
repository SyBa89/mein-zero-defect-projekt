# BEFUND P0 - Forensischer Audit (Phase 1, Live-Stand)
Erhoben via Head/JSON-LD/Link-Forensik + Live-Extrakt. Basis fuer PR #30.

## P0 Release-Blocker
1. JSON-LD LocalBusiness priceRange = MOJIBAKE (doppelte UTF-8-Kodierung).
   Fix: Quelldatei einmalig korrekt UTF-8 speichern; Wert z.B. "EUR" oder "€".
2. Fake-CID: https://maps.google.com/?cid=123456789 (Hero Route + Footer).
   Fix: echte CID aus Google Business Profile ODER ehrlicher Fallback
   (Link auf /kontakt + Hinweis "Standort folgt"); NIE Platzhalter live.
3. Erfundene Email im JSON-LD: info@kiosk-lollipop.de (Domain unverifiziert).
   Fix: echte Betreiber-Email (bestaetigt!) ODER Feld entfernen.
4. Demo-Bewertungen mit "5.0 Google"-Anzeige live.
   Fix: Block aus Live entfernen; nur echter Google-Feed ODER ehrlicher
   Leerzustand; Demo ausschliesslich Preview/DEV.
5. Meta-Description = "Willkommen auf unserer Startseite" (Platzhalter).
   Fix: lokale SEO-Description (Kiosk+Hermes+Ort+Zeiten+Telefon).

## P1 (geschaeftskritisch)
6. JSON-LD address ohne Geo-Koordinaten (nur wenn verifiziert ergaenzen).
7. JSON-LD ohne sameAs zum echten Google Business Profile.
8. Canonical ohne trailing slash pruefen.
9. "Aktualisiert taeglich / Alles sofort verfuegbar" = unbelegtes Versprechen
   entfernen oder belegen.
10. Betreiber-Facts ("Seit 2020", Markenliste) als publication-pflichtige
    Felder mit Freigabe kennzeichnen.

## Positiv (kein Handlungsbedarf)
- Keine externen Google Fonts (lokal gebundelt) -> kein Consent-Widerspruch.
- Consent-Banner vorhanden (nur technisch notwendige Cookies).
- JSON-LD FAQPage strukturell valide.
- Skip-Link, Jugendschutz-Hinweise, ehrliche Jackpot/Angebots-Texte.

## Gate-Ampel (Stand jetzt)
A rot | B gelb (Description) | C rot (Route-CID) | D gelb | E rot (Mojibake) | F gelb