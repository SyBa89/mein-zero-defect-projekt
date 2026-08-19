# Nuggets-Index (38 Nuggets aus 9 Batches)

## Batch 1: Premium-Bausteine
1. [FX] ScrollExpandMedia - Scroll-gesteuerter Expand-Hero (Video/YouTube/Bild), framer-motion, Wheel/Touch-Progress 0..1
2. [UI] ButtonColorful - Glow-Gradient-CTA (indigo/purple/pink), shadcn-Button + lucide ArrowUpRight
3. [TH] 21ST-Theme-Galerie - 16+ Themes (Discord, Mint Slate, Neon Cyber, Royal Noir etc.) + UX-Patterns (Color-Swatch-Filter, Palette-Dots)
4. [DA] ShadcnStore-Dashboard - KPI-Karten, Line-Chart, Donut-Breakdown, Status-Pills, Top-Products-Ranking

## Batch 2: CSS/Tailwind
5. [UI] `*:` Child-Variant (Tailwind 3.4+) - kuerzer als `[&>*]:` fuer gleiche Kinder
6. [UX] `group-[.parent-class]` - Conditional Styling via Parent-State
7. [UI] Map-Pattern fuer dynamische Klassen - statt Template-Literal (bestaetigt unser FONT_SLUG_MAP-Pattern)

## Batch 3: Node.js Fundamentals
8. [SEC] `timingSafeEqual` fuer JWT/Token-Vergleich - Timing-Attack-Schutz
9. [DA] `pipeline()` fuer grosse Uploads - Backpressure-Handling, Streams
10. [REF] Event Emitter fuer Config-Changes - Multi-Tenant-Cache-Invalidierung

## Batch 4: Node.js Filesystem
11. [SEC] Try-Read statt Check-then-Read - Race-Condition-frei (ENOENT gezielt fangen)
12. [UX] JSON-Pretty-Print fuers Debugging - `JSON.stringify(data, null, 2)`
13. [REF] `path.join()` statt String-Concat - plattformunabhaengig

## Batch 5: Next.js + React 19
14. [UX] `useOptimistic` fuer StyleEditor-Live-Preview - sofortiges UI-Feedback
15. [UX] `useFormStatus` MUSS in Child-Component - pending bleibt sonst false
16. [SEC] `useActionState` aendert Server-Action-Signatur - prevState kommt ERST
17. [SEC] Cookie-Security-Checkliste - Secure/HttpOnly/SameSite/Path/Max-Age/Rotation
18. [UX] `bind(null, id)` statt hidden input - typsicher, eleganter

## Batch 6: Security + Next.js Errors
19. [SEC] **KRITISCH: JWT nicht als Session-Token** - Anti-Pattern, besser: Session-ID + Redis-Store
20. [SEC] bcrypt saltRounds >= 10 pruefen - langsamer = sicherer
21. [DA] Prisma Singleton Pattern - global.prisma in Development
22. [SEC] DOMPurify + jsdom fuer Markdown/HTML - XSS-Schutz server-seitig
23. [SEC] CSRF-Tokens fuer state-changing Operations - POST/PUT/DELETE

## Batch 7: TypeScript + Zod
24. [UX] `safeParse()` statt `parse()` - strukturierte Fehlerbehandlung
25. [UX] `z.preprocess()` fuer Input-Trimming - Whitespace automatisch entfernen
26. [UX] Union-Narrowing mit `Array.isArray()` - normalizeTags-Pattern
27. [UX] `_parameter`-Prefix fuer unused Callback-Params
28. [UX] `z.coerce` + `z.strictObject()` - Env-Vars + unknown Keys

## Batch 8: HTML + Web Platform
29. [SEC] **KRITISCH: Safari-localhost Cookie-Bug** - `secure: process.env.NODE_ENV === 'production'`
30. [PERF] bfcache bei stateful Pages - `no-cache, no-store` Meta-Tags fuer Admin
31. [PERF] img srcset + width/height + loading=lazy - CLS-frei + Performance
32. [UX] FormData fuer File-Uploads - multipart automatisch, KEIN Content-Type
33. [UX] Blob -> Object URL fuer Downloads - `URL.createObjectURL()` + `revokeObjectURL()`

## Batch 9: Web Platform Deep-Dive
34. [UX] Clipboard API Best Practices - async + Fallback + Security-Regeln
35. [DEV] `document.designMode = 'on'` - Inline-Editing zum Prototyping
36. [PERF] Scroll-Event Throttling - setTimeout-Cache (100ms)
37. [PERF] Canvas High-DPI Handling - devicePixelRatio-Skalierung
38. [UX] Web Components Checklist - Hyphen-Name, Lifecycle, Native Controls

## Action-Items (konsolidiert)

### P0 (kritisch, vor V3)
- JWT-Session-Architektur auditieren (#19)
- Safari-localhost Secure-Cookie pruefen (#29)

### P1 (wichtig)
- Admin-Pages mit `no-cache` Meta-Tags (#30)
- bcrypt saltRounds >= 10 pruefen (#20)
- CSRF-Tokens fuer Admin-API (#23)

### P2 (Nice-to-have, V3+)
- Clipboard-API Copy-Buttons im Cockpit (#34)
- Scroll-Throttling fuer ScrollExpandMedia (#36)
- useOptimistic fuer StyleEditor-Refactoring (#14)
- bind()-Pattern fuer Multi-Tenant-Admin (#18)
- FormData-Upload im StyleEditor (#32)
- Blob-Export fuer Config-Download (#33)
- img srcset fuer Performance-Audit (#31)