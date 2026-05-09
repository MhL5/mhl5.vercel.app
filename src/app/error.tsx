"use client";

import { FallbackPageError } from "@/registry/new-york/FallbackPages/FallbackPages";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FallbackSection({ error, reset }: ErrorProps) {
  return <FallbackPageError error={error} reset={reset} />;
}
