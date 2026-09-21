import { FieldLabel } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldLabel(props: ComponentProps<typeof FieldLabel>) {
  const { fieldControllerProps, isInvalid } = useGenerateFieldProps();
  return (
    <FieldLabel
      aria-invalid={isInvalid}
      htmlFor={fieldControllerProps.id}
      {...props}
    />
  );
}

export { AppFieldLabel };
