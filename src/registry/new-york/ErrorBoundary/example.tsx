"use client";

import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/registry/new-york/ErrorBoundary/ErrorBoundary";
import { useState } from "react";

export default function Example() {
  return (
    <div>
      <ul className="space-y-5">
        <li className="flex items-start justify-center gap-2 rounded-md border border-dashed bg-card p-2 text-card-foreground">
          <ErrorBoundary>
            <h2 className="capitalize">default fallback</h2>
            <Component />
          </ErrorBoundary>
        </li>

        <li className="flex items-start justify-center gap-2 rounded-md border border-dashed bg-card p-2 text-card-foreground">
          <ErrorBoundary
            defaultFallbackProps={{
              variant: "minimal",
            }}
          >
            <h2 className="capitalize">default fallback minimal</h2>
            <Component />
          </ErrorBoundary>
        </li>

        <li className="flex items-start justify-center gap-2 rounded-md border border-dashed bg-card p-2 text-card-foreground">
          <ErrorBoundary
            defaultFallbackProps={{
              variant: "inline",
            }}
          >
            <h2 className="capitalize">inline fallback minimal</h2>
            <Component />
          </ErrorBoundary>
        </li>

        <li className="flex items-start justify-center gap-2 rounded-md border border-dashed bg-card p-2 text-card-foreground">
          <ErrorBoundary
            fallback={({ error, onRetry }) => (
              <div className="flex flex-wrap items-center gap-2 rounded-md bg-error px-2 py-1 text-sm text-error-foreground">
                {error.message}
                <Button onClick={onRetry} type="button" variant="link">
                  try again
                </Button>
              </div>
            )}
          >
            <h2 className="capitalize">Custom fallback</h2>
            <Component />
          </ErrorBoundary>
        </li>
      </ul>
    </div>
  );
}

function Component() {
  const [showError, setShowError] = useState(false);

  function handleTriggerError() {
    setShowError(true);
  }

  if (showError) {
    const error = new Error(
      "SimulatedError triggered by button click, for demo purposes",
    );
    error.name = "SimulatedError";
    throw error;
  }

  return (
    <Button size="xs" onClick={handleTriggerError}>
      Trigger Error
    </Button>
  );
}
