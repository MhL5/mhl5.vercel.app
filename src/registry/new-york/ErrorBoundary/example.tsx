"use client";

import { useTimeout } from "@/registry/hooks/useTimeout/useTimeout";
import { ErrorBoundary } from "@/registry/new-york/ErrorBoundary/ErrorBoundary";
import { useState } from "react";

export default function Example() {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
}

function Component() {
  const [error, setError] = useState(false);
  useTimeout(() => {
    setError(true);
  }, 3_000);

  if (error) {
    const error = new Error(
      "Something unexpected happened in the Component after 1 seconds.",
    );
    error.name = "SimulatedError";
    throw error;
  }

  return (
    <div className="text-center">
      I will throw an error in{" "}
      <strong className="font-bold text-info-foreground underline underline-offset-6">
        3 seconds
      </strong>
      , the error will be caught by the ErrorBoundary
    </div>
  );
}
