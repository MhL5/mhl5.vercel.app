"use client";

import { ErrorPage as ErrorPageUi } from "@/registry/new-york/FallbackPages/FallbackPages";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return <ErrorPageUi error={error} reset={reset} />;
}
