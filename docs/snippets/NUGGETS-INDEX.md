# NUGGETS-INDEX - 79 Nuggets aus 16 Batches (Kurzform)

## B1 Premium-Bausteine
1 [FX] ScrollExpandMedia: Scroll-Expand-Hero (Video/YouTube/Bild), Progress 0..1
2 [UI] ButtonColorful: Glow-Gradient-CTA (shadcn+lucide)
3 [TH] 21ST-Theme-Galerie: 16+ Themes + UX (Swatch-Filter, Palette-Dots)
4 [DA] ShadcnStore-Dashboard: KPI-Karten, Donut, Status-Pills, Ranking

## B2 CSS/Tailwind
5 [UI] *: Child-Variant (Tailwind 3.4+)
6 [UX] group-[.parent-class] Conditional Styling
7 [UI] Map-Pattern fuer dynamische Klassen (kein Template-Literal)

## B3 Node Fundamentals
8 [SEC] timingSafeEqual fuer Token-Vergleiche
9 [DA] pipeline() fuer grosse Uploads (Backpressure)
10 [REF] EventEmitter fuer Config-Changes (Cache-Invalidierung)

## B4 Node Filesystem
11 [SEC] Try-Read statt Check-then-Read (ENOENT fangen)
12 [UX] JSON.stringify(data,null,2) fuers Debugging
13 [REF] path.join statt String-Concat

## B5 Next/React 19
14 [UX] useOptimistic fuer StyleEditor-Live-Preview
15 [UX] useFormStatus MUSS in Child-Component
16 [SEC] useActionState: prevState kommt als ERSTES Argument
17 [SEC] Cookie-Checkliste: Secure/HttpOnly/SameSite/Path/Max-Age/Rotation
18 [UX] bind(null,id) statt hidden input

## B6 Security
19 [SEC] KRITISCH: JWT nicht als Session-Token (Session-ID+Store besser)
20 [SEC] bcrypt saltRounds >= 10
21 [DA] Prisma Singleton (global.prisma in DEV)
22 [SEC] DOMPurify+jsdom fuer Markdown/HTML serverseitig
23 [SEC] CSRF-Tokens fuer state-changing Operations

## B7 TypeScript/Zod
24 [UX] safeParse statt parse (strukturierte Fehler)
25 [UX] z.preprocess fuer Input-Trimming
26 [UX] Array.isArray-Narrowing (normalizeTags)
27 [UX] _param-Prefix fuer unused Callback-Params
28 [UX] z.coerce + z.strictObject

## B8 HTML/Web Platform
29 [SEC] KRITISCH: Safari-localhost: secure nur in Production
30 [PERF] bfcache: no-cache/no-store Meta fuer stateful Admin-Pages
31 [PERF] img: srcset+width/height+loading=lazy (CLS-frei)
32 [UX] FormData: KEIN Content-Type manuell setzen
33 [UX] Blob->ObjectURL fuer Downloads + revokeObjectURL

## B9 Web Platform Deep-Dive
34 [UX] Clipboard API: async+Fallback+Security-Regeln
35 [DEV] document.designMode='on' zum Prototyping
36 [PERF] Scroll-Handler throttlen (100ms-Cache)
37 [PERF] Canvas High-DPI (devicePixelRatio)
38 [UX] Web-Components-Checkliste (Hyphen, Lifecycle, native Controls)

## B10 Web-Design+Libraries
39 [TH] Classless CSS (Simple.css/Sakura/system.css) als Baseline
40 [UI] MagicUI (React+Tailwind+Framer) als Animations-Inspiration
41 [UX] IndieWeb-Patterns (about/now/uses, 88x31, Webring, Guestbook)
42 [REF] Brad Frost: front-of vs back-of-the-front-end
43 [UI] Interfaces.dev-Details (concentric radius, tabular nums, optical align)
44 [TH] system.css: Browser-Systemfarben als "System Mode"

