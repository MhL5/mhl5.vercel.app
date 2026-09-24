import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldSelect({ disabled, ...props }: ComponentProps<typeof Select>) {
  const form = useFormContext();
  const field = useFieldContext<string>();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <Select
      name={field.name}
      value={field.state.value ?? ""}
      onValueChange={field.handleChange}
      disabled={isSubmitting || disabled}
      {...props}
    />
  );
}

function AppFieldSelectTrigger({
  disabled,
  ...props
}: ComponentProps<typeof SelectTrigger>) {
  const form = useFormContext();
  const { fieldControllerProps } = useGenerateFieldProps();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <SelectTrigger
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}

export {
  AppFieldSelect,
  // only renamed
  SelectContent as AppFieldSelectContent,
  SelectGroup as AppFieldSelectGroup,
  SelectItem as AppFieldSelectItem,
  SelectLabel as AppFieldSelectLabel,
  SelectScrollDownButton as AppFieldSelectScrollDownButton,
  SelectScrollUpButton as AppFieldSelectScrollUpButton,
  SelectSeparator as AppFieldSelectSeparator,
  AppFieldSelectTrigger,
  SelectValue as AppFieldSelectValue,
};
