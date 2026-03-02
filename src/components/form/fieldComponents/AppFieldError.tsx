import { FieldError } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext } from "../appForm";

export default function AppFieldError(
  props: ComponentProps<typeof FieldError>,
) {
  const { fieldErrorId } = useAppField();
  const field = useFieldContext();
  return (
    <FieldError id={fieldErrorId} errors={field.state.meta.errors} {...props} />
  );
}
