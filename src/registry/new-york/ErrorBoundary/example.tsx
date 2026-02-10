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
  }, 1000);

  if (error) {
    const error = new Error(
      "Something unexpected happened in the Component after 1 seconds.",
    );
    error.name = "SimulatedError";
    throw error;
  }

  return (
    <div className="text-center">
      I will throw an error in 1 seconds,the error will be caught by the
      ErrorBoundary
    </div>
  );
}
