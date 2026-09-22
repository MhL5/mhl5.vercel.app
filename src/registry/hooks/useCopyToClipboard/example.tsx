"use client";

import { Button } from "@/components/ui/button";
import useCopyToClipboard from "@/registry/hooks/useCopyToClipboard/useCopyToClipboard";
import { cn } from "cn";

export default function Example() {
  const { copyState, handleCopy } = useCopyToClipboard("Hello, world!");

  return (
    <Button
      onClick={handleCopy}
      className={cn(
        copyState === "copied"
          ? "bg-green-500 text-green-100 hover:bg-green-500/90"
          : "",
      )}
    >
      {copyState === "copied" ? "Copied" : "Copy"}
    </Button>
  );
}
