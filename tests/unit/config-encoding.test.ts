// tests/unit/config-encoding.test.ts
// ✅ ZERO-DEFECT GUARD: verhindert UTF-8-Mojibake in White-Label-Configs
// (Hintergrund: PS 5.1 Get-Content liest UTF-8 ohne BOM als ANSI -> Double-Encoding)
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('config encoding integrity (White-Label-Daten)', () => {
  const json = fs.readFileSync(path.join(process.cwd(), 'configs/kiosk.json'), 'utf-8');

  it('kiosk.json ist valides UTF-8 (kein Mojibake)', () => {
    expect(json).toContain('Bürgerplatz');
    expect(json).toContain('🍭');
    expect(json).not.toContain('Ã¼');
  });

  it('phoneDisplay ist gesetzt (Tenant-kontrolliert)', () => {
    expect(json).toContain('"phoneDisplay": "02235 9291160"');
  });
});