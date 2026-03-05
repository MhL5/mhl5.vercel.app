export function isAbortedError(error: Error) {
  return (
    error?.name === "AbortError" ||
    (error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ERR_CANCELED")
  );
}
