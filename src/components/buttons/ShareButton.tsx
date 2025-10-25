"use client";

import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { RequiredPick } from "@/registry/types/RequiredPick/RequiredPick";

type ShareButtonProps = {
  shareOptions: RequiredPick<ShareData, "title" | "url">;
} & ButtonProps;

export default function ShareButton({
  className,
  shareOptions = { title: "", url: "" },
  ...props
}: ShareButtonProps) {
  async function handleShare() {
    try {
      navigator.share(shareOptions);
    } catch {
      await navigator.clipboard.writeText(`
                    ${shareOptions.title}
                    ${shareOptions.url}
                    `);
      toast.success("Copied to clipboard");
    }
  }

  return (
    <Button
      variant="outline"
      aria-label="Share"
      className={className}
      onClick={handleShare}
      {...props}
    />
  );
}
