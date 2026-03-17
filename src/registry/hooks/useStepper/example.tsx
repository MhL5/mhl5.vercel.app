"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStepper } from "@/registry/hooks/useStepper/useStepper";
import { useState } from "react";

export default function Example() {
  const steps = 3;
  const [loop, setLoop] = useState(false);
  const { back, currentStep, goTo, next, canGoBack, canGoNext, canGoTo } =
    useStepper(steps, { loop, initialStep: 2 });
  const goToStep = 2;

  const infos = [
    {
      key: "current-step",
      variant: "info",
      value: (
        <>
          Current Step: <span className="font-mono">{currentStep}</span>
        </>
      ),
    },
    {
      key: "loop",
      variant: "info",
      value: (
        <>
          Loop: <span className="font-mono">{`${loop}`}</span>
        </>
      ),
    },
  ] as const;

  return (
    <div>
      <header>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {infos.map(({ key, value, variant }) => (
            <Badge key={key} variant={variant} className="text-sm">
              {value}
            </Badge>
          ))}
        </div>

        <div className="flex items-end gap-2 not-sm:flex-wrap data-[invalid=true]:items-center">
          <Button
            onClick={() => goTo(goToStep)}
            variant="outline"
            disabled={!canGoTo(goToStep)}
          >
            go to {goToStep}
          </Button>

          <Button variant="outline" disabled={!canGoBack} onClick={back}>
            Back
          </Button>
          <Button variant="outline" disabled={!canGoNext} onClick={next}>
            Next
          </Button>
          <Button variant="outline" onClick={() => setLoop((l) => !l)}>
            toggle Loop
          </Button>
        </div>
      </header>

      <div className="mt-5 text-center text-xl">
        {currentStep === 1 && (
          <div className="rounded-sm bg-rose-600 p-2">
            Im step {currentStep}
          </div>
        )}
        {currentStep === 2 && (
          <div className="rounded-sm bg-emerald-600 p-2">
            Im step {currentStep}
          </div>
        )}
        {currentStep === 3 && (
          <div className="rounded-sm bg-orange-600 p-2">
            Im step {currentStep}
          </div>
        )}
      </div>
    </div>
  );
}
