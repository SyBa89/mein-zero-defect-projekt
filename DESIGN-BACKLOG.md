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

## 8. NACHTRAG 5 - Impeccable + Webhook-Security-Spec + Gradients (Intake 17.08.2026)
TOOL: pbakaus/impeccable (GitHub, ~56k Stars) - "The design language that makes
your AI harness better at design." 188 gepruefte Design-Welten (Risograph-Aushang,
Sattelleder & Faden, Rennserien-Livery u.a.).
- TOP-KANDIDAT fuer F13: pro Vertical/Brand EINE Design-Welt waehlen,
  statt Template-Einheitsbrei ("AI baut immer denselben Look").
- Lizenz pruefen (F8) vor Einsatz.
SEC-SPEC: WEBHOOKS (Quelle: @webnailed 07/Payments) - "verify before you trust"
- Payment-Webhooks NUR mit Signatur-Pruefung akzeptieren (z.B. Stripe-Signature +
  Secret); sonst kann jeder "order paid" fälschen.
- Verbindlich fuer kuenftige Payment-/Booking-Integrationen. (F14)
BESTAETIGT: @webnailed 06 (Input Validation zod/joi) = unsere Praxis
(OverrideSchema, ClientConfigSchema) - keine Aktion noetig.
Gradients:
- Cyber Bloom: #FF0099 -> #493240  (Friseur/Event-Akzent)
- Ocean Rose:  #AA4B6B -> #3B8D99  (Friseur/Restaurant-elegant)
Hinweis: WCAG-AA vor Einsatz pruefen. Regel 50 bleibt aktiv.

## 9. NACHTRAG 6 - Meridian-Designwelt + Sales-Patterns + Security-Validierung (Intake 17.08.2026)
DESIGN-WELT (Quelle: @erlich.studios "Meridian"):
- Dark-Navy + Gold/Creme, Serif + Italic-Akzente = "Premium Handwerk/Agentur".
- Kandidat fuer Handwerker-Premium-Theme (vgl. Impeccable "Sattelleder & Faden").
SALES-PATTERNS (aus Meridian, fuer unsere Verkaufs-Story):
- Risk-Reversal: "Sehen Sie Ihre Website, bevor Sie zahlen" (kostenloser Erst-Entwurf).
- Prozess-Transparenz: "In vier Schritten online" (Briefing, Entwurf, Feinschliff, Online).
- Social-Proof-Stats-Zeile (Jahre, Projekte, Sterne, Zufriedenheit).
- WhatsApp-CTA als Zweit-Kanal neben Telefon (KMU-Realitaet in DE). (F15)
SECURITY-VALIDIERUNG EXTERN (@webnailed-Serie):
- 02 SQL-Injection: N/A by architecture (kein SQL; Redis KV + statische Configs).
- 03 Hashing bcrypt/argon2: BESTAETIGT (bcryptjs, hash+verify roundtrip getestet).
- 04 JWT verify statt decode: BESTAETIGT (verifySessionToken prueft Signatur).
- 05 Rate Limiting: BESTAETIGT (rate-limit.ts + Tests).
-> Keine Aktion; dient als externer Nachweis fuer das Uebergabe-Zertifikat.
Regel 50 bleibt aktiv.

## 10. NACHTRAG 7 - SSR-Validierung + CORS-Policy + Inspirations-Verzeichnisse (Intake 17.08.2026)
ARCHITEKTUR-VALIDIERUNG (Quelle: @kuls.tech SSR):
- SSR richtig fuer content-heavy, public-facing Sites (Storefronts) - bestaetigt unsere
  Next.js-App-Router-Wahl fuer Tenant-Seiten (First Paint ~0.3s statt 3.4s; SEO/Sharing).
- Trade-off "server does more work per request" = exakt der Grund fuer F10 (ISR/Caching),
  um Server-Last pro Request zu senken ohne First-Paint/SEO zu verlieren.
SEC-NOTE: CORS (Quelle: @webnailed 01) - "Allow-Origin: * = everyone on the list"
- Unsere Policy: "*" NUR auf oeffentlichem Read-Only-Endpoint /api/config
  (Daten ohnehin oeffentlich; erlaubt Widget-Embeds).
- Admin-/Mutations-Endpoints: KEINE CORS-Header (same-origin only). (F16 - dokumentieren)
INSPIRATIONS-VERZEICHNISSE (grafikcem):
- toolfolio.io (Framer, Rive, Spline) - fuer F13 Animations/Design-Pass.
- adfolio.design (B2B-Ads/Creative) - fuer Marketing-Phase.
- savee.com (Moodboards) - fuer F13 Design-Welt-Auswahl.
Regel 50 bleibt aktiv.

## 11. NACHTRAG 8 - Motion/UX-Formeln + Animated-Mockup-Stack (Intake 17.08.2026)
UX-SPEC: MOTION & FORMELN (Quelle: @yassinezaanouni "Seven Formulas")
- Motion Duration: 200-300ms fuer UI-Bewegung; <100ms = nichts bewegt; >500ms = Warten.
  Groessere Elemente = laengere Dauer (Material Guidance).
- 45-75 Zeichen/Zeile (Measure) fuer Lesetexte.
- Fitts: Primaer-CTAs gross + nah platzieren.
- Hick: Auswahl reduzieren (Entscheidungszeit = log2(n+1)).
- Doherty: Interaktion <400ms = instant (validiert: Live-Save + SSR-First-Paint).
- Miller 7±2: max ~7 sichtbare Gruppen (Cockpit-Sektionen bei Iteration pruefen).
- 60/30/10: 60% Haupt-/30% Zweit-/10% Akzentfarbe.
  "Accent only works while rare - spend it on the thing you want clicked."
  Validiert unsere Praxis: --theme-primary nur fuer CTAs (Anrufen/Route/Speichern).
