import { type Instrumentation } from "next";

import { logger } from "./services/logger";
import { serializeError } from "./utils/errorSerializer";
import { isKyHTTPError, parseKyHTTPError } from "./utils/kyUtils";
import { removeSensitiveHeaders } from "./utils/removeSensitiveHeaders";

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  try {
    const serializedError = isKyHTTPError(err)
      ? await parseKyHTTPError(err)
      : serializeError(err);

    // Avoid passing non-serializable request directly; extract safe fields
    const reqInfo = {
      method: request.method,
      path: (request as { path?: string }).path,
      headers: removeSensitiveHeaders(request.headers),
    };

    await logger({
      source: "server",
      level: "error",
      event: "onRequestError",
      error: serializedError,
      request: reqInfo,
      context,
      time: new Date().toISOString(),
    });
  } catch (error) {
    const serialized = isKyHTTPError(error)
      ? await parseKyHTTPError(error)
      : serializeError(error);

    const errorWithNote =
      typeof serialized === "object" && serialized !== null
        ? {
            note: "Something went wrong inside onRequestError",
            ...serialized,
          }
        : serialized;

    await logger({
      source: "server",
      level: "error",
      event: "onRequestError",
      error: errorWithNote,
      request: {
        method: request.method,
        path: (request as { path?: string }).path,
        headers: removeSensitiveHeaders(request.headers),
      },
      context,
      time: new Date().toISOString(),
    });
  }
};
