import { cn } from "@/lib/utils";
import { type ComponentProps, useId } from "react";

type BackgroundNoiseProps = ComponentProps<"div"> & { opacity?: number };

/**
 * Adds a noise grain effect to the closest positioned ancestor.
 * The parent element must have `position: relative` (or absolute/fixed/sticky).
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   <BackgroundNoise />
 *   {/* your content *\/}
 * </div>
 * ```
 */
export default function BackgroundNoise({
  className,
  opacity = 0.1,
  style,
  ...props
}: BackgroundNoiseProps) {
  const id = useId();
  const filterId = `grain-${id}`;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      style={{ ...style, filter: `url(#${filterId})`, opacity }}
      aria-hidden="true"
      {...props}
    >
      <svg className="absolute size-0">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="noise" mode="soft-light" />
        </filter>
      </svg>
    </div>
  );
}
