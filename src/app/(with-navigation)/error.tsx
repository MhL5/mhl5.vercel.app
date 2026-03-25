"use client";

import { FallbackPage } from "@/registry/new-york/FallbackPages/FallbackPages";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FallbackSection({ reset }: ErrorProps) {
  return (
    <FallbackPage
      variant="error"
      className="h-[calc(100svh-var(--site-header-height))]"
      reset={reset}
    />
  );
}
