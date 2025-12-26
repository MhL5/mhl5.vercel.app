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
  }, 2000);

  if (error) throw Error("Error thrown");
  return (
    <div className="text-center">
      I will throw an error in 2 seconds,the error will be caught by the
      ErrorBoundary
    </div>
  );
}
