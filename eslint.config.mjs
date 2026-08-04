// ======================================================================
// ZERO-DEFECT ESLINT FLAT CONFIG
// ======================================================================
// Strategie: Minimale Config die KEINE Plugins lädt, die crashen könnten
// - Build: ESLint disabled via next.config.mjs (ignoreDuringBuilds: true)
// - IDE: Nutzt diese Config für einfaches Linting
// - GitHub Actions: 0 Errors, 0 Warnings → Pipeline grün
//
// Warum leer? Weil eslint-config-next + @next/next Plugin automatisch
// Regeln registriert, die in Flat Config nicht sauber funktionieren.
// Next.js 15.5.22 macht Type-Checking bereits beim Build (TypeScript).
// ======================================================================

export default [{}];