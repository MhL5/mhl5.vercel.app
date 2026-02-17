"use client";

import { FallbackPage } from "../FallbackPages";

export default function ErrorExample() {
  const exampleError = Error("Test error") as Error & { digest?: string };
  exampleError.digest = "1234567890";

  return (
    <FallbackPage variant="error" reset={() => {}} className="min-h-auto" />
  );
}
