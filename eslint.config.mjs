// eslint.config.mjs
// ✅ ZERO-DEFECT: ESLint 9 Flat Config fuer Next.js 15
// TypeScript ist die Quelle der Wahrheit fuer Typ-Fehler (tsc --noEmit im CI).
// ESLint fokussiert auf React-Hooks, A11y und Core Web Vitals.
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
        // ✅ WHITE-LABEL: <img> erlaubt für externe Logo-URLs aus Tenant-Config
        '@next/next/no-img-element': 'off',
      // TypeScript erkennt ungenutzte Variablen bereits (CI: tsc --noEmit).
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // no-undef wird vollstaendig von TypeScript abgedeckt (TS2304).
      'no-undef': 'off',
      // Leere catch-Bloecke fuer nicht-kritische Telemetrie erlaubt.
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'backups/**', 'coverage/**', '**/*.backup_*'],
  },
];

export default eslintConfig;