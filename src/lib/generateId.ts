// Global crypto API type declaration for browser environment
declare const crypto: {
  getRandomValues: <T extends ArrayBufferView | null>(array: T) => T;
  randomUUID: () => string;
};
export function generateId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as any).randomUUID();
    }
  } catch (_e) {
    // ignore
  }
  return Date.now().toString();
}
