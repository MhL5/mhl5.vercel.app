import {
  useAppField,
  useFieldContext,
  useFormContext,
} from "@/components/form/appForm";
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
import { useStore } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";

function AppFieldSelect({
  disabled,
  onValueChange,
  ...props
}: ComponentProps<typeof Select>) {
  const form = useFormContext();
  const field = useFieldContext<string>();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Select
      name={field.name}
      value={field.state.value}
      onValueChange={(value) => {
        onValueChange?.(value);
        field.handleChange(value);
      }}
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
  const { fieldControllerProps } = useAppField();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

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
  AppFieldSelectTrigger,
  // only renamed
  SelectContent as AppFieldSelectContent,
  SelectGroup as AppFieldSelectGroup,
  SelectItem as AppFieldSelectItem,
  SelectLabel as AppFieldSelectLabel,
  SelectScrollDownButton as AppFieldSelectScrollDownButton,
  SelectScrollUpButton as AppFieldSelectScrollUpButton,
  SelectSeparator as AppFieldSelectSeparator,
  SelectValue as AppFieldSelectValue,
};
