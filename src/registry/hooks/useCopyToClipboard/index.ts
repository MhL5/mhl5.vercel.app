"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useCopyToClipboard(contentToCopy: string) {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    await navigator.clipboard.writeText(contentToCopy);
    setHasCopied(true);
    // optional: you can use a toast library to show a success message
    // toast.success("Copied to clipboard");

    timeoutRef.current = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [contentToCopy]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { hasCopied, handleCopy };
}
