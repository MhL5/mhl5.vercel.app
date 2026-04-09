import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext, useFormContext } from "../appForm";

export default function AppFieldTextarea({
  disabled,
  onBlur,
  onChange,
  ...props
}: ComponentProps<typeof Textarea>) {
  const { fieldControllerProps } = useAppField();
  const field = useFieldContext<string>();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Textarea
      name={field.name}
      value={field.state.value}
      onBlur={(e) => {
        onBlur?.(e);
        field.handleBlur();
      }}
      onChange={(e) => {
        onChange?.(e);
        field.handleChange(e.target.value);
      }}
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}
