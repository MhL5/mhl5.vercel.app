import { Input } from "@/components/ui/input";
import { useStore } from "@tanstack/react-form";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext, useFormContext } from "../appForm";

export default function AppFieldInput({
  disabled,
  ...props
}: ComponentProps<typeof Input>) {
  const { fieldControllerProps } = useAppField();
  const field = useFieldContext<string>();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Input
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
