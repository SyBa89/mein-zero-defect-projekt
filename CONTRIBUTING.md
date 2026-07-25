# 🤝 Contributing – Kiosk Lollipop

Vielen Dank, dass du zu diesem Projekt beitragen möchtest! Um den **Zero-Defect-Goldstandard** aufrechtzuerhalten, beachte bitte folgende Richtlinien.

## 🛠️ Entwicklungsumgebung

1. Repository forken und lokal klonen.
2.

pm install ausführen. 3. .env.local gemäß README.md einrichten. 4.
pm run dev starten.

## 📝 Code-Stil & Architektur

- **TypeScript**: Strikte Typisierung (strict: true) ist Pflicht.
- **Server vs. Client**: Nutze 'use client' nur, wenn du zwingend Browser-APIs oder State benötigst.
- **Sicherheit**: Secrets gehören **niemals** in den Code. Immer process.env nutzen.

## 🔧 Commit-Konvention

Wir folgen _Conventional Commits_:

- eat: Neues Feature
- ix: Bugfix
- docs: Dokumentation
- chore: Wartung
- est: Tests
- security: Sicherheitsfix
