type calcContainerBorderRadiusParams = {
  padding: number;
  innerRadius: number;
  unit?: "px" | "rem";
};

export function calcContainerBorderRadius({
  padding,
  innerRadius,
  unit = "px",
}: calcContainerBorderRadiusParams) {
  // 1 rem = 16px by default in tailwind
  // if unit is px, convert to rem
  if (unit === "px") return `${(innerRadius + padding) / 16}rem`;

  return `${innerRadius + padding}rem`;
}
