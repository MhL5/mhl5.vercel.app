"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const AppField = lazy(() =>
  import("@/components/form/components/AppField").then(({ AppField }) => ({
    default: AppField,
  })),
);
const AppFieldLabel = lazy(() =>
  import("@/components/form/components/AppField").then(({ AppFieldLabel }) => ({
    default: AppFieldLabel,
  })),
);
const AppFieldError = lazy(() =>
  import("@/components/form/components/AppField").then(({ AppFieldError }) => ({
    default: AppFieldError,
  })),
);
const AppFieldDescription = lazy(() =>
  import("@/components/form/components/AppField").then(
    ({ AppFieldDescription }) => ({
      default: AppFieldDescription,
    }),
  ),
);
const AppFieldInput = lazy(
  () => import("@/components/form/components/AppFieldInput"),
);
const AppFieldTextarea = lazy(
  () => import("@/components/form/components/AppFieldTextarea"),
);
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

export {
  fieldContext,
  formContext,
  useAppForm,
  useFieldContext,
  useFormContext,
  withFieldGroup,
  withForm,
};
