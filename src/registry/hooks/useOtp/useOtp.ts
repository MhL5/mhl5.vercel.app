"use client";

import { useEffect, useEffectEvent } from "react";

type OtpContent = CredentialRequestOptions & {
  otp: { transport: ["sms"] };
};

function useOtp(callback: (code: string) => void) {
  const onCodeReceivedEffectEvent = useEffectEvent(callback);

  useEffect(() => {
    if (!("OTPCredential" in window)) return;
    const abortController = new AbortController();

    function getOtp() {
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: abortController.signal,
        } as OtpContent)
        .then((content) =>
          content && "code" in content && typeof content.code === "string"
            ? onCodeReceivedEffectEvent(content.code)
            : null,
        )
        .catch(() => null);
    }
    getOtp();

    return () => abortController.abort();
  }, []);
}

export { useOtp };
