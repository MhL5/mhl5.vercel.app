import { cn } from "@/lib/utils";

type FadeShadowProps = (
  | {
      orientation: "vertical";
      position: "left" | "right";
    }
  | {
      orientation: "horizontal";
      position: "top" | "bottom";
    }
) & {
  className?: string;
};

const positionClassNames = {
  left: "left-0 bg-linear-to-r",
  right: "right-0 bg-linear-to-l",
  top: "top-0 bg-linear-to-b",
  bottom: "bottom-0 bg-linear-to-t",
};

export default function FadeShadow({
  position,
  className,
  orientation = "horizontal",
}: FadeShadowProps) {
  return (
    <span
      className={cn(
        "from-background pointer-events-none absolute to-transparent",
        orientation === "vertical"
          ? "top-1/2 h-full w-14 -translate-y-1/2"
          : "left-1/2 h-14 w-full -translate-x-1/2",
        positionClassNames[position],
        className,
      )}
    />
  );
}
