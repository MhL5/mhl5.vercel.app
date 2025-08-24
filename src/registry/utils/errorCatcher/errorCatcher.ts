// import { HTTPError } from "ky";

type Result<T, E> = [undefined, T] | [E, undefined];

export async function errorCatcher<T, E = Error>(
  promise: Promise<T>,
  options: {
    mutateData?: (data: T) => T;
    mutateError?: (error: E) => E;
  } = {},
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    const mutatedData = options?.mutateData ? options.mutateData(data) : data;

    return [undefined, mutatedData];
  } catch (error) {
    const err = error as E;

    // Optional: for parsing ky library http errors
    // const isHTTPError = (error: unknown): error is HTTPError =>
    //   (error as { name: string })?.name === "HTTPError";
    // if (isHTTPError(error)) {
    //   try {
    //     err = await error?.response?.json();
    //   } catch {
    //     // error.response can be an invalid JSON and we end up in this catch
    //     err = error as E;
    //   }
    // }

    const mutatedError = options?.mutateError ? options.mutateError(err) : err;

    return [mutatedError, undefined];
  }
}

export function errorCatcherSync<T, E = Error>(data: T): Result<T, E> {
  try {
    return [undefined, data];
  } catch (error) {
    return [error as E, undefined];
  }
}
