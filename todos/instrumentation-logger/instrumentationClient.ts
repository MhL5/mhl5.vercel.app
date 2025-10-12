import { logger } from "./services/logger";
import { serializeError } from "./utils/errorSerializer";
import { isKyHTTPError, parseKyHTTPError } from "./utils/kyUtils";

// Lightweight client-side error logging that runs before hydration
// Execution timing: after document load, before React hydration

export async function instrumentationClientInit() {
  try {
    // Global error handler
    window.addEventListener("error", async (event) => {
      const err =
        event.error ?? new Error(String(event.message || "Unknown error"));

      const serialized = isKyHTTPError(err)
        ? await parseKyHTTPError(err)
        : serializeError(err);

      void logger({
        source: "client",
        level: "error",
        event: "window.error",
        error: serialized,
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        time: new Date().toISOString(),
        url: location.href,
        path: location.pathname,
      });
    });

    // Unhandled promise rejections
    window.addEventListener("unhandledrejection", async (event) => {
      const reason =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));

      const serialized = isKyHTTPError(reason)
        ? await parseKyHTTPError(reason)
        : serializeError(reason);

      void logger({
        source: "client",
        level: "error",
        event: "unhandledrejection",
        error: serialized,
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        time: new Date().toISOString(),
        url: location.href,
        path: location.pathname,
      });
    });
  } catch (err) {
    const serialized = isKyHTTPError(err)
      ? await parseKyHTTPError(err)
      : serializeError(err);

    const error =
      typeof serialized === "object" && serialized !== null
        ? {
            note: "⚠️⚠️ Something went wrong inside instrumentationClientInit ⚠️⚠️",
            ...serialized,
          }
        : {
            note: "⚠️⚠️ Something went wrong inside instrumentationClientInit ⚠️⚠️",
            error: serialized,
          };

    void logger({
      source: "client",
      level: "error",
      event: "unhandledrejection",
      error,
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      time: new Date().toISOString(),
      url: location.href,
      path: location.pathname,
    });
  }
}
