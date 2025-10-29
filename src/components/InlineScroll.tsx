"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import FadeShadow from "@/registry/new-york/FadeShadow/FadeShadow";

type HandleScrollFn = (params: {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
}) => void;

type InlineScrollProps = PropsWithChildren<{
  fadeShadowClassNames?: string;
}> &
  Omit<ComponentProps<"div">, "ref">;

export default function InlineScroll({
  children,
  fadeShadowClassNames,
  className,
  onScroll,
  ...props
}: InlineScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const handleScroll: HandleScrollFn = useCallback(
    ({ scrollLeft, scrollWidth, clientWidth }) => {
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1; // -1 for rounding issues

      const isScrollableContent = scrollWidth > clientWidth;
      if (!isScrollableContent) return;

      setShowLeftShadow(!isAtStart);
      setShowRightShadow(!isAtEnd);
    },
    [],
  );

  useEffect(() => {
    if (!scrollRef.current) return;

    handleScroll({
      scrollLeft: scrollRef.current.scrollLeft,
      scrollWidth: scrollRef.current.scrollWidth,
      clientWidth: scrollRef.current.clientWidth,
    });
  }, [handleScroll]);

  return (
    <div className="group relative overflow-hidden">
      <FadeShadow
        orientation="horizontal"
        positionX="left"
        className={cn(
          `${showLeftShadow ? "opacity-100" : "opacity-0"}`,
          fadeShadowClassNames,
        )}
      />

      <FadeShadow
        orientation="horizontal"
        positionX="right"
        className={cn(
          `${showRightShadow ? "opacity-100" : "opacity-0"}`,
          fadeShadowClassNames,
        )}
      />

      <div
        ref={scrollRef}
        onScroll={(e) => {
          handleScroll({
            scrollLeft: e.currentTarget.scrollLeft,
            scrollWidth: e.currentTarget.scrollWidth,
            clientWidth: e.currentTarget.clientWidth,
          });
          onScroll?.(e);
        }}
        className={cn(
          "scrollbar-on-hover overflow-x-auto whitespace-nowrap",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
