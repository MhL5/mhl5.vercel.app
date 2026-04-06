"use client";

import GradientFade from "@/components/GradientFade";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type ScrollFadeAreaProps = {
  children: ReactNode;
  fadeShadowClassNames?: string;
  orientation?: "horizontal" | "vertical" | "both";
} & Omit<ComponentProps<"div">, "ref">;

export default function ScrollFadeArea({
  fadeShadowClassNames,
  className,
  orientation = "horizontal",
  onScroll,
  ...props
}: ScrollFadeAreaProps) {
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    ({
      scrollLeft,
      scrollWidth,
      clientWidth,
      scrollTop,
      scrollHeight,
      clientHeight,
    }: {
      scrollLeft: number;
      scrollWidth: number;
      clientWidth: number;
      scrollTop: number;
      scrollHeight: number;
      clientHeight: number;
    }) => {
      if (orientation === "horizontal" || orientation === "both") {
        const isAtStart = scrollLeft === 0;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        const isScrollable = scrollWidth > clientWidth;

        if (!isScrollable) return;

        setShowLeftShadow(!isAtStart);
        setShowRightShadow(!isAtEnd);
      }

      if (orientation === "vertical" || orientation === "both") {
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const isScrollable = scrollHeight > clientHeight;

        if (!isScrollable) return;

        setShowTopShadow(!isAtTop);
        setShowBottomShadow(!isAtBottom);
      }
    },
    [orientation],
  );

  useEffect(() => {
    if (!scrollRef.current) return;

    handleScroll({
      scrollLeft: scrollRef.current.scrollLeft,
      scrollWidth: scrollRef.current.scrollWidth,
      clientWidth: scrollRef.current.clientWidth,
      scrollTop: scrollRef.current.scrollTop,
      scrollHeight: scrollRef.current.scrollHeight,
      clientHeight: scrollRef.current.clientHeight,
    });
  }, [handleScroll]);

  return (
    <div data-slot="ScrollFadeArea" className="group relative overflow-hidden">
      {(orientation === "horizontal" || orientation === "both") && (
        <>
          <GradientFade
            orientation="horizontal"
            positionX="left"
            className={cn(
              showLeftShadow ? "opacity-100" : "opacity-0",
              fadeShadowClassNames,
            )}
          />

          <GradientFade
            orientation="horizontal"
            positionX="right"
            className={cn(
              showRightShadow ? "opacity-100" : "opacity-0",
              fadeShadowClassNames,
            )}
          />
        </>
      )}

      {(orientation === "vertical" || orientation === "both") && (
        <>
          <GradientFade
            orientation="vertical"
            positionY="top"
            className={cn(
              showTopShadow ? "opacity-100" : "opacity-0",
              fadeShadowClassNames,
            )}
          />

          <GradientFade
            orientation="vertical"
            positionY="bottom"
            className={cn(
              showBottomShadow ? "opacity-100" : "opacity-0",
              fadeShadowClassNames,
            )}
          />
        </>
      )}

      <div
        ref={scrollRef}
        onScroll={(e) => {
          onScroll?.(e);
          handleScroll({
            scrollLeft: e.currentTarget.scrollLeft,
            scrollWidth: e.currentTarget.scrollWidth,
            clientWidth: e.currentTarget.clientWidth,
            scrollTop: e.currentTarget.scrollTop,
            scrollHeight: e.currentTarget.scrollHeight,
            clientHeight: e.currentTarget.clientHeight,
          });
        }}
        data-slot={orientation}
        className={cn(
          "overflow-auto data-[slot=horizontal]:overflow-x-auto data-[slot=horizontal]:overflow-y-hidden data-[slot=horizontal]:whitespace-nowrap data-[slot=vertical]:overflow-x-hidden data-[slot=vertical]:overflow-y-auto",
          className,
        )}
        {...props}
      />
    </div>
  );
}
