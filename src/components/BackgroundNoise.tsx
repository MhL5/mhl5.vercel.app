import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Required css:
 * ```css
 * body:before {
 *     content: "";
 *     z-index: 1;
 *     pointer-events: none;
 *     opacity: .1;
 *     filter: url(#grain);
 *     background: var(--background);
 *     width: 100%;
 *     height: 100%;
 *     position: fixed;
 *     top: 0;
 *     left: 0;
 * }
 * svg.grain-noise{
 *   z-index:-1;
 *   width:0;
 *   height:0;
 *   position: absolute;
 * }
 * ```
 */
export default function BackgroundNoise({
  className,
  ...props
}: ComponentProps<"svg">) {
  return (
    <svg className={cn("hidden", className)} aria-hidden="true" {...props}>
      <filter id="grain">
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
  );
}
