"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { frontendDomain } from "@/constants/constants";
import type { RequiredPick } from "@/registry/types/RequiredPick/RequiredPick";
import { toast } from "sonner";

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
                    ${frontendDomain}${shareOptions.url}
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
