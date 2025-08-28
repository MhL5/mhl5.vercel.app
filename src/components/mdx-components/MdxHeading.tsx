import type { HTMLAttributes } from "react";

type MdxHeadingProps = {
  heading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement>;

export default function MdxHeading({
  children,
  heading: Heading,
  ...props
}: MdxHeadingProps) {
  return (
    <Heading
      id={
        typeof children === "string"
          ? children.toLowerCase().replaceAll(" ", "-")
          : ""
      }
      {...props}
    >
      {children}
    </Heading>
  );
}
