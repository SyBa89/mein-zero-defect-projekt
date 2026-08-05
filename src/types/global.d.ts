// Global type declarations for browser APIs
// This file provides type information for browser globals that
// are available at runtime but not in the Node.js type context.

// ═══════════════════════════════════════════════════════════
// Browser Window APIs
// ═══════════════════════════════════════════════════════════

/**
 * Displays a modal dialog with an optional message and an OK button.
 */
declare function alert(message?: any): void;

/**
 * Displays a modal dialog with an optional message and OK/Cancel buttons.
 */
declare function confirm(message?: string): boolean;

/**
 * Displays a modal dialog with an optional message requesting input.
 */
declare function prompt(message?: string, defaultValue?: string): string | null;

// ═══════════════════════════════════════════════════════════
// Event System
// ═══════════════════════════════════════════════════════════

/**
 * The Event interface represents an event which takes place in the DOM.
 */
interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

declare class Event {
  constructor(type: string, eventInitDict?: EventInit);
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  readonly composed: boolean;
  readonly currentTarget: EventTarget | null;
  readonly defaultPrevented: boolean;
  readonly eventPhase: number;
  readonly isTrusted: boolean;
  readonly target: EventTarget | null;
  readonly timeStamp: number;
  readonly type: string;
  
  cancelBubble: boolean;
  returnValue: boolean;
  srcElement: EventTarget | null;
  
  preventDefault(): void;
  stopImmediatePropagation(): void;
  stopPropagation(): void;
  
  static readonly NONE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
}

interface CustomEventInit<T = any> extends EventInit {
  detail?: T;
}

/**
 * CustomEvent interface for application-specific events.
 */
declare class CustomEvent<T = any> extends Event {
  constructor(type: string, eventInitDict?: CustomEventInit<T>);
  readonly detail: T;
  
  initCustomEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    detail?: T
  ): void;
}

// ═══════════════════════════════════════════════════════════
// React Compatibility (for components without explicit import)
// ═══════════════════════════════════════════════════════════

/**
 * Minimal React type declaration for components that use JSX
 * without explicit React import (React 17+ JSX transform).
 */
declare namespace React {
  type ElementType = string | ComponentType<any>;
  type ComponentType<P = {}> = (props: P) => JSX.Element | null;
  type ReactNode = string | number | boolean | null | undefined | JSX.Element | ReactNode[];
  type ReactElement = JSX.Element;
}

// ═══════════════════════════════════════════════════════════
// Performance API (extended from Phase 2)
// ═══════════════════════════════════════════════════════════

interface PerformanceMark extends PerformanceEntry {
  readonly detail: any;
}

interface PerformanceMeasure extends PerformanceEntry {
  readonly detail: any;
}

// ═══════════════════════════════════════════════════════════
// EventTarget (for addEventListener)
// ═══════════════════════════════════════════════════════════

interface EventTarget {
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions
  ): void;
  dispatchEvent(event: Event): boolean;
}

interface EventListener {
  (evt: Event): void;
}

interface EventListenerObject {
  handleEvent(object: Event): void;
}

type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
}

interface EventListenerOptions {
  capture?: boolean;
}

// Ensure this file is treated as a module
export {};