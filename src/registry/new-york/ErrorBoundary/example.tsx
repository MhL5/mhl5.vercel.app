"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ErrorBoundary,
  type ErrorBoundaryFallbackProps,
  useErrorBoundary,
} from "@/registry/new-york/ErrorBoundary/ErrorBoundary";
import { useState } from "react";
import { toast } from "sonner";

const simulatedError = new Error(
  "SimulatedError triggered by button click, for demo purposes",
);
simulatedError.name = "SimulatedError";

const errorBoundaryItems = [
  {
    id: "default-fallback",
    heading: "default fallback",
    ErrorComponent: DuringRenderErrorComponent,
    errorBoundaryProps: {
      defaultFallbackProps: { variant: "default" } as const,
    },
  },
  {
    id: "default-fallback-minimal",
    heading: "default fallback minimal",
    ErrorComponent: WithUseErrorBoundaryComponent,
    errorBoundaryProps: {
      defaultFallbackProps: { variant: "minimal" } as const,
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
  const [size, setSize] =
    useState<ErrorBoundaryFallbackProps["size"]>("default");
  return (
    <div className="px-5">
      <div className="absolute inset-s-4 top-4 flex items-center gap-2">
        <Select
          onValueChange={(v) =>
            setSize(v as ErrorBoundaryFallbackProps["size"])
          }
          value={size}
        >
          <SelectTrigger>
            Size: <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["default", "lg", "xl"].map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ul className="space-y-5 overflow-hidden">
        {errorBoundaryItems.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-5 rounded-md border border-dashed bg-card p-2 text-card-foreground"
          >
            <ErrorBoundary
              {...item.errorBoundaryProps}
              defaultFallbackProps={
                item?.errorBoundaryProps?.defaultFallbackProps
                  ? { ...item?.errorBoundaryProps?.defaultFallbackProps, size }
                  : undefined
              }
              onComponentDidCatch={(err) =>
                toast.error(
                  <pre dir="auto" className="text-xs text-wrap">
                    {JSON.stringify(
                      { name: err.name, message: err.message },
                      null,
                      2,
                    )}
                  </pre>,
                )
              }
            >
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
      Throw error during render
    </Button>
  );
}

function WithUseErrorBoundaryComponent() {
  const { setError } = useErrorBoundary();

  return (
    <Button size="xs" type="button" onClick={() => setError(simulatedError)}>
      Throw error with useErrorBoundary
    </Button>
  );
}
