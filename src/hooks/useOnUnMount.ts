"use client";

import { useEffect, useEffectEvent } from "react";

export function useOnUnMount(callback: () => void) {
  const onUnMountEvent = useEffectEvent(callback);

  useEffect(() => onUnMountEvent, []);
}
