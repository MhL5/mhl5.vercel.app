"use client";

import { tryCatch } from "@/registry/utils/tryCatch/tryCatch";
import { useState } from "react";
import { toast } from "sonner";

const DEFAULT_STATE = {
  status: "idle",
} as const satisfies UseShareParams["state"];

type UseShareParams = {
  shareData: ShareData;
  state:
    | {
        status: "idle";
      }
    | {
        status: "error";
        message: string;
      };
  isPending: boolean;
};

function useShare({ shareData }: UseShareParams) {
  const [state, setState] = useState<UseShareParams["state"]>(DEFAULT_STATE);
  const isSupported =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function handleShare() {
    if (!isSupported)
      return toast.error("Share is not supported on your browser!");

    await tryCatch(navigator.share(shareData), {
      onError: (error) => {
        if (!error || (error as Error)?.name === "AbortError") return;
        setState({
          status: "error",
          message: (error as Error)?.message || "Something went wrong!",
        });
      },
    });
  }

  function clearState() {
    setState({ status: "idle" });
  }

  return { handleShare, isSupported, state, clearState };
}

export { useShare };
