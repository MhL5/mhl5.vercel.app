"use client";

import { Button } from "@/components/ui/button";
import {
  ErrorBoundary,
  useErrorBoundary,
} from "@/registry/new-york/ErrorBoundary/ErrorBoundary";
import { useState } from "react";

const simulatedError = new Error(
  "SimulatedError triggered by button click, for demo purposes",
);
simulatedError.name = "SimulatedError";

const errorBoundaryItems = [
  {
    id: "default-fallback",
    heading: "default fallback",
    ErrorComponent: DuringRenderErrorComponent,
    errorBoundaryProps: {},
  },
  {
    id: "default-fallback-minimal",
    heading: "default fallback minimal",
    ErrorComponent: WithUseErrorBoundaryComponent,
    errorBoundaryProps: {
      defaultFallbackProps: { variant: "minimal" },
    },
  },
  {
    id: "inline-fallback-minimal",
    heading: "inline fallback minimal",
    ErrorComponent: DuringRenderErrorComponent,
    errorBoundaryProps: {
      defaultFallbackProps: { variant: "inline" },
    },
  },
  {
    id: "custom-fallback",
    heading: "Custom fallback",
    ErrorComponent: WithUseErrorBoundaryComponent,
    errorBoundaryProps: {
      fallback: ({ error, onRetry }: { error: Error; onRetry: () => void }) => (
        <div className="mx-auto flex flex-wrap items-center gap-x-2 rounded-md bg-error px-2 py-1 text-center text-sm text-error-foreground">
          {error.message}
          <Button
            onClick={onRetry}
            type="button"
            className="mx-auto"
            variant="link"
          >
            try again
          </Button>
        </div>
      ),
    },
  },
];

export default function Example() {
  return (
    <div className="px-5">
      <ul className="space-y-5 overflow-hidden">
        {errorBoundaryItems.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-5 rounded-md border border-dashed bg-card p-2 text-card-foreground"
          >
            <ErrorBoundary {...item.errorBoundaryProps}>
              <h2 className="capitalize">{item.heading}</h2>
              <item.ErrorComponent />
            </ErrorBoundary>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DuringRenderErrorComponent() {
  const [showError, setShowError] = useState(false);

  if (showError) throw simulatedError;
  return (
    <Button size="xs" type="button" onClick={() => setShowError(true)}>
      Trigger Error
    </Button>
  );
}

function WithUseErrorBoundaryComponent() {
  const { setError } = useErrorBoundary();

  return (
    <Button size="xs" type="button" onClick={() => setError(simulatedError)}>
      Trigger Error
    </Button>
  );
}
