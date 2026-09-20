"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useCopyToClipboard(contentToCopy: string) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      await navigator.clipboard.writeText(contentToCopy);
      setCopyState("copied");

      timeoutRef.current = setTimeout(() => {
        setCopyState("idle");
      }, 2000);
    } catch {
      setCopyState("error");
    }
  }, [contentToCopy]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copyState, handleCopy };
}
