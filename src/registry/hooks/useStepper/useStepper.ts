"use client";

import type { NumberRange } from "@/types/NumberRange";
import { useState } from "react";

type Range<Steps extends number> = NumberRange<1, Steps> | 1;

type UseStepperOptions<Range extends number> = {
  initialStep?: Range;
  loop?: boolean;
};

/**
 * Type safe reusable hook for managing steps,
 * steps start from 1
 *
 * @example
 * const stepper = useStepper(3);
 * const stepper = useStepper(3, {initialStep:2});
 * const stepper = useStepper(3, {initialStep:2,loop:true});
 */
export function useStepper<const Steps extends number>(
  steps: Range<Steps>,
  {
    initialStep = 1,
    loop = false,
  }: UseStepperOptions<NoInfer<Range<Steps>>> = {},
) {
  const [currentStep, setCurrentStep] = useState<Range<Steps>>(initialStep);

  const firstStep = 1;
  const lastStep = steps;

  function isFirstStep(step: Range<Steps>) {
    return step === firstStep;
  }

  function isLastStep(step: Range<Steps>) {
    return step === lastStep;
  }

  function isValidStep(step: number): step is Range<Steps> {
    return Number.isInteger(step) && step >= firstStep && step <= lastStep;
  }

  function next() {
    setCurrentStep((step) => {
      if (isLastStep(step) && loop) return firstStep;

      const newStep = step + 1;
      return isValidStep(newStep) ? newStep : step;
    });
  }

  function back() {
    setCurrentStep((step) => {
      if (isFirstStep(step) && loop) return lastStep;

      const newStep = step - 1;
      return isValidStep(newStep) ? newStep : step;
    });
  }

  function canGoTo(step: Range<Steps>) {
    return isValidStep(step);
  }

  function goTo(index: Range<Steps>) {
    if (!canGoTo(index))
      throw new Error(
        `Invalid step index: ${index}. Must be an integer between ${firstStep} and ${lastStep}.`,
      );
    setCurrentStep(index);
  }

  const canGoNext = loop || !isLastStep(currentStep);
  const canGoBack = loop || !isFirstStep(currentStep);

  return {
    currentStep,
    goTo,
    next,
    back,
    canGoNext,
    canGoBack,
    canGoTo,
  } as const;
}
