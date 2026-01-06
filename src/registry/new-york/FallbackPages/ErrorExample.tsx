"use client";

import { ErrorPage } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function ErrorExample() {
  const exampleError = Error("Test error") as Error & { digest?: string };
  exampleError.digest = "1234567890";

  return (
    <ErrorPage error={exampleError} reset={() => {}} className="min-h-auto" />
  );
}
