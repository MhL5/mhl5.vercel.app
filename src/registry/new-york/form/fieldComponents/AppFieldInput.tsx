import { Input } from "@/components/ui/input";
import { useSelector } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldInput({ disabled, ...props }: ComponentProps<typeof Input>) {
  const { fieldControllerProps } = useGenerateFieldProps();
  const field = useFieldContext<string>();
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <Input
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

export { AppFieldInput };
