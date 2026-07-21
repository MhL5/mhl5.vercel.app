import type { ReactNode } from "react";

type AwaitProps<T> = {
  promise: Promise<T>;
  children: (result: T) => ReactNode;
};

async function Await<T>({ promise, children }: AwaitProps<T>) {
  const result = await promise;
  return children(result);
}

export { Await };
