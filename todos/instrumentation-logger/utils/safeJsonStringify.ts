/**
 * Safely serialize any value to JSON string, handling circular references
 */
export function safeJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(value, getCircularReplacer(), 2);
  } catch {
    return String(value);
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return function (_key: string, value: unknown) {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  };
}
