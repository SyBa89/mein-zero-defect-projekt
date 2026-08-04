import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // ✅ Relaxed rules für Production-Stabilität
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'warn',
    },
  },
];