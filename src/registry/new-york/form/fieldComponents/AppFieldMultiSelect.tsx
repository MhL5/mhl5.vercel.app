import { MultiSelect, MultiSelectTrigger } from "@/components/ui/multi-select";
import { useSelector } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldMultiSelect({ ...props }: ComponentProps<typeof MultiSelect>) {
  const field = useFieldContext<string[]>();

  return (
    <MultiSelect
      values={field.state.value ?? []}
      onValuesChange={field.handleChange}
      {...props}
    />
  );
}

function AppFieldMultiSelectTrigger({
  disabled,
  ...props
}: ComponentProps<typeof MultiSelectTrigger>) {
  const form = useFormContext();
  const { fieldControllerProps } = useGenerateFieldProps();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <MultiSelectTrigger
      disabled={isSubmitting || disabled}
      {...fieldControllerProps}
      {...props}
    />
  );
}

export {
  MultiSelectContent as AppFieldMultiSelectContent,
  MultiSelectGroup as AppFieldMultiSelectGroup,
  MultiSelectItem as AppFieldMultiSelectItem,
  MultiSelectValue as AppFieldMultiSelectValue,
  MultiSelectSeparator as AppFieldMultiSelectSeparator,
} from "@/components/ui/multi-select";
export { AppFieldMultiSelect, AppFieldMultiSelectTrigger };
