import { useState } from "react";

/**
 * Simple wrapper around useState<boolean> for simplicity and removing boilerplate
 *
 * @example
 * const { state, setState, toggle, setTrue, setFalse } = useBooleanState(false);
 */
export function useBooleanState(initialState: (() => boolean) | boolean) {
  const [state, setState] = useState<boolean>(
    initialState instanceof Function ? initialState() : initialState,
  );

  const setTrue = () => setState(true);
  const setFalse = () => setState(false);
  const toggle = () => setState((s) => !s);

  return { state, setState, toggle, setTrue, setFalse } as const;
}
