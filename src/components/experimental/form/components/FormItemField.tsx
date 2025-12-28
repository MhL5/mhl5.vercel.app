import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { ComponentProps } from "react";

import { useFormItemContext } from "../FormItem";

function FormItemLabel(props: ComponentProps<typeof FieldLabel>) {
  const { formItemId, isInvalid } = useFormItemContext();
  return (
    <FieldLabel aria-invalid={isInvalid} htmlFor={formItemId} {...props} />
  );
}

function FormItemError(props: ComponentProps<typeof FieldError>) {
  const { fieldStateMeta, formErrorId } = useFormItemContext();
  return (
    <FieldError id={formErrorId} errors={fieldStateMeta.errors} {...props} />
  );
}

function FormItemDescription(props: ComponentProps<typeof FieldDescription>) {
  const { formDescriptionId } = useFormItemContext();
  return <FieldDescription id={formDescriptionId} {...props} />;
}

export { FormItemLabel, FormItemError, FormItemDescription };
