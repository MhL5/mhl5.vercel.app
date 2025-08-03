"use client";

import useCopyToClipboard from "@/app/(with-navigation)/snippets/hooks/useCopyToClipboard";
import { Button } from "@/components/ui/button";

export default function Example() {
  const { hasCopied, handleCopy } = useCopyToClipboard("Hello, world!");

  return <Button onClick={handleCopy}>{hasCopied ? "Copied" : "Copy"}</Button>;
}
