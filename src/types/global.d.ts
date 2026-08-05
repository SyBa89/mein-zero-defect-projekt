/**
 * Minimal global type declarations for browser APIs.
 * 
 * IMPORTANT: This file ONLY declares APIs that are NOT already
 * in TypeScript's lib.dom.d.ts. We NEVER re-declare DOM types
 * like Event, CustomEvent, EventTarget as this causes Hydration errors.
 */

// ═══════════════════════════════════════════════════════════
// Browser Dialog APIs (not always in strict mode lib)
// ═══════════════════════════════════════════════════════════

declare function alert(message?: any): void;
declare function confirm(message?: string): boolean;
declare function prompt(message?: string, defaultValue?: string): string | null;

// ═══════════════════════════════════════════════════════════
// React 17+ JSX Transform (no explicit import needed)
// ═══════════════════════════════════════════════════════════

import React from 'react';

declare global {
  namespace JSX {
    type Element = React.ReactElement;
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

// ═══════════════════════════════════════════════════════════
// Module marker
// ═══════════════════════════════════════════════════════════

export {};