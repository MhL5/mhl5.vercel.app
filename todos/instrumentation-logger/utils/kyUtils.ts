import { type HTTPError } from "ky";

export const isKyHTTPError = (error: unknown): error is HTTPError =>
  (error as { name: string })?.name === "HTTPError";

export async function parseKyHTTPError(error: unknown) {
  try {
    if (!isKyHTTPError(error)) return error;
    return await error?.response?.json();
  } catch (err) {
    return err;
  }
}
