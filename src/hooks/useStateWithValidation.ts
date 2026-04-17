import { type SetStateAction, useCallback, useState } from "react";

function useStateWithValidation<T>(
  initialValue: T,
  validationFunc: (value: T) => boolean,
) {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(() => validationFunc(state));

  const setStateWithValidation = useCallback(
    (nextState: SetStateAction<T>) => {
      const value =
        nextState instanceof Function ? nextState(state) : nextState;

      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc, state],
  );

  return [state, setStateWithValidation, isValid] as const;
}

export { useStateWithValidation };
