import { type ComponentProps, useMemo } from "react";

type AutoGridProps = {
  grid: {
    maxColCount: Options["maxColCount"];
    minColSize: Options["minColSize"];
    gap: Options["gap"];

    sm?: Options;
    md?: Options;
    lg?: Options;
  };
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

export function AutoGrid({ grid, ...props }: AutoGridProps) {
  const { gap, maxColCount, minColSize } = grid;
  const baseVariables = generateCssVariables({ maxColCount, minColSize, gap });

  const uniqueId = useMemo(() => `AutoGrid-${crypto.randomUUID()}`, []);

  const mediaQueryStyles =
    grid &&
    (["sm", "md", "lg"] as const)
      .map((key) => {
        const breakpoint = breakpoints[key];
        const options = grid[key];
        if (!breakpoint || !options) return "";

        return `
          @media (width >= ${breakpoint}) {
            #${uniqueId} {
              ${generateCssVariables(options)}
            }
          }
        `;
      })
      .join("\n");

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
              ${mediaQueryStyles || ""}`}
      </style>

      <div id={uniqueId} {...props} />
    </>
  );
}
