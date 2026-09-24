import { Input } from "@/components/ui/input";
import { useSelector } from "@tanstack/react-form-nextjs";
import { type ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldInputNumber({
  disabled,
  ...props
}: ComponentProps<typeof Input>) {
  const { fieldControllerProps } = useGenerateFieldProps();
  const field = useFieldContext<number | null>();
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <Input
      name={field.name}
      value={field.state.value || ""}
      onBlur={field.handleBlur}
      type="number"
      inputMode="numeric"
      onChange={(e) => {
        const number = e.target.valueAsNumber;
        field.handleChange(isNaN(number) ? null : number);
      }}
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}

export { AppFieldInputNumber };
