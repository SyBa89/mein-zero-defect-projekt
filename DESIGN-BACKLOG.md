# DESIGN-BACKLOG v1.0 — Inspiration & UX-Specs
Status: DOKUMENTIERT, nicht implementiert. Regel 50 aktiv.
Trigger fuer Umsetzung: konkreter Kundenbedarf ODER Freigabe Projektleiter.

## 1. UX-SPEC: TOASTS (Quelle: @designmotionhq "Toasts done right")
Gilt fuer: src/components/ToastContainer.tsx (naechste Iteration)
- R1 Position: Desktop bottom-right; Mobile top. Nie zentriert.
- R2 Timing: info=4s auto-dismiss; warning=7s; error=persistent bis bestaetigt.
- R3 Stacking: max 3 sichtbar; spring damping 20 / stiffness 180.
- R4 Dismissible: immer Close-Button; Mobile Swipe; Hover pausiert Timer.
- R5 Color+Icon: info=blau, success=gruen, warning=amber, error=rot/pink;
  NIE nur Farbe (6% Farbenblindheit) - immer Icon + Text.
Audit-Status: OFFEN (ToastContainer noch nicht gegen R1-R5 geprueft).

## 2. COLOR-PALETTEN (Quelle: Wadhah Aloui UX/UI Ebook)
Fuer kuenftige Tenant-Theme-Presets (--theme-primary):
- Travel/Natur: #144425 #D3FA53 #657D6E #E4E9D5 #FFFFFF
- Taxi/Neon:    #0F0F0F #C7FF2E #2E2E2E #FFFFFF #808080
- Audio/Bold:   #FF5C00 #9432F9 #311251 #8155AD #FEFEFE #252326
Hinweis: Vor Einsatz WCAG-AA-Kontrast pruefen.

## 3. TOOL-REGISTER (Intake-klassifiziert)
- HorizonX: BACKLOG Vertical-Template v2; LIZENZ PRUEFEN vor Nutzung.
- Reelfolio: SALES - Showreel "Eine Codebase. Fuenf Branchen."
- Raylight: SALES/BACKLOG - Produkt-Motion-Clips (Cockpit, Live-Save).
- Backgrounds Supply: SALES - OG/Social-Assets; NICHT in Tenant-Seiten (LCP).
- Ascii Magic: ABGELEHNT (Gimmick, passt nicht zur Zielgruppe).
- Doron Supply: ABGELEHNT (keine Photoshop-Pipeline).

## 4. INTAKE-PROTOKOLL (fuer neue Assets)
1 Relevanz (echtes Kundenproblem?) 2 Lizenz (White-Label erlaubt?)
3 Performance (LCP Mobile?) 4 Konsistenz (Design-System?) 5 Blast Radius
Kategorien: CODE (nur Kundenbedarf) / SALES / BACKLOG / ABGELEHNT.
## 5. NACHTRAG 2 - Weitere Paletten + Three.js (Intake 17.08.2026)
Paletten (Wadhah Aloui Ebook, Slides 3-6):
- Flight/Travel:  #47A5FF #000000 #4C5055 #FFFFFF #FF8F00
- Grocery/Fresh:  #004B24 #108A11 #031B03 #FFFFFF #FF7006 #F8D91A  (Top-Kandidat Kiosk-Theme)
- Dashboard/Data: #E1FB15 #32D583 #FFFFFF #131313 #000000
- SaaS/Dark:      #ABF43F #3FF4E5 #FFFFFF #090909 #F0793F
Hinweis: Vor Einsatz WCAG-AA-Kontrast pruefen.
Three.js Particle-Morph (@codewithbhurtel):
- ABGELEHNT fuer Tenant-Seiten (WebGL ~600KB, LCP/Mobile-Battery, Reduced-Motion).
- BACKLOG-Showcase: evtl. Premium-Landing-Hero NUR mit lazy-load + prefers-reduced-motion Fallback.

## 6. NACHTRAG 3 - Swipe-Gesture-Spec + Paletten/Gradients (Intake 17.08.2026)
UX-SPEC: SWIPE/GESTURES (Quelle: @designmotionhq "Swipe is a language")
Gilt fuer: mobile Listen-UIs (z.B. /admin/contacts), kuenftige Cockpit-Iteration
- S1 Thresholds: REVEAL = Menue (kurzer Pull, nichts feuert); COMMIT = Entscheidung.
- S2 Rubber-Band-Physik: Widerstand als Feedback; Haptic Tick bei Commit.
- S3 Richtung: rechts = sicher/reversibel; links = destruktiv. Nie tauschen.
- S4 Discoverability: Launch 1 = Peek-Hint; ab Launch 2 nichts (teach once).
- S5 Safety Net: kein Confirm-Dialog; Undo-Toast mit Countdown (delete fast, forgive faster).
Bezug: ergaenzt Toast-Spec (R2/R4); relevant fuer F1-Audit & Kontakt-Verwaltung (Cockpit hat heute KEIN Undo).
Paletten/Gradients:
- Event/Ticket: #0249E1 #80B0EC #FFFFFF #111111 #DAFB71 #EE3D5A
- Solar Pop:  #FF6A00 -> #FFD500  (Restaurant-Hero-Kandidat)
- Lime Crush: #F9F586 -> #A1FFCE  (Handwerk/Kiosk-Kandidat)
- Berry Frost:#B24592 -> #F15F79  (Friseur-Hero-Kandidat)
Hinweis: WCAG-AA vor Einsatz pruefen. Regel 50 bleibt aktiv.

## 7. NACHTRAG 4 - Style-Direction-Rezept + Gradients (Intake 17.08.2026)
PROZESS-REZEPT (Quelle: @duncanrogoff): "Context before Prompt"
- Nie generisch prompten ("build a landing page") -> erzeugt AI-Default-Look.
- Immer attachen: Brand-Colors, Logo, Referenz-Screenshots, Design-System = Source of Truth.
- Prompt-Schablone: "Design and build a premium, conversion-focused website for [BRAND].
  Strictly follow the uploaded brand colors, typography, logo files and reference
  screenshots as the source of truth. Sections: navigation, hero, features,
  testimonials, pricing, FAQ, footer. Polished, animation-rich, brand-consistent,
  generous whitespace, full responsiveness in one pass."
- Bestaetigt unseren Governance-Ansatz: Manifest/Backlog = Context fuer jede Session.
SELF-AUDIT NOTE: Vertical-Pages (Handwerker/Arzt/Friseur/Restaurant) nutzen
Gradient-Hero + Emoji-Icons = teilweise "AI-Default"-Aesthetik.
-> Design-Pass v2 MIT Backlog-Paletten + Rezept. Trigger: Kundenbedarf. (F13)
Gradients:
- Aurora Dust:    #B993D6 -> #8CA6DB   (Arzt/Vertrauen-Kandidat)
- Sunrise Sorbet: #C6FFDD -> #FBD786 -> #F7797D   (Restaurant/Cafe-Kandidat)
- Neon Pulse:     #8A2387 -> #E94057 -> #F27121   (Event/Lotto-Akzent; WCAG kritisch)
- Mint Eclipse:   #1F4037 -> #493240   (Dark-Mode/Footer-Kandidat)
Hinweis: WCAG-AA vor Einsatz pruefen. Regel 50 bleibt aktiv.
