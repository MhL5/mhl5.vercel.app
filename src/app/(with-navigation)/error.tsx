"use client";

import { FallbackPageError } from "@/registry/new-york/FallbackPages/FallbackPages";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FallbackSection({ reset, error }: ErrorProps) {
  return (
    <FallbackPageError
      error={error}
      className="h-[calc(100svh-var(--site-header-height))]"
      reset={reset}
    />
  );
}
