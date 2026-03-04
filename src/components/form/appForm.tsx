import { getFieldControllerProps } from "@/components/form/utils/getFieldControllerProps";
import { getFieldIds } from "@/components/form/utils/getFieldIds";
import { isFieldInvalid } from "@/components/form/utils/isFieldInvalid";
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

  const isInvalid = isFieldInvalid(field);
  const { fieldDescriptionId, fieldErrorId } = getFieldIds(field);
  const fieldControlProps = getFieldControllerProps(field);

  return {
    fieldControlProps,
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
