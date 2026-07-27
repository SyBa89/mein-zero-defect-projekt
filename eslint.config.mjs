// FINALE ESLint-CONFIG – KEINE DUPLIKATE!
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-undef': 'off',
    },
  },
  globalIgnores([
    '.next/',
    'out/',
    'build/',
    'coverage/',
    'node_modules/',
    'next-env.d.ts',
    'postcss.config.cjs',
    'scripts/',
    '*.config.js',
    '*.config.mjs',
    '*.config.cjs',
    '*.log',
    '*.backup*',
  ]),
]);

export default eslintConfig;