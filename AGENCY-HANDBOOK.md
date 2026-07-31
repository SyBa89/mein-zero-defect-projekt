# 🏛️ Zero-Defect Agency Framework - Handbuch

Dieses Repository ist die Master-Blaupause für hochperformante, rechtssichere und SEO-optimierte Local-Business-Webseiten.

## 🚀 So onboardest du einen neuen Kunden (in 15 Minuten)

1. **Repository klonen:** Erstelle ein neues Repo für den Kunden und klone dieses Master-Template.
2. **Config anpassen:** Öffne `src/lib/client.config.ts` und trage die Daten des neuen Kunden ein (Name, Adresse, Place ID).
3. **Typ anpassen:** Ändere `business.type` (z.B. auf `'restaurant'`).
4. **Bilder tauschen:** Ersetze die Platzhalter in `public/images/` durch echte Fotos des Kunden.
5. **Domain verbinden:** Trage die Domain des Kunden im Vercel-Dashboard ein.
6. **Deployen:** `git push origin main` -> Vercel baut automatisch.

## 🎨 Branding & Farben
Das System nutzt Tailwind CSS. Die Primärfarbe wird in der `client.config.ts` definiert (`primaryColor`). 
Um das Theme global anzupassen, ersetze in den Komponenten die hartcodierten Farben (z.B. `pink-600`) durch die entsprechenden Tailwind-Klassen der neuen Farbe.

## ⚖️ Rechtssicherheit (Automatisch)
Das Impressum (`src/app/impressum/page.tsx`) ist so gebaut, dass es automatisch den Hinweis auf die **Kleinunternehmerregelung (§ 19 UStG)** einblendet, wenn in der Config `business.isSmallBusiness: true` gesetzt ist. Für Kunden mit Umsatzsteuer-ID trage einfach `business.vatId` ein und setze `isSmallBusiness: false`.

## 📍 Local SEO
Das `LocalBusiness` JSON-LD Schema und die Sitemap ziehen sich alle Daten aus der `client.config.ts`. Du musst keine SEO-Tags mehr manuell pflegen.

## 🛡️ Zero-Defect Guardrails
- **Husky & lint-staged:** Verhindern, dass unsauberer Code committet wird.
- **GitHub Actions:** Bauen und prüfen jeden Push automatisch.
- **Vercel:** Deployt nur, wenn der Build zu 100 % fehlerfrei ist.