type Result<T, E> = [undefined, T] | [E, undefined];

type Options<T, E> = {
  onSuccess?: (res: T) => void;
  onError?: (error: E) => void;
};

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
  { onError, onSuccess }: Options<T, E> = {},
): Promise<Result<T, E>> {
  try {
    const res = await promise;
    onSuccess?.(res);
    return [undefined, res];
  } catch (error) {
    onError?.(error as E);
    return [error as E, undefined];
  }
}
