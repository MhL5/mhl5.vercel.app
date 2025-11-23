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
        "pointer-events-none absolute from-background to-transparent transition-all duration-200",
        props.orientation === "horizontal"
          ? "-translate-y-1/2 top-1/2 h-full w-14"
          : "-translate-x-1/2 left-1/2 h-14 w-full",
        positionClassName,
        className,
      )}
    />
  );
}
