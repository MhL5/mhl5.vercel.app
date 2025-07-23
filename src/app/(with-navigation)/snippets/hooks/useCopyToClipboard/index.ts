import { useCallback, useRef, useState } from "react";

export default function useCopyToClipboard(content: string) {
  const [isCopying, setIsCopying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    await navigator.clipboard.writeText(content);
    setIsCopying(true);

    timeoutRef.current = setTimeout(() => {
      setIsCopying(false);
      console.log("\x1b[35m" + `is it me?` + "\x1b[0m");
    }, 2000);
  }, [content]);

  return { isCopying, handleCopy };
}
