# VISION - White-Label-Plattform mit UI-Skin-Engine
Ziel: Jede Kunden-Webseite (Kiosk/Restaurant/Friseur/Handwerk/Arzt/...) sieht
strukturell UND stilistisch eigenstaendig aus - komplett cockpit-gesteuert,
ohne Code-Forks. Qualitaets-Gates bleiben konstant (siehe MASTERPLAN.md).

## Schichten-Modell
Ebene 1   Branchenprofil  (Inhalte, Pflichtfelder, Navigation, JSON-LD-Typ,
                           Conversion-Ziel, Tonalitaet)
Ebene 1.5 Design-Sprache  (Farben, Typo, Radien, Schatten) - LIVE (7 Systeme)
Ebene 1.7 UI-Skin         (Komponenten-Aesthetik + Motion) - NEU
Ebene 2   Tenant-Defaults (config.theme)
Ebene 3   Runtime-Override (Cockpit, Redis, live editierbar)

## UI-Skin-Engine (Ebene 1.7)
- Schema: uiSkin: z.enum([...]) nullable, wie designSystemId (Ebene 1.5).
- Umsetzung token-getrieben: CSS-Komponenten-Varianten (Muster existiert:
  radius-token-*), z.B. --btn-style, Card-/Nav-/Shadow-Rezepte je Skin.
- Cockpit-UI: 21st.dev-artige GALERIE mit Live-Vorschau-Karten statt Dropdown.
- Motion-Pakete je Skin: none/subtle/kinetic - IMMER prefers-reduced-motion.
- Skin-Gates: jeder Skin muss WCAG-Kontrast, Fokus-Zustaende, Touch-Groessen
  bestehen, sonst nicht freigeschaltet (Konfiguration umgeht keine Qualitaet).
- Jede Oberflaeche erbt den Skin: oeffentliche Seite, Auth/Login, Cockpit.

## Skin-/Style-Familien (Katalog, siehe snippets/STITCH-UND-SKINS-DNA.md)
Liquid Glass | Neumorphic | Gradient Glow | Shimmer | Chromatic |
Editorial/Quiet Luxury | Minimal Mono | Dark SaaS Launch.

## Modul-Rezepte (pro Branche wiederverwendbar)
- Preislisten-Modul (Pricing-Table-Pattern): neuer Inhaltstyp priceList
  (Kategorien, Positionen, Preise optional, publication-Status).
- Services-Accordion 01-04 statt statischer Icon-Grids.
- FAQ-Skins (Pills/Numbered/Grouped+Support-CTA/Split-Foto).
- Dual-CTA (Anrufen primaer + Route/Kontakt sekundaer) mit Skin-Glow.
- Trust-Row NUR mit verifizierten Partnern (brand.partners[] mit Freigabe),
  sonst Sektion unsichtbar (Gate A).
- Bento-Grid mit eingebetteten Widgets (z.B. Paketgrößen-Rechner in Card).
- Betreiber-Wizard: Stage-Checkliste mit Progress (Cockpit-Onboarding),
  Multi-Step-Stepper fuer Tenant-Setup (W4), Welcome-Modal rollenbasiert.
- "How it works"-3-Step als oeffentliches Erklaer-Pattern (Gate B).

## Stitch-Integration
"Quiet Luxury / Editorial" (Newsreader+Inter, #9333EA/#DB2777/#FFC107/#FAFAFA,
Luxury Gap 80-120px, Bento, Light+Dark) wird ERSTER vollstaendiger Skin +
Layout-Archetyp fuer den Kiosk-Mandanten.

## Bereichs-Plan (Abarbeitungsreihenfolge)
A Content-Wahrheit+Recht (P0, siehe BEFUND-P0.md)
B Daten-Fundament+Publishing (Pflichtfelder, Draft->Publish, Historie, Restore)
C SEO/Local (Geo/sameAs, Canonical, Title/Desc pro Seite)
D UI-Skin-Engine (Vision)
E Design-Upgrade Kiosk (Stitch-Skin als Beweis der Engine)
F Accessibility+Performance (WCAG 2.2 AA, Budgets, Reduced Motion)
G Betrieb+QA (Monitoring, Smoke-Tests, Abnahmematrix)
REGEL: D-G duerfen A-C niemals verzoegern.