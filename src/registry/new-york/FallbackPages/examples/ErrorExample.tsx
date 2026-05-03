"use client";

import { FallbackPage } from "../FallbackPages";

export default function ErrorExample() {
  const exampleError = Error(
    "An unexpected error occurred while processing your request. Please try again or contact support if the problem persists.",
  ) as Error & { digest?: string };
  exampleError.digest = "1234567890";

  return (
    <FallbackPage
      error={exampleError}
      variant="error"
      reset={() => {}}
      className="min-h-auto"
    />
  );
}
