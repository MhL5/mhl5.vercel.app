import { cn } from "@/lib/utils";

type FadeShadowProps = (
  | {
      orientation: "vertical";
      positionY: "top" | "bottom";
    }
  | {
      orientation: "horizontal";
      positionX: "left" | "right";
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

export default function FadeShadow(props: FadeShadowProps) {
  const { className } = props;

  let positionClassName = "";

  if (props.orientation === "horizontal")
    positionClassName = positionClassNames[props.positionX];
  if (props.orientation === "vertical")
    positionClassName = positionClassNames[props.positionY];

  return (
    <span
      className={cn(
        "from-background pointer-events-none absolute to-transparent",
        props.orientation === "horizontal"
          ? "top-1/2 h-full w-14 -translate-y-1/2"
          : "left-1/2 h-14 w-full -translate-x-1/2",
        positionClassName,
        className,
      )}
    />
  );
}
