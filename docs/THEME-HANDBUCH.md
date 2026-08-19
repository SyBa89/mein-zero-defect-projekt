# Theme-Handbuch (Betrieb)

## StyleEditor (Admin > Cockpit)
1. Design-Sprache waehlen (Royal Noir / Urban Bold / Nature Calm / Boutique Elegance)
   ODER Business-Standard (automatisch).
2. Optional: Preset anwenden ODER Farben/Radien/Fonts manuell setzen.
3. Speichern -> sofort live (SSR + Client konsistent).
4. Reset -> faellt auf Tenant-Defaults zurueck.

## Regeln
- Radien: Sprache besitzt Cards, Editor-Regler besitzt Buttons.
- Full-Radius erzeugt keine Oval-Cards (min-Kappung, V2.4).
- Fonts: nur Enum-Werte (poppins/montserrat/roboto/lora/inter/source-sans).

## Stoerungsfalle
- Theme aendert sich nicht: Redis-Override pruefen (Runbook Task 9),
  /api/admin/config POST liefert 422 mit issues-Liste (Feldnamen im Toast).
- Preview und Production teilen denselben Redis: Tests immer mit Reset beenden.