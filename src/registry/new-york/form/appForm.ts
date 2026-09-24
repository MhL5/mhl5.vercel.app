import {
  createFormHook,
  createFormHookContexts,
} from "@tanstack/react-form-nextjs";
import { toast } from "sonner";

import { focusOnFirstInvalidInput } from "./utils/focusOnFirstInvalidInput";
import { formatOnSubmitInvalidErrors } from "./utils/formatOnSubmitInvalidErrors";

const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

const useAppFormWithInvalidInputFocus: typeof useAppForm = (options) => {
  return useAppForm({
    onSubmitInvalid: (data) => {
      const fields = data.formApi.getAllErrors().fields;

      const errorMessage = formatOnSubmitInvalidErrors(fields);
      if (errorMessage) toast.error(errorMessage);
      focusOnFirstInvalidInput();
    },
    ...options,
  });
};

export {
  fieldContext,
  formContext,
  useAppFormWithInvalidInputFocus as useAppForm,
  useFieldContext,
  useFormContext,
  withFieldGroup,
  withForm,
};
