import { Textarea } from "@/components/ui/textarea";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext, useFormContext } from "../appForm";

export default function AppFieldTextarea({
  disabled,
  ...props
}: ComponentProps<typeof Textarea>) {
  const { fieldControlProps } = useAppField();
  const field = useFieldContext<string>();
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Textarea
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={isSubmitting || disabled}
          {...fieldControlProps}
          {...props}
        />
      )}
    </form.Subscribe>
  );
}
