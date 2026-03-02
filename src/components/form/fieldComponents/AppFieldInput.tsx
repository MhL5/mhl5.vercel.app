import { Input } from "@/components/ui/input";
import { type ComponentProps } from "react";

import { useAppField, useFieldContext, useFormContext } from "../appForm";

export default function AppFieldInput({
  disabled,
  ...props
}: ComponentProps<typeof Input>) {
  const { formControlProps } = useAppField();
  const field = useFieldContext<string>();
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Input
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={isSubmitting || disabled}
          {...formControlProps}
          {...props}
        />
      )}
    </form.Subscribe>
  );
}
