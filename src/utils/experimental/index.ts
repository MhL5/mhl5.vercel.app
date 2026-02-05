type Result<S, E extends { reason: string }> = [E, null] | [null, S];

export function ok<S>(data: S): Result<S, never> {
  return [null, data];
}

export function err<const R extends string, E extends { reason: R }>(
  error: E,
): Result<never, E> {
  return [error, null];
}
