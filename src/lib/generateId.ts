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
