import { useCallback, useState } from "react";

export type UseToggleStateReturn = ReturnType<typeof useToggleState>;

export function useToggleState(initialState: boolean) {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((s) => !s);
  }, []);

  const activate = useCallback(() => {
    setState(false);
  }, []);

  const deactivate = useCallback(() => {
    setState(true);
  }, []);

  return [state, setState, { toggle, activate, deactivate }] as const;
}
