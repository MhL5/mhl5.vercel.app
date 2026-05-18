import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, type HTMLAttributes } from "react";

const textSizeClassNames = {
  xs: "gap-1 text-xs [&>svg:not([class*='size-'])]:size-3",
  sm: "gap-1.5 text-sm [&>svg:not([class*='size-'])]:size-3.5",
  base: "gap-2 text-base [&>svg:not([class*='size-'])]:size-4",
  lg: "gap-2.5 text-lg [&>svg:not([class*='size-'])]:size-4.5",
  xl: "gap-3 text-xl [&>svg:not([class*='size-'])]:size-5",
  "2xl": "gap-3.5 text-2xl [&>svg:not([class*='size-'])]:size-6",
  "3xl": "gap-4 text-3xl [&>svg:not([class*='size-'])]:size-7.5",
  "4xl": "gap-4.5 text-4xl [&>svg:not([class*='size-'])]:size-9",
  "5xl": "gap-5 text-5xl [&>svg:not([class*='size-'])]:size-12",
};

const titleVariants = cva(`font-medium text-foreground`, {
  variants: {
    size: {
      sm: textSizeClassNames.sm,
      default: textSizeClassNames.base,
      md: textSizeClassNames.lg,
      lg: textSizeClassNames.xl,
      xl: textSizeClassNames["2xl"],
      "2xl": textSizeClassNames["3xl"],
      "3xl": textSizeClassNames["4xl"],
      "4xl": textSizeClassNames["5xl"],
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type TitleProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants>;

function Title({ as = "h2", size, className, ...props }: TitleProps) {
  const Heading = as;

  return (
    <Heading className={cn(titleVariants({ size }), className)} {...props} />
  );
}

const paragraphVariants = cva(`font-normal text-muted-foreground`, {
  variants: {
    size: {
      sm: textSizeClassNames.xs,
      default: textSizeClassNames.sm,
      md: textSizeClassNames.base,
      lg: textSizeClassNames.lg,
      xl: textSizeClassNames.xl,
      "2xl": textSizeClassNames["2xl"],
      "3xl": textSizeClassNames["3xl"],
      "4xl": textSizeClassNames["4xl"],
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ParagraphProps = ComponentProps<"p"> &
  VariantProps<typeof paragraphVariants>;

function Paragraph({ className, size, ...props }: ParagraphProps) {
  return (
    <p className={cn(paragraphVariants({ size }), className)} {...props} />
  );
}

const spanVariants = cva(`font-normal text-muted-foreground`, {
  variants: {
    size: {
      sm: textSizeClassNames.xs,
      default: textSizeClassNames.xs,
      md: textSizeClassNames.sm,
      lg: textSizeClassNames.base,
      xl: textSizeClassNames.lg,
      "2xl": textSizeClassNames.xl,
      "3xl": textSizeClassNames["2xl"],
      "4xl": textSizeClassNames["3xl"],
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SpanProps = ComponentProps<"span"> & VariantProps<typeof spanVariants>;

function Span({ className, size, ...props }: SpanProps) {
  return <span className={cn(spanVariants({ size }), className)} {...props} />;
}

export {
  Paragraph,
  Span,
  Title,
  type ParagraphProps,
  type SpanProps,
  type TitleProps,
};
