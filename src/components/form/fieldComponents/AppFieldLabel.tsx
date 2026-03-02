import { FieldLabel } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useAppField } from "../appForm";

export default function AppFieldLabel(
  props: ComponentProps<typeof FieldLabel>,
) {
  const { fieldControlProps, isInvalid } = useAppField();
  return (
    <FieldLabel
      aria-invalid={isInvalid}
      htmlFor={fieldControlProps.id}
      {...props}
    />
  );
}
