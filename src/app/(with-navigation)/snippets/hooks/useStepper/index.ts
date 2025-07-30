"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";

type useStepperOptions = {
  initialStep?: number;
  loop?: boolean;
};

type BaseReturnType = {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
};

export function useStepper(
  steps: number,
  options?: useStepperOptions,
): BaseReturnType;

export function useStepper(
  steps: ReactNode[],
  options?: useStepperOptions,
): BaseReturnType & { step: ReactNode };

/**
 * a reusable hook for managing steps
 *
 * 0 based index
 * @example
 * const stepper = useStepper(3); // you get step 0 1 2
 */
export function useStepper(
  steps: ReactNode[] | number,
  { initialStep = 0, loop = false }: useStepperOptions = {},
) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const lastStep = useMemo(() => {
    if (Array.isArray(steps)) return steps.length - 1;
    return steps;
  }, [steps]);
  const isFirstStep = useMemo(() => currentStep === 0, [currentStep]);
  const isLastStep = useMemo(
    () => currentStep === lastStep,
    [currentStep, lastStep],
  );

  const next = useCallback(() => {
    if (isLastStep) {
      if (loop) setCurrentStep(0);
      return;
    }
    setCurrentStep((step) => step + 1);
  }, [isLastStep, loop]);

  const back = useCallback(() => {
    if (isFirstStep) {
      if (loop) setCurrentStep(lastStep);
      return;
    }
    setCurrentStep((step) => step - 1);
  }, [isFirstStep, loop, lastStep]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index > lastStep) {
        throw new Error(
          `Invalid step index: ${index}. Must be between 0 and ${lastStep}`,
        );
      }
      setCurrentStep(index);
    },
    [lastStep],
  );

  const output = useMemo(
    () => ({
      currentStep,
      isFirstStep,
      isLastStep,
      goTo,
      next,
      back,
    }),
    [back, currentStep, goTo, next, isFirstStep, isLastStep],
  );

  if (Array.isArray(steps)) return { ...output, step: steps[currentStep] };
  return output;
}
