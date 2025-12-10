import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type AutoGridProps<T extends keyof HTMLElementTagNameMap> = {
  /**
   * The maximum number of columns to display.
   * @example 5
   */
  maxColCount: number;
  /**
   * The minimum size of each column.
   * `${number}rem` or `${number}px`
   * @example "5rem" or "80px"
   */
  minColSize: AutoGridSize;
  /**
   * The gap between columns.
   * `${number}rem` or `${number}px`
   * @example "1rem" or "16px"
   */
  gap: AutoGridSize;

  /**
   * The HTML element to render.
   * @example "div"
   */
  as: T;
} & ComponentProps<T>;

/**
 * automatically adjusts the grid columns without relying on breakpoints.
 */
export default function AutoGrid<T extends keyof HTMLElementTagNameMap>({
  gap = "1rem",
  maxColCount = 5,
  minColSize = "5rem",
  as,
  style,
  className,
  ...props
}: AutoGridProps<T>) {
  const Component = as || "div";

  return (
    // @ts-expect-error - typescript is not able to infer the type of the component
    <Component
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(var(--grid-col-min-size-calc),1fr))] gap-(--grid-gap)",
        className,
      )}
      style={{
        "--grid-gap": resolveSize(gap),
        "--grid-max-col-count": maxColCount,
        "--grid-min-col-size": resolveSize(minColSize),
        "--grid-col-min-size-calc":
          "min(100%, max(var(--grid-min-col-size), var(--grid-col-size-calc)))",
        "--grid-col-size-calc":
          "calc((100% - var(--grid-gap) * var(--grid-max-col-count)) / var(--grid-max-col-count))",
        ...style,
      }}
      {...props}
    />
  );
}

type AutoGridSize = `${number}rem` | `${number}px`;

const resolveSize = (size: AutoGridSize) =>
  size.endsWith("px") ? `${+size.replace("px", "") / 16}rem` : size;
