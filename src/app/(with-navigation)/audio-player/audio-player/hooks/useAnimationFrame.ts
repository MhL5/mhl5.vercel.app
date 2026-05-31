import { useEffect, useEffectEvent, useRef } from "react";

function useAnimationFrame(callback: (delta: number) => void) {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const onFrame = useEffectEvent((delta: number) => callback(delta));

  useEffect(() => {
    function animate(time: number) {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        onFrame(delta);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = null;
    };
  }, []);
}

export { useAnimationFrame };
