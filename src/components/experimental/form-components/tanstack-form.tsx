"use client";

import { Slot } from "@radix-ui/react-slot";
import type { AnyFieldMeta } from "@tanstack/react-form";
import { type ComponentProps, createContext, useContext, useId } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

type FormFieldContextType = {
  isInvalid: boolean;
  name: string;
  fieldStateMeta: AnyFieldMeta;

  formItemId: string;
  formDescriptionId: string;
  formErrorId: string;
};

const FormFieldContext = createContext<FormFieldContextType | null>(null);

type FormFieldProps = {
  name: string;
  fieldStateMeta: FormFieldContextType["fieldStateMeta"];
} & ComponentProps<typeof Field>;

/**
 * Simple wrapper around the Field component that provides a context for the form item.
 * This is used to avoid passing the same props to the Field component multiple times.
 */
function FormField({ name, fieldStateMeta, ...props }: FormFieldProps) {
  const id = useId();

  const isInvalid = fieldStateMeta.isTouched && !fieldStateMeta.isValid;

  return (
    <FormFieldContext
      value={{
        formItemId: `${id}-item`,
        formDescriptionId: `${id}-description`,
        formErrorId: `${id}-error`,
        isInvalid,
        name,
        fieldStateMeta,
      }}
    >
      <Field data-invalid={isInvalid} {...props} />
    </FormFieldContext>
  );
}

function useFormFieldContext() {
  const context = useContext(FormFieldContext);
  if (!context)
    throw new Error(
      "useFormFieldContext must be used within a FormField Context",
    );
  return context;
}

function FormFieldLabel(props: ComponentProps<typeof FieldLabel>) {
  const { formItemId, isInvalid } = useFormFieldContext();
  return (
    <FieldLabel aria-invalid={isInvalid} htmlFor={formItemId} {...props} />
  );
}

function FormFieldError(props: ComponentProps<typeof FieldError>) {
  const { fieldStateMeta, formErrorId } = useFormFieldContext();
  return (
    <FieldError id={formErrorId} errors={fieldStateMeta.errors} {...props} />
  );
}

function FormFieldControl({ ...props }: ComponentProps<typeof Slot>) {
  const { isInvalid, formItemId, formDescriptionId, formErrorId } =
    useFormFieldContext();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        isInvalid
          ? `${formDescriptionId} ${formErrorId}`
          : `${formDescriptionId}`
      }
      aria-invalid={isInvalid}
      {...props}
    />
  );
}

function FormFieldDescription(props: ComponentProps<typeof FieldDescription>) {
  const { formDescriptionId } = useFormFieldContext();
  return <FieldDescription id={formDescriptionId} {...props} />;
}

export {
  FormField,
  FormFieldLabel,
  FormFieldError,
  FormFieldControl,
  FormFieldDescription,
};
