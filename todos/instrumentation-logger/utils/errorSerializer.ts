/*
  Simplified utilities to safely serialize Error objects and unknown values
  for logging without circular reference issues.
*/
import { safeJsonStringify } from "./safeJsonStringify";

export type SerializedError = {
  type: "Error";
  name: string;
  message: string;
  stack?: string;
  cause?: unknown;
  [key: string]: unknown;
};

const resultDefaultKeys = ["name", "message", "stack", "cause"];

/**
 * Main error serializer - converts errors to plain objects
 */
export function serializeError(
  error: unknown,
): SerializedError | Record<string, unknown> {
  try {
    // Handle Error instances
    if (error instanceof Error) {
      const result: SerializedError = {
        type: "Error",
        name: error.name || "Error",
        message: error.message || "Unknown error",
        stack: error.stack,
      };

      // Handle cause (for newer Error objects)
      if (error?.cause) result.cause = serializeError(error.cause);

      // Add any additional properties
      return Object.getOwnPropertyNames(error).reduce<SerializedError>(
        (acc, key) => {
          if (resultDefaultKeys.includes(key)) return acc;

          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[key] = (error as any)[key];
          } catch {
            acc[key] = "[Unserializable]";
          }

          return acc;
        },
        result,
      );
    }

    // Handle primitives
    if (error === null || typeof error !== "object") {
      return {
        type: typeof error,
        value:
          typeof error === "bigint" ||
          typeof error === "symbol" ||
          typeof error === "function"
            ? String(error)
            : error,
      };
    }

    // Handle objects and arrays
    return JSON.parse(safeJsonStringify(error));
  } catch {
    return {
      type: typeof error,
      value: String(error),
    };
  }
}
