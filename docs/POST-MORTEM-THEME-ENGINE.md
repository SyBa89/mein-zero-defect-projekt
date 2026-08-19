# Post-Mortem: Theme-Engine Hardening (2026-08-19)

## Vorfälle + Lessons
1. Paste-Pipeline korrumpiert Non-ASCII (Em-Dashes/Emoji -> Mojibake).
   -> Prozessregel: Datei-Inhalte in Skripten sind pure ASCII.
2. Partieller Commit nach fehlgeschlagenem Build (CI/Local-Drift).
   -> Prozessregel: Nach Fix-Commits immer git status pruefen;
      git add -A nach .gitignore-Haertung ist sicher.
3. False Positive P0 (Middleware-Auth): (protected)/layout.tsx uebersehen.
   -> Prozessregel: Erst gesamtes Subsystem auditieren, dann priorisieren.
4. Oval-Cards bei Full-Radius (Design-Defekt erst im Visual-Review sichtbar).
   -> Prozessregel: Jeder visuelle Change bekommt Review-Screenshot-Gate.
5. Multi-line String-Matches scheitern an Newlines (\n vs \r\n).
   -> Technikregel: Zeilen-basierte Patches (ArrayList), keine Here-String-Matches.

## Adoptierte Gates
Build + 88 Tests + Quality Gate + Preview-E2E + Production-E2E + Review-Screenshots.