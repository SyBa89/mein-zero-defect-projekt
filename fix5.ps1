# ═══════════════════════════════════════════════════════════════
# SURGICAL FIX 5 — DynamicSections Optimization
# ═══════════════════════════════════════════════════════════════

$ErrorActionPreference = 'Continue'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

function Write-Safe {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

try {
    $timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
    $filePath = "src\components\DynamicSections.tsx"
    $backupPath = "$filePath.backup_fix5_$timestamp"
    
    Write-Safe "Backup erstellen..." "Cyan"
    Copy-Item $filePath $backupPath -Force
    
    Write-Safe "Datei lesen..." "Cyan"
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    
    Write-Safe "Encoding reparieren..." "Cyan"
    $content = $content -replace 'âœ€', '✅'
    $content = $content -replace 'fÃ¼r', 'für'
    $content = $content -replace 'â€"', '–'
    
    Write-Safe "Statische Imports erstellen..." "Cyan"
    $newContent = @'
'use client';

import FAQ from '@/components/FAQ';
import DailyHighlightsSection from '@/components/DailyHighlightsSection';
import BrandsSection from '@/components/BrandsSection';

interface DynamicSectionsProps {
  children?: React.ReactNode;
}

export default function DynamicSections({ children }: DynamicSectionsProps) {
  return (
    <>
      <FAQ />
      <DailyHighlightsSection />
      <BrandsSection />
      {children}
    </>
  );
}
'@
    
    $content = $newContent
    
    Write-Safe "Datei schreiben..." "Cyan"
    [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
    
    Write-Safe "TypeScript Check..." "Cyan"
    $tscOutput = npx tsc --noEmit 2>&1
    $tscCode = $LASTEXITCODE
    
    if ($tscCode -eq 0) {
        Write-Safe "TypeScript: GRÜN" "Green"
    } else {
        Write-Safe "TypeScript: FEHLER" "Red"
        throw "TypeScript validation failed"
    }
    
    Write-Safe "Build Check..." "Cyan"
    $buildOutput = npm run build 2>&1
    $buildCode = $LASTEXITCODE
    
    if ($buildCode -eq 0) {
        Write-Safe "Build: GRÜN" "Green"
    } else {
        Write-Safe "Build: FEHLER" "Red"
        throw "Build validation failed"
    }
    
    Write-Safe "Commit..." "Cyan"
    git add . 2>&1 | Out-Null
    git commit -m "perf: DynamicSections encoding fix + static imports" 2>&1 | Out-Null
    git push origin main 2>&1 | Out-Null
    
    Remove-Item $backupPath -Force
    Write-Safe "ERFOLG: DynamicSections optimiert" "Green"
    
} catch {
    Write-Safe "FEHLER: $($_.Exception.Message)" "Red"
    if (Test-Path $backupPath) {
        Write-Safe "Rollback: $backupPath → $filePath" "Yellow"
        Copy-Item $backupPath $filePath -Force
    }
}
