import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldTextarea({
  disabled,
  ...props
}: ComponentProps<typeof Textarea>) {
  const { fieldControllerProps } = useGenerateFieldProps();
  const field = useFieldContext<string>();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Textarea
      name={field.name}
      value={field.state.value ?? ""}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}

export { AppFieldTextarea };
