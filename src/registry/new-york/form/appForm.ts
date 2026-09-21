import {
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form-nextjs";

const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
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
