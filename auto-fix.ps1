$file = "src\components\Header.tsx"
$text = Get-Content $file -Raw -Encoding UTF8

# 1. usePathname importieren (sicherer, einfacher Ersatz)
$text = $text -replace "from 'react';", "from 'react';`nimport { usePathname } from 'next/navigation';"

# 2. currentPath im Interface optional machen (das '?' ist der Schlüssel)
$text = $text -replace "currentPath: string", "currentPath?: string"

# 3. Aktiven Pfad automatisch ermitteln
$text = $text -replace "(export default function Header\([^)]*\) \{)", "`$1`n  const pathname = usePathname();`n  const activePath = currentPath ?? pathname;"

# 4. Variablen-Nutzung anpassen (currentPath -> activePath, aber nicht die Prop-Deklaration)
$text = $text -replace "\bcurrentPath\b(?![:?\s])", "activePath"

# Datei sicher speichern
[System.IO.File]::WriteAllText((Resolve-Path $file).Path, $text, (New-Object System.Text.UTF8Encoding $false))
Write-Host "✅ Header.tsx erfolgreich repariert!" -ForegroundColor Green

git add .
git commit -m "fix: make Header currentPath optional and self-aware via usePathname"
git push origin main
Write-Host "🚀 Erfolgreich gepusht!" -ForegroundColor Green
