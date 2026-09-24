import { DropZone } from "@/components/upload/components/DropZone";
import type { RequiredPick } from "@/registry/types/RequiredPick/RequiredPick";
import { useSelector } from "@tanstack/react-form-nextjs";
import { cn } from "cn";
import type { ComponentProps } from "react";

import { useFieldContext, useFormContext } from "../appForm";
import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

type AppFieldDropzoneProps = RequiredPick<
  Partial<Omit<ComponentProps<typeof DropZone>, "inputProps">>,
  "onDropAccepted"
>;

function AppFieldDropzone({
  className,
  onDropAccepted,
  disabled = false,
  "aria-invalid": ariaInvalid = false,
  ...props
}: AppFieldDropzoneProps) {
  const { isInvalid, fieldControllerProps } = useGenerateFieldProps();
  const field = useFieldContext<string[]>();
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <DropZone
      multiple
      accept="image/*"
      onDropAccepted={onDropAccepted}
      onDropRejected={(errors) => {
        field.setErrorMap({ onChange: errors });
        /** without calling handleBlur the component remains valid */
        field.handleBlur();
      }}
      disabled={isSubmitting || disabled}
      aria-invalid={isInvalid || ariaInvalid}
      className={cn("w-full", className)}
      inputProps={fieldControllerProps}
      {...props}
    />
  );
}

export { AppFieldDropzone };
