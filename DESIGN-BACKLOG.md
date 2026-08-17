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
