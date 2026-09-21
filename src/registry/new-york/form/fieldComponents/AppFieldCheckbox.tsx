import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldCheckbox({
  disabled,
  ...props
}: ComponentProps<typeof Checkbox>) {
  const { fieldControllerProps } = useGenerateFieldProps();
  const field = useFieldContext<boolean>();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Checkbox
      name={field.name}
      onBlur={field.handleBlur}
      checked={field.state.value ?? false}
      onCheckedChange={(checked) => field.handleChange(!!checked)}
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}

export { AppFieldCheckbox };
