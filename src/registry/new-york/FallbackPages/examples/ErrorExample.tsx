"use client";

import { FallbackPageError } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function ErrorExample() {
  const exampleError = Error(
    "An unexpected error occurred while processing your request. Please try again or contact support if the problem persists.",
  ) as Error & { digest?: string };
  exampleError.digest = "1234567890";

  return (
    <FallbackPageError
      error={exampleError}
      reset={() => {}}
      className="min-h-auto"
    />
  );
}
