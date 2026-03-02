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
  },
  formComponents: {
    SubmitButton,
    ResetButton,
  },
});

function useAppField() {
  const field = useFieldContext();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const uniqueIdPrefix = `${field.form.formId}-${field.name}`;

  const fieldControllerId = `${uniqueIdPrefix}-item`;
  const fieldDescriptionId = `${uniqueIdPrefix}-description`;
  const fieldErrorId = `${uniqueIdPrefix}-error`;

  const formControlProps = {
    id: fieldControllerId,
    "aria-describedby": `${fieldDescriptionId}${isInvalid ? ` ${fieldErrorId}` : ``}`,
    "aria-invalid": isInvalid,
  };

  return {
    formControlProps,
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
