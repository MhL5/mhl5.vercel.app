import { type ComponentProps, useCallback, useMemo } from "react";

type AutoGridProps = {
  maxColCount: Options["maxColCount"];
  minColSize: Options["minColSize"];
  gap: Options["gap"];

  sm?: Options;
  md?: Options;
  lg?: Options;
} & ComponentProps<"div">;

type Options = {
  maxColCount?: number;
  minColSize?: number;
  gap?: number;
};

const defaultOptions: Required<Options> = {
  maxColCount: 5,
  minColSize: 5,
  gap: 1,
};

const breakpoints = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
};

function generateCssVariables(options: Options): string {
  return `
    --grid-max-col-count: ${options.maxColCount || defaultOptions.maxColCount};
    --grid-min-col-size: ${options.minColSize || defaultOptions.minColSize}rem;
    --grid-gap: ${options.gap || defaultOptions.gap}rem;
  `;
}

/**
 * AutoGrid is a component that automatically adjusts the grid columns based on the screen size.
 *
 * @param maxColCount - The maximum number of columns the grid can have.
 * @param minColSize - The minimum size of each column in **rem**.
 * @param gap - The gap between each column in **rem**.
 * @param sm - The options for the small screen size.
 * @param md - The options for the medium screen size.
 * @param lg - The options for the large screen size.
 * @param props - Also accepts the HTML div props for the component.
 *
 */
export default function AutoGrid({
  gap,
  maxColCount,
  minColSize,
  sm,
  md,
  lg,
  ...props
}: AutoGridProps) {
  const baseVariables = generateCssVariables({ maxColCount, minColSize, gap });
  const uniqueId = useMemo(() => `AutoGrid-${crypto.randomUUID()}`, []);
  const generateMediaQueries = useCallback(
    () =>
      [sm, md, lg]
        .map((options, index) => {
          if (!options) return "";
          const breakpoint = Object.values(breakpoints)[index];
          return `
          @media (width >= ${breakpoint}) {
            #${uniqueId} {
              --grid-max-col-count: ${options.maxColCount || maxColCount};
              --grid-min-col-size: ${options.minColSize || minColSize}rem;
              --grid-gap: ${options.gap || gap}rem;
            }
          }
        `;
        })
        .join("\n"),
    [gap, maxColCount, minColSize, uniqueId, sm, md, lg],
  );
  const mediaQueries = useMemo(
    () => generateMediaQueries(),
    [generateMediaQueries],
  );

  return (
    <>
      <style>
        {`
          #${uniqueId} {
            ${baseVariables}
            
            /* calculations, do not touch */
            --grid-col-size-calc: calc(
              (100% - var(--grid-gap) * var(--grid-max-col-count)) /
                var(--grid-max-col-count)
            );
            --grid-col-min-size-calc: min(
              100%,
              max(var(--grid-min-col-size), var(--grid-col-size-calc))
            );
            display: grid;
            gap: var(--grid-gap);
            grid-template-columns: repeat(
              auto-fit,
              minmax(var(--grid-col-min-size-calc), 1fr)
            );
            ${mediaQueries || ""}`}
      </style>

      <div id={uniqueId} {...props} />
    </>
  );
}
