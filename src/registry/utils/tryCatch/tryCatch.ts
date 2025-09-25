type Result<T, E> = [undefined, T] | [E, undefined];

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    return [undefined, await promise];
  } catch (error) {
    return [error as E, undefined];
  }
}
