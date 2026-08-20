# MASTERPLAN - Verbindliche Projekt-Verfassung (kondensiert)
Quelle: projekt_audit_masterplan_kiosk_lollipop.md + Stitch-Audit
Status: VERBINDLICH fuer alle zukuenftigen Aenderungen

## Premium-Definition (alle Ebenen gleichzeitig)
Wahrheitsgemaesse Inhalte | klare Positionierung | ueberzeugendes UX |
eigenstaendige Marke | schnelle/zugaengliche/robuste Technik | Security+Datenschutz |
rechtliche Verlaesslichkeit | wartbare White-Label-Architektur |
professioneller Betreiber-Workflow | nachweisbare Produktionsqualitaet
WICHTIG: Lighthouse/Build/schoene Startseite allein sind KEIN Freigabekriterium.
"ABSOLUT PREMIUM MAXIMAL PERFEKT" erst sagen, wenn die Abnahmematrix gruen ist.

## Erfindungs-Verbot (niemals erfinden)
Betreiber, Bewertungen, Oeffnungszeiten, Adressen, Kartendaten, Preise,
Zertifikate, Partnerlogos, rechtliche Angaben, Leistungsversprechen, Zahlen.
Fehlende Daten = ehrlicher "unvollstaendig/noch nicht veroeffentlicht"-Zustand.

## Qualitaets-Gates
A Content Truth: keine erfundenen Stimmen/Platzhalter/Beispiel-Steuerdaten/
  ungueltige Karten/falsche Zeiten/unbelegte Zertifikate/irrefuehrende Sterne.
B Business Clarity: Angebot, Zielgruppe, Ort, Offen-Status, naechster Schritt
  ohne Sucharbeit erkennbar.
C Experience Quality: Kernaktionen (Telefon/Route/Formular/Nav/Services/
  Zeiten/FAQ/Cookie/Back) auf Desktop+Tablet+Mobile.
D Operational Readiness: Betreiber aendert Zeiten/Sonderzeiten/Notfall/
  Kontakt/Publish/Reset ohne Code; Aenderungen nachvollziehbar+ruecksetzbar.
E Technical Readiness: Build/Typecheck/Lint/Tests/Smoke/keine kaputten Links/
  keine Console-Errors/valides JSON-LD/Security-Header/keine Secrets/
  reproduzierbares Deployment.
F Measurable Quality: echte Mobile+Desktop-Messungen, A11y auto+manuell,
  SEO technisch+inhaltlich, Security-Pruefungen, Conversion-Messbarkeit.

## Phasen 0-12 (Reihenfolge verbindlich)
0 Sicherung/Baseline | 1 Forensischer Audit | 2 Daten-+Content-Fundament |
3 White-Label+Tenant-Isolation | 4 UX+Informationsarchitektur |
5 Designsystem | 6 Content+Bildwelt+Marke | 7 lokale SEO | 8 Accessibility |
9 Performance | 10 Security+Datenschutz+Recht | 11 Admin+Betrieb | 12 QA+Release

## Definition of Done (je Aufgabe)
Ursache behoben | Nutzerfluss OK | Mobile OK | Fehlerzustand definiert |
Datenquelle validiert | keine Demo-Daten sichtbar | A11y beruecksichtigt |
SEO geprueft | Performance geprueft | Security geprueft | Tests/Pruefungen |
Doku aktualisiert. "Sieht gut aus" ist KEIN DoD.

## Release-Blocker
Platzhalter live | erfundene/unmarkierte Bewertungen | ungueltige Karten-URL |
falsche Betreiberangaben | falsche Zeiten | kaputter Kontakt | JS-Fehler im
Hauptfluss | kritische Security-Befunde | fehlerhafter Consent | unlesbarer
Text/fehlender Fokus | kaputtes JSON-LD | fremde Tenant-Daten im Fallback |
fehlende Rueckfallstrategie | nicht reproduzierbares Deployment.

## Prioritaeten
P0 sofort+blockierend | P1 geschaeftskritisch | P2 Premium-Veredelung |
P3 spaetere Expansion. P3 darf P0/P1 NIEMALS verzoegern.

## White-Label-Regeln
Konstant: Gates, Security, Consent, A11y, Performance-Budgets, SEO-Basis,
Fehler-/Ladezustaende, Formularqualitaet, Admin-Rechte, Monitoring, Tests.
Austauschbar: Name/Logo, Farben/Tokens, Typo (lizenzkonform), Bildwelt,
Sprache/Tonalitaet, Navigation, Services/Produkte, Zeiten, Kontakt, Standort,
FAQ, Bewertungen, Betreiberangaben, Branchenstruktur, optionale Module.
Nicht missbrauchbar: Konfiguration darf nie unsicheres Markup/URLs/ungueltiges
JSON-LD/unlesbares Design/ ungetestete Pfade erzeugen (typisiert+validiert).