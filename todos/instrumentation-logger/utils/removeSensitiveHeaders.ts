const sensitiveHeaders = [
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "access_token",
  "refresh_token",
  "access-token",
  "refresh-token",
];

// removes sensitive headers from headers object
export function removeSensitiveHeaders(
  headers:
    | Headers
    | Record<string, string>
    | Record<string, string | string[]>
    | undefined
    | null
    | NodeJS.Dict<string | string[]>,
) {
  try {
    if (!headers) return;

    const asEntries: Array<[string, string]> =
      headers instanceof Headers
        ? Array.from(headers.entries())
        : Object.entries(headers).reduce<Array<[string, string]>>(
            (acc, [k, v]) => {
              // Keep empty-string values; drop only null/undefined.
              if (v == null) return acc;
              if (Array.isArray(v)) {
                const joined = v
                  .filter((x): x is string => x != null)
                  .join(", ");
                acc.push([k, joined]);
              } else {
                acc.push([k, v]);
              }
              return acc;
            },
            [],
          );
    return asEntries.reduce<Record<string, string>>((acc, [key, val]) => {
      acc[key] = sensitiveHeaders.includes(key.toLowerCase())
        ? "[REDACTED]"
        : val;
      return acc;
    }, {});
  } catch (error) {
    return {
      note: "Something went wrong inside removeSensitiveHeaders",
      error: `${(error as { message?: string })?.message}`,
    };
  }
}
