"use client";

import { type PropsWithChildren, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Scrollable({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Mouse drag states
  const isDraggingRef = useRef(false);
  const hasMoved = useRef(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  function checkScrollButtons() {
    if (!ref.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = ref.current;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }

  function scrollTo(direction: "left" | "right") {
    if (!ref.current) return;
    const currentIndex = Math.round(
      ref.current.scrollLeft / ref.current.children[0].clientWidth,
    );
    const maxIndex = ref.current.children.length - 1;

    const targetIndex =
      direction === "left"
        ? Math.max(0, currentIndex - 1)
        : Math.min(maxIndex, currentIndex + 1);

    const element = ref.current.children[targetIndex];
    element.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  // Mouse drag handlers
  function handleMouseDown(e: React.MouseEvent) {
    if (!ref.current) return;
    // Prevent text selection while dragging
    e.preventDefault();

    isDraggingRef.current = true;
    hasMoved.current = false;
    setStartX(e.pageX);
    setScrollStart(ref.current.scrollLeft);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDraggingRef.current || !ref.current) return;

    const x = e.pageX;
    const moveDistance = Math.abs(startX - x);

    // Mark that movement occurred if moved more than 5px
    if (moveDistance > 5) hasMoved.current = true;

    const walk = (startX - x) * 2; // Multiply by 2 for faster scrolling
    ref.current.scrollLeft = scrollStart + walk;
  }

  function handleMouseUp() {
    isDraggingRef.current = false;
  }

  function handleMouseLeave() {
    isDraggingRef.current = false;
  }

  function handleClickCapture(e: React.MouseEvent) {
    if (!hasMoved.current) return;

    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="">
      <div className="mb-5 flex items-center justify-between gap-2 px-5">
        <h1>Test</h1>

        <div className="flex items-center gap-2">
          <Button disabled={!canScrollLeft} onClick={() => scrollTo("left")}>
            left
          </Button>
          <Button disabled={!canScrollRight} onClick={() => scrollTo("right")}>
            right
          </Button>
        </div>
      </div>

      {/** biome-ignore lint/a11y/useSemanticElements: for a scrollable container div is better */}
      <div
        ref={ref}
        role="group"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: for a scrollable container div is better
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 [&>*]:snap-start"
        onScroll={checkScrollButtons}
        // mouse drag handlers
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClickCapture={handleClickCapture}
      >
        {children}
      </div>
    </div>
  );
}
