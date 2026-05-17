import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, type HTMLAttributes } from "react";

const textSizeClassNames = {
  xs: "gap-1 text-xs [&>svg]:mt-0.25 [&>svg:not([class*='size-'])]:size-3",
  sm: "gap-1.5 text-sm [&>svg]:mt-0.5 [&>svg:not([class*='size-'])]:size-3.5",
  base: "gap-2 text-base [&>svg]:mt-0.75 [&>svg:not([class*='size-'])]:size-4",
  lg: "gap-2.5 text-lg [&>svg]:mt-1 [&>svg:not([class*='size-'])]:size-4.5",
  xl: "gap-3 text-xl [&>svg]:mt-1.25 [&>svg:not([class*='size-'])]:size-5",
  "2xl":
    "gap-3.5 text-2xl [&>svg]:mt-1.5 [&>svg:not([class*='size-'])]:size-5.5",
  "3xl": "gap-4 text-3xl [&>svg]:mt-1.75 [&>svg:not([class*='size-'])]:size-6",
  "4xl": "gap-4.5 text-4xl [&>svg]:mt-2 [&>svg:not([class*='size-'])]:size-6.5",
  "5xl": "gap-5 text-5xl [&>svg]:mt-2.25 [&>svg:not([class*='size-'])]:size-7",
};

const titleVariants = cva(
  "font-medium [&_svg]:shrink-0 [&:has(>svg)]:inline-flex [&:has(>svg)]:items-start",
  {
    variants: {
      variant: {
        default: "",
        withIcon: "",
      },
      size: {
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
      variant: "default",
    },
  },
);

type TitleProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants>;

function Title({
  as = "h2",
  size = "default",
  variant = "default",
  className,
  ...props
}: TitleProps) {
  const Heading = as;

  return (
    <Heading
      className={cn(titleVariants({ size, variant }), className)}
      {...props}
    />
  );
}

const paragraphVariants = cva(
  "font-normal text-muted-foreground [&_svg]:shrink-0 [&:has(>svg)]:inline-flex [&:has(>svg)]:items-start",
  {
    variants: {
      variant: {
        default: "",
        withIcon: "inline-flex shrink-0 items-start",
      },
      size: {
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
      variant: "default",
    },
  },
);

type ParagraphProps = ComponentProps<"p"> &
  VariantProps<typeof paragraphVariants>;

function Paragraph({
  className,
  size = "default",
  variant = "default",
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn(paragraphVariants({ size, variant }), className)}
      {...props}
    />
  );
}

const spanVariants = cva(
  "font-normal text-muted-foreground [&_svg]:shrink-0 [&:has(>svg)]:inline-flex [&:has(>svg)]:items-start",
  {
    variants: {
      variant: {
        default: "",
        withIcon: "inline-flex shrink-0 items-start",
      },
      size: {
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
      variant: "default",
    },
  },
);

type SpanProps = ComponentProps<"span"> & VariantProps<typeof spanVariants>;

function Span({
  className,
  size = "default",
  variant = "default",
  ...props
}: SpanProps) {
  return (
    <span
      className={cn(spanVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export {
  type TitleProps,
  Title,
  type ParagraphProps,
  Paragraph,
  type SpanProps,
  Span,
};
