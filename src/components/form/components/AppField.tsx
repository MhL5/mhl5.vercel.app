import { useFieldContext } from "@/components/form/appForm";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { type ComponentProps } from "react";

function useAppField() {
  const field = useFieldContext();
  const uniqueIdPrefix = `${field.form.formId}-${field.name}`;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

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

function AppField({ ...props }: ComponentProps<typeof Field>) {
  const { isInvalid } = useAppField();
  return <Field data-invalid={isInvalid} {...props} />;
}

function AppFieldLabel(props: ComponentProps<typeof FieldLabel>) {
  const { formControlProps, isInvalid } = useAppField();
  return (
    <FieldLabel
      aria-invalid={isInvalid}
      htmlFor={formControlProps.id}
      {...props}
    />
  );
}

function AppFieldError(props: ComponentProps<typeof FieldError>) {
  const { fieldErrorId } = useAppField();
  const field = useFieldContext();
  return (
    <FieldError id={fieldErrorId} errors={field.state.meta.errors} {...props} />
  );
}

function AppFieldDescription(props: ComponentProps<typeof FieldDescription>) {
  const { fieldDescriptionId } = useAppField();
  return <FieldDescription id={fieldDescriptionId} {...props} />;
}

export {
  AppField,
  AppFieldDescription,
  AppFieldError,
  AppFieldLabel,
  useAppField,
};
