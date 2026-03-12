import { AppFieldDropzone } from "@/components/form/fieldComponents/AppFieldDropzone";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

// Field Components
// --------------------------------
const AppField = lazy(
  () => import("@/components/form/fieldComponents/AppField"),
);
const AppFieldLabel = lazy(
  () => import("@/components/form/fieldComponents/AppFieldLabel"),
);
const AppFieldError = lazy(
  () => import("@/components/form/fieldComponents/AppFieldError"),
);
const AppFieldDescription = lazy(
  () => import("@/components/form/fieldComponents/AppFieldDescription"),
);
const AppFieldInput = lazy(
  () => import("@/components/form/fieldComponents/AppFieldInput"),
);
const AppFieldTextarea = lazy(
  () => import("@/components/form/fieldComponents/AppFieldTextarea"),
);

// Form Components
// --------------------------------
const ResetButton = lazy(
  () => import("@/components/form/formComponents/ResetButton"),
);
const SubmitButton = lazy(
  () => import("@/components/form/formComponents/SubmitButton"),
);

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
  },
  formComponents: {
    SubmitButton,
    ResetButton,
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
    fieldControllerProps,
    fieldDescriptionId,
    fieldErrorId,
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
