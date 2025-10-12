import { isProd } from "@/utils/utils";
import { type RequestErrorContext } from "next/dist/server/instrumentation/types";

import { type SerializedError } from "../utils/errorSerializer";

type LoggerPayload = (
  | {
      source: "client";
      event: "window.error" | "unhandledrejection";
      userAgent: string | undefined;
      url: string;
      path: string;
    }
  | {
      source: "server";
      event: "onRequestError";
      context: Readonly<RequestErrorContext>;
      request: {
        method: string;
        path: string | undefined;
        headers: Record<string, string> | undefined;
      };
    }
) & {
  level: "error";
  error: SerializedError | Record<string, unknown> | unknown;
  time: string;
};

export async function logger(payload: LoggerPayload) {
  try {
    if (!isProd()) return;
    await fetch(
      `https://discord-bot-logger.vercel.app/api/instrumentation-logs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Error: ${
            typeof payload.error === "object" &&
            payload.error !== null &&
            "message" in payload.error
              ? payload.error.message
              : "Unknown error"
          }`,
          error: JSON.stringify(payload, null, 2),
          projectName: "vsim",
        }),
      },
    );
  } catch {}
}
