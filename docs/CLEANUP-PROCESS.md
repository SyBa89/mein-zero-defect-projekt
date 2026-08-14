# 🧹 Cleanup-Prozess (Dreifach-Sicherung)

**Status:** Standard-Praxis für alle Lösch-Operationen
**Ziel:** Verhindert selbstverschuldete Regressionen (Grundsatz 17)

## Die 3 Stufen

### Stufe 1: Soft-Delete (Markieren)
`// DEPRECATED - wird entfernt. Siehe docs/CLEANUP-PROCESS.md`
→ 1 Commit · Git-Historie zeigt wer/wann/warum

### Stufe 2: Auslagern (Verschieben)
`src/lib/x.ts → src/_legacy/x.ts`
→ 1 Commit · Datei verschwindet aus Build, bleibt recoverbar

### Stufe 3: Finaler Cut (Löschen)
`git rm src/_legacy/x.ts`
→ Voraussetzung: Stufe 1+2 liefen ≥7 Tage ohne Probleme

## Entscheidungs-Matrix

| Szenario | Stufen |
|----------|--------|
| Helper < 20 Zeilen | 1 → 3 |
| Modul > 100 Zeilen | 1 → 2 → 3 |
| Öffentliche API | 1 → 2 (nie 3 ohne Major) |
| Lokale Backup-Datei (*.backup_*) | direkt löschbar (nie committet) |

## Checkliste vor Stufe 3

- [ ] Stufe 1+2 ≥ 7 Tage stabil
- [ ] Keine offenen PRs referenzieren die Datei
- [ ] `grep -r "<name>"` zeigt keine Treffer
- [ ] Tests bestehen nach Stufe 2
- [ ] Documentation ist aktualisiert

## Anwendung heute (2026-08-14)

- **34 Backup-Dateien gelöscht** (Stufe 3 ohne 1+2, da nie committet)
- **17 potenzielle Waisen behalten** (false-positives + dynamische Imports)
- **Keine Waisen gelöscht** (zu hohes Regressionsrisiko)