"use client";

import { useEffect, useRef } from "react";

type OtpContent = CredentialRequestOptions & {
  otp: { transport: ["sms"] };
};

export function useOtp(callback: (code: string) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    if (!("OTPCredential" in window)) return;
    const abortController = new AbortController();

    async function getOTP() {
      try {
        const content = await navigator.credentials.get({
          otp: { transport: ["sms"] },
          signal: abortController.signal,
        } as OtpContent);

        if (content && "code" in content && typeof content.code === "string")
          callbackRef.current(content.code);
      } catch {}
    }
    getOTP();

    return () => abortController.abort();
  }, []);
}
