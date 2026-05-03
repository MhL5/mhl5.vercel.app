"use client";

import { FallbackPage } from "@/registry/new-york/FallbackPages/FallbackPages";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FallbackSection({ error, reset }: ErrorProps) {
  return <FallbackPage error={error} variant="error" reset={reset} />;
}
