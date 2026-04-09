import { Input } from "@/components/ui/input";
import { useStore } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext, useFormContext } from "../appForm";

export default function AppFieldInput({
  disabled,
  onChange,
  onBlur,
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
