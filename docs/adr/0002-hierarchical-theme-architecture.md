# ADR-002: Hierarchische Theme-Architektur mit Design-Sprachen

Status: Akzeptiert (2026-08-19)

## Kontext
Die Plattform muss pro Tenant individuell brandbar sein (White-Label),
ohne Code-Aenderungen. Blosse Farb-Overrides reichten nicht: Kunden
wollen komplette Stil-Identitaeten (Premium, Elegant, Bold, Dark).

## Entscheidung
4-Ebenen-Hierarchie mit Single-Source-Merge (getEffectiveConfig):
- Ebene 1: Design-System (Business-Type ODER Design-Sprache via designSystemId)
- Ebene 2: Tenant-Defaults (config.theme)
- Ebene 3: Runtime-Overrides (Redis, StyleEditor, live editierbar)
- Tokens: CSS-Variablen server-seitig (SSR) + client-konsistent (ThemeContext)

Design-Sprachen besitzen die Card-Radien (eigene Skala, gekappt via min),
der Editor-Regler steuert Buttons/Badges (--theme-radius).

## Konsequenzen
+ Ein Klick = komplette visuelle Identitaet (Farben, Typo, Radien, Schatten)
+ SSR/CSR konsistent, kein FOUC, kein Drift nach Client-Mount
+ Enum-validiert (Zod), STRIP-Modus, Reset sicher (nullable)
+ Dark-Premium (Royal Noir) ohne separates Dark-Mode-System
- Surface-Wiring erforderlich (bg-white -> var(--color-surface))
- Preview/Production teilen Redis (siehe Runbook Task 9: Backup/Restore)

## Rollback
Squash-Revert der Theme-PRs; Redis-Overrides bleiben unkritisch (Schema-Strip).