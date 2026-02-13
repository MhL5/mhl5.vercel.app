import { Separator as DefaultSeparator } from "@/components/ui/separator";

export function Separator() {
  return (
    <DefaultSeparator
      orientation="vertical"
      className="data-[orientation=vertical]:h-5"
    />
  );
}
