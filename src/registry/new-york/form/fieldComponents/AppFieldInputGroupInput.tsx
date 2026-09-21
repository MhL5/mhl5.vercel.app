import { InputGroupInput } from "@/components/ui/input-group";
import { useStore } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldInputGroupInput({
  disabled,
  ...props
}: ComponentProps<typeof InputGroupInput>) {
  const { fieldControllerProps } = useGenerateFieldProps();
  const field = useFieldContext<string>();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <InputGroupInput
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}

export { AppFieldInputGroupInput };
