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
      'next-env.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Image: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        FormData: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        
        // Node.js globals
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'readonly',
        global: 'readonly',
        exports: 'readonly',
        
        // TypeScript globals (werden von ESLint nicht erkannt, aber TS prüft sie)
        number: 'readonly',
        string: 'readonly',
        boolean: 'readonly',
        any: 'readonly',
        unknown: 'readonly',
        never: 'readonly',
        void: 'readonly',
        object: 'readonly',
        symbol: 'readonly',
        bigint: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // ✅ Warnungen statt Errors für bessere Developer Experience
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'warn',
      
      // ✅ Next.js-spezifische Regeln deaktivieren (Plugin nicht installiert)
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-page-custom-font': 'off',
      
      // ✅ TypeScript-Typen nicht als undefiniert markieren
      'no-undef': 'off',
    },
  },
];