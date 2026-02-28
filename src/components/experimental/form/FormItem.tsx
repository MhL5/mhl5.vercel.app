"use client";

import { Field } from "@/components/ui/field";
import { type AnyFieldApi } from "@tanstack/react-form";
import { type ComponentProps, createContext, use, useId } from "react";

type FormFieldContextValue = {
  isInvalid: boolean;
  field: AnyFieldApi;

  formItemId: string;
  formDescriptionId: string;
  formErrorId: string;

  formControlProps: {
    id: string;
    "aria-describedby": string;
    "aria-invalid": boolean;
  };
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

type FormItemProps = {
  field: AnyFieldApi;
} & ComponentProps<typeof Field>;

/**
 * Simple wrapper around the Field component that provides a context for the form item.
 * This is used to avoid passing the same props to the Field component multiple times.
 */
function FormItem({ field, ...props }: FormItemProps) {
  const id = useId();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const formItemId = `${id}-item`;
  const formDescriptionId = `${id}-description`;
  const formErrorId = `${id}-error`;

  const formControlProps = {
    id: formItemId,
    "aria-describedby": isInvalid
      ? `${formDescriptionId} ${formErrorId}`
      : `${formDescriptionId}`,
    "aria-invalid": isInvalid,
  };

  return (
    <FormFieldContext
      value={{
        formControlProps,
        formItemId,
        formDescriptionId,
        formErrorId,
        isInvalid,
        field,
      }}
    >
      <Field data-invalid={isInvalid} {...props} />
    </FormFieldContext>
  );
}

function useFormItemContext() {
  const context = use(FormFieldContext);
  if (!context)
    throw new Error(
      "useFormFieldContext must be used within a FormField Context",
    );
  return context;
}

export { FormItem, useFormItemContext };
