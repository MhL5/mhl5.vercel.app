import {
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form-nextjs";

import AppField from "./fieldComponents/AppField";
import AppFieldDescription from "./fieldComponents/AppFieldDescription";
import { AppFieldDropzone } from "./fieldComponents/AppFieldDropzone";
import AppFieldError from "./fieldComponents/AppFieldError";
import AppFieldInput from "./fieldComponents/AppFieldInput";
import AppFieldLabel from "./fieldComponents/AppFieldLabel";
import {
  AppFieldSelect,
  AppFieldSelectContent,
  AppFieldSelectGroup,
  AppFieldSelectItem,
  AppFieldSelectLabel,
  AppFieldSelectScrollDownButton,
  AppFieldSelectScrollUpButton,
  AppFieldSelectSeparator,
  AppFieldSelectTrigger,
  AppFieldSelectValue,
} from "./fieldComponents/AppFieldSelect";
import AppFieldTextarea from "./fieldComponents/AppFieldTextarea";
import SubmitButton from "./formComponents/SubmitButton";

const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Field: AppField,
    FieldLabel: AppFieldLabel,
    FieldError: AppFieldError,
    FieldDescription: AppFieldDescription,
    Input: AppFieldInput,
    Textarea: AppFieldTextarea,
    DropZone: AppFieldDropzone,
    // Select
    Select: AppFieldSelect,
    SelectTrigger: AppFieldSelectTrigger,
    SelectContent: AppFieldSelectContent,
    SelectGroup: AppFieldSelectGroup,
    SelectItem: AppFieldSelectItem,
    SelectLabel: AppFieldSelectLabel,
    SelectScrollDownButton: AppFieldSelectScrollDownButton,
    SelectScrollUpButton: AppFieldSelectScrollUpButton,
    SelectSeparator: AppFieldSelectSeparator,
    SelectValue: AppFieldSelectValue,
  },
  formComponents: {
    SubmitButton,
  },
});

/**
 * Hook for managing form field accessibility and validation state.
 *
 * Provides ARIA attributes and IDs for connecting form controls with their descriptions and error messages.
 * Automatically tracks field validation state and touched status.
 *
 * - **fieldControllerProps:** Props to spread on the form control element (id, aria-describedby, aria-invalid)
 * - **fieldDescriptionId:**   ID for the field description element
 * - **fieldErrorId:**         ID for the field error message element
 * - **isInvalid:**            Whether the field has been touched and contains validation errors
 */
function useAppField() {
  const field = useFieldContext();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const uniqueIdPrefix = `${field.form.formId}-${field.name}`;

  const fieldControllerId = `${uniqueIdPrefix}-item`;
  const fieldDescriptionId = `${uniqueIdPrefix}-description`;
  const fieldErrorId = `${uniqueIdPrefix}-error`;

  const fieldControllerProps = {
    id: fieldControllerId,
    "aria-describedby": `${fieldDescriptionId}${isInvalid ? ` ${fieldErrorId}` : ``}`,
    "aria-invalid": isInvalid,
  };

  return {
    /** Props to spread on the form control element (id, aria-describedby, aria-invalid) */
    fieldControllerProps,
    /** id for the field description element */
    fieldDescriptionId,
    /** id for the field error message element */
    fieldErrorId,
    /** Whether the field has been touched and contains validation errors */
    isInvalid,
  };
}

export {
  fieldContext,
  formContext,
  useAppField,
  useAppForm,
  useFieldContext,
  useFormContext,
  withFieldGroup,
  withForm,
};
