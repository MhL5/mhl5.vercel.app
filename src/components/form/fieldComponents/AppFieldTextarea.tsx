import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@tanstack/react-form";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext, useFormContext } from "../appForm";

export default function AppFieldTextarea({
  disabled,
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
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}
