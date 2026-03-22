export function jsonParseWithFallback({
  fallback,
  json,
}: {
  json: string;
  fallback: unknown;
}) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}
