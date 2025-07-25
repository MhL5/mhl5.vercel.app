import { useCallback, useRef, useState } from "react";

export default function useCopyToClipboard(content: string) {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    await navigator.clipboard.writeText(content);
    setHasCopied(true);

    timeoutRef.current = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [content]);

  return { hasCopied, handleCopy };
}
