import { FieldError } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useFieldContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldError(props: ComponentProps<typeof FieldError>) {
  const { fieldErrorId } = useGenerateFieldProps();
  const field = useFieldContext();
  return (
    <FieldError id={fieldErrorId} errors={field.state.meta.errors} {...props} />
  );
}

export { AppFieldError };