SALES-STACK: ANIMATED MOCKUPS (Quelle: @janm_ux)
- Pipeline: Figma -> Jitter (jitter.video, AI-Brainstorm) -> Video-Export
  -> ultramock.io (Device-Templates) -> top-tier animated Mockup.
- Einsatz: Showreel/Landing/Sales-Material (vgl. Reelfolio, Raylight), NICHT Tenant-Code.
efecto.app (Dither/ASCII): wie Ascii Magic - ABGELEHNT fuer Tenants; optional OG/Social-Art.
Regel 50 bleibt aktiv.

## 12. NACHTRAG 9 - Handwerker-Redesign-Case + Formel-Vertiefung (Intake 17.08.2026)
CASE STUDY (Quelle: @bilal.webdesign "Dill Energy", Elektro/Solar):
- Vorher: beige/datiert, kleine Bilder -> Nachher: dark + Marken-Akzent (Orange),
  Bold-Typo, Scroll-Storytelling, Stats-Cards, Partner-Logos, Projekt-Fotos.
- GOLD-REFERENZ fuer F13 Handwerker-Vertical: dieser Stil-Pass ist der
  Premium-Standard im Handwerk (dunkel + Akzent + Story + Proof).
- SALES-PATTERN: "Gleiche Firma. Neuer Auftritt." - Vorher/Nachher als Demo-Werkzeug.
FORMELN VERTIEFT (@yassinezaanouni Einzelkarten):
- Miller praezisiert: 7±2 = Gedaechtnis-Span (~4 nach Cowan), NICHT Nav-Link-Limit.
  -> Entscheidungs-Kontexte klein halten (Hick); Nav darf mehr Links bei Gruppierung.
- Doherty 400ms: "A spinner buys you nothing - you missed the budget."
  -> Validiert: SkeletonLoader statt Spinner ist die richtige Wahl.
- Fitts 2D/W: "distance and size are the only two dials."
  -> Validiert: MobileActionBar (fix unten, grosse Targets) = D~0 = Fitts-optimal.
- Measure 45-75 (Ziel 66ch): Lesetexte (Datenschutz/About) im F13-Typo-Pass pruefen.
Regel 50 bleibt aktiv.

## 13. NACHTRAG 10 - Optimierungs-Level-Modell + Mockup/Sales-Tools (Intake 17.08.2026)
STRATEGIE: SELF-DRIVING WEBSITE 5-LEVEL-MODELL (Quelle: @ki_borish)
- L1 Statisch (alle sehen dasselbe) = UNSER IST-ZUSTAND, bewusst privacy-first (cookieless).
- L2 Tracking -> bei uns NUR cookieless (Vercel Web Analytics), DSGVO-konform ohne
  Consent; passt zu Runbook-Item "Enable Web Analytics". (F17)
- L3 A/B-Test (ship the winner) -> Vercel Flags (Dashboard-Recommendation vorhanden). (F17)
- L4 KI-Agent (testet & shippt, Human-in-the-Loop) = Vision/Backlog.
- L5 Personalisiert (perfekte Version pro Besuch; Loop zeigen->messen->lernen->anpassen)
  = Vision/Backlog.
- BUSINESS-INSIGHT: Level = Upsell-Stufen der Plattform (Service-Tiers fuer Kunden).
- DSGVO-Grenze: L2+ nur cookieless ODER mit Consent-Banner; nie Third-Party-Tracking.
SALES-STACK ERGAENZT (Quelle: @yassinezaanouni "Best Free Mockup Websites"):
- browserframe.com (Screenshots in echte Browser-Frames, free) - Angebote/OG.
- artboard.studio (Produkt-Mockups im Browser, freemium).
- mockups-design.com (Mockup-Dateien ohne Signup, free).
- Reelfolio erneut als "MY PICK" bestaetigt (Showreel).
Regel 50 bleibt aktiv.

## 14. NACHTRAG 11 - EU AI Act Transparenz + UI-Libs (Intake 17.08.2026)
LEGAL/COMPLIANCE: EU AI ACT (Quelle: @itzdross; seit 02.08.2026 IN KRAFT)
- Transparenzpflicht fuer KI-Inhalte: Kennzeichnung erforderlich (maschinlesbare
  Provenienz, C2PA/Watermarking); Bussgelder bis 35 Mio. EUR.
- NIEMALS Watermark-/Provenance-Remover einsetzen = Verstoss-Risiko.
- Unsere Praxis validiert: Demo-Reviews bereits transparent als Demo gekennzeichnet.
- F18 AI-CONTENT-POLICY (dokumentieren, kein Code jetzt):
  (a) KI-generierte OG/Social-Assets labeln;
  (b) Tenant-Uploads mit KI-Anteil kennzeichnen;
  (c) AI-Act-Hinweis in naechste Legal-Revision (Runbook/Datenschutz-Anhang).
UI-LIBS (F13-Backlog; Lizenz-Check F8 vor Einsatz):
- VengeanceUI (Next-Gen Interactions; Vercel OSS Program) - Marketing/Landing.
- AnimmasterLib (300 Pro-Components von Award-Sites) - F13 Design-Pass.
- SkiperUI (Uncommon Tailwind Components, npx shadcn add) - Tailwind-kompatibel.
SALES-STACK:
- mockuphone.com (Device-Frames, free) - ergaenzt BrowserFrame/Artboard/Mockups-Design.
Regel 50 bleibt aktiv.
