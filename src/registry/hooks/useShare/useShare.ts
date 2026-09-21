"use client";

import { tryCatch } from "@/registry/utils/tryCatch/tryCatch";
import { useState } from "react";
import { toast } from "sonner";

type UseShareParams = {
  shareData: ShareData;
  onError?: (error: Error) => void;
};

function useShare({ shareData, onError }: UseShareParams) {
  const [error, setError] = useState<string | null>(null);
  const isSupported =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function handleShare() {
    if (!isSupported)
      return toast.error("Share is not supported on your browser!");

    await tryCatch(navigator.share(shareData), {
      onError: (error) => {
        if (!error || error?.name === "AbortError") return setError(null);

        onError?.(error);
        setError(
          error?.message?.trim() || "Something went wrong while sharing!",
        );
      },
    });
  }

  return { handleShare, isSupported, error };
}

export { useShare };