## B11 Dark SaaS Launch
45 [LAYOUT] Archetyp: Nav+Theme-Toggle -> Hero(Badge/XL/Glow-CTA/Glow/
   Crosshairs) -> Feature-Tabs -> Logo-Wall -> Section-Header
46 [TH] Gradient-Text auf EINEM Headline-Wort
47 [UX] Hairline-Grid-Logo-Wall (monochrome Logos)
48 [UX] Feature-Tabs mit Charakter-Aktivzustand (Pattern+Unterlinie)
49 [TH] Radial-Glow+Vignette+Crosshair-Corners
50 [UX] Theme-Toggle in Nav = Mapping auf Skin-Switcher

## B12 Masterplan+Stitch
51 [TH] Stitch-Tokens: #9333EA/#DB2777/#FFC107/#FAFAFA, Newsreader+Inter
52 [LAYOUT] Editorial-Rezept (Pill-Nav, Eyebrow, Serif-Hero, Bento, Footer)
53 [UX] Luxury Gap 80-120px + Kinetic (Scrollytelling, magnetisch, VT)
54 [REF] Stitch: Export HTML/Tailwind/JSX, Figma, DESIGN.md offen
55 [GOV] Masterplan-Gates A-F = neue Premium-Definition

## B13 UI-Skins (21st.dev Buttons/Cards)
56 [TH] UI-Skin als Ebene 1.7 (Schema uiSkin, token-getrieben)
57 [UI] 7 Style-Familien (Glass/Neo/Glow/Shimmer/Chromatic/Editorial/Mono)
58 [UX] Cockpit-Skin-Galerie mit Live-Vorschau-Karten
59 [FX] Motion-Pakete none/subtle/kinetic + Reduced-Motion-Guard
60 [SEC] Skin-Gates: WCAG-Kontrast/Fokus/Touch vor Freigabe
61 [UX] Headless-Primitives: native Controls, Skin nur visuelle Schicht

## B14 Auth/Onboarding
62 [TH] Auth-Screens erben Tenant-Skin (6 Familien)
63 [UX] Onboarding-Wizard (Back/Continue-Pill+Toggle) fuer W4
64 [UX] Trust+Legal-Microcopy als Textbausteine
65 [UI] Options-Dropdown (Edit/Duplicate/Delete) fuer Cockpit-Tabellen
66 [UI] Zustands-Katalog (Loading-Dots/Coming-Soon/Empty) = Phase-5-Forderung
67 [SEC] Provider-Pills = SSO-Readiness (W4), Session-Modell bleibt

## B15 FAQ/CTA/Pricing
68 [UX] FAQ-Skins (5 Familien) + Pflicht-Support-Footer-CTA
69 [UI] Services-Accordion 01-04 als Branchen-Modul
70 [UI] Preislisten-Modul aus Pricing-Table (neuer Inhaltstyp priceList)
71 [UX] Dual-CTA (Anrufen+Route) mit Skin-Glow
72 [SEC] Trust-Row nur verifizierte Partner, sonst unsichtbar (Gate A)
73 [FX] Shader/Spotlight/Liquid-Backgrounds als Skin-Effekt-Katalog

## B16 Stitch-Dark+Onboarding
74 [TH] Jeder Skin braucht Light+Dark (Stitch beweist es)
75 [UX] Bento mit eingebettetem Widget (Paket-Rechner in Card)
76 [UX] Betreiber-Checkliste (Stages/Progress) = Cockpit-Setup (Gate D)
77 [UX] Multi-Step-Stepper "Step x of y" fuer Tenant-Setup
78 [UX] "How it works"-3-Step als oeffentliches Erklaer-Pattern (Gate B)
79 [UX] Welcome-Modal rollenbasiert + "Don't show again"
## B24 SERP/Local-Pack/AI-Parsing
139 Local-Pack-Schema(A/B/C-Ranking,NAP,reviews) | 140 LLM-gestuetztes-Parsing(BERT-Fallback-bei-DOM-Breaks) | 141 SERP-Features(Knowledge-Graph,PAA,AI-Overviews-Citation)