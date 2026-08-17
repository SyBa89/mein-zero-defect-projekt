# QUALITY MANIFESTO v1.0 — Projektverfassung

Dieses Dokument ist die unveränderliche Richtschnur für alle Entscheidungen im Projekt.
Bei jedem Gate, bei jedem Commit, bei jeder Entscheidung MUSS gegen diese Invarianten geprüft werden.

## 1. DIE 8 ROLLEN-PERSPEKTIVEN (jede Änderung muss alle 8 bestehen)

| # | Rolle | Nicht verhandelbare Invariante |
|---|---|---|
| 1 | Security | Header wortgetreu korrekt; keine Falschaussagen (preload, etc.); CSRF auf POSTs; sichere Cookies |
| 2 | DevOps | Repo sauber (keine Build-Artefakte); CI-Gates grün; reversible Commits |
| 3 | Legal | DDG/MStV aktuell; Drittland-Transparenz (Upstash, Vercel); DSGVO Art. 13 vollständig |
| 4 | Performance | Tradeoffs bewusst entschieden & dokumentiert (force-dynamic vs ISR) |
| 5 | SEO | metadataBase, Canonicals, JSON-LD, sitemap/robots/llms.txt |
| 6 | UX/Vertical | Kiosk/Handwerk/Friseur/Restaurant-spezifisch geprüft |
| 7 | Sales | Multi-Tenant-Argument beweisbar (nicht nur behauptet) |
| 8 | Accessibility | WCAG 2.1 AA; Footer-Jahr dynamisch; Kontraste geprüft |

## 2. DIE 30 FRAGEN — JEDERZEIT ZU BEANTWORTEN

Für jedes Gate muss der Projektleiter diese Fragen schriftlich beantworten können:
- Habe ich wirklich ALLES Wissen angewendet?
- Habe ich als Experte / Projektleiter gehandelt?
- Was gibt es noch zu berücksichtigen / vertiefen?
- Was erkenne ich, das dem Kunden verborgen bleibt?
- Welche Richtlinien müssen eingearbeitet werden?
- Welche Blind Spots habe ich unaufgefordert aufgedeckt?
- Welche Infos fehlen mir noch?
- Was sollte ich validieren / kritisch prüfen?
- Was kann ich tun, um das Projekt besser zu verkaufen?
- Worauf achten Kunden in KIOSK / HANDWERK / RESTAURANT / FRISEUR?
- Ist Darstellung & Umsetzung ABSOLUT PREMIUM MAXIMAL PERFEKT?

## 3. RED-TEAM-TEST (was würde ein echter Experte finden?)

Vor jeder Übergabe wird geprüft:
- Peinliche Befunde? (typos, tote Links, leere Platzhalter, `samenorgien`-Artiges)
- Legal-Fallen? (Abmahnrisiken)
- Security-Lücken? (CORS, CSRF, HSTS-Konfiguration)
- Tech-Debt-Verheimlichung? (undokumentierte Entscheidungen)

## 4. SCOPE-FREEZE-REGEL

Nach Gate 3 gilt: Kein neuer Code. Strategische Items (Platform-Pivot, Vertical-Features,
Booking-Integrationen) kommen NUR in den Strategie-Annex. Regel 50 = STOP OPTIMIZING.

## 5. GATE-PROTOKOLL

| Gate | Ziel | Exit-Kriterium |
|---|---|---|
| 0 | Ground Truth | Bewiesene Wahrheit (nicht alte Logs) |
| 1 | Root-Cause-Closure | Nur bewiesene rote Befunde geschlossen |
| 2 | Repo-Hygiene | `git ls-files` Count = 0 für Artefakte |
| 3 | Scope-Freeze | Keine neuen Features mehr |
| 4 | Übergabe | Zertifikat + Checkliste + One-Pager + Annex |

## 6. GEGEN VERLUST DES KURSES

Dieses Dokument ist **committet** und damit Teil der Git-History.
Es kann nicht vergessen, nicht verloren, nicht überschrieben werden.
Jede künftige Session, die an diesem Projekt arbeitet, beginnt hier.

---
*Version 1.0 — erstellt am Übergabetag*
*Signatur: Principal Technical Lead + Projektleiter*