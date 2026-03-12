import {
  useAppField,
  useFieldContext,
  useFormContext,
} from "@/components/form/appForm";
import { DropZone } from "@/components/upload/components/DropZone";
import { cn } from "@/lib/utils";
import type { RequiredPick } from "@/registry/types/RequiredPick/RequiredPick";
import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";

export function AppFieldDropzone({
  className,
  onDropAccepted,
  disabled = false,
  "aria-invalid": ariaInvalid = false,
  ...props
}: RequiredPick<
  Partial<Omit<ComponentProps<typeof DropZone>, "inputProps">>,
  "onDropAccepted"
>) {
  const { isInvalid, fieldControllerProps } = useAppField();
  const field = useFieldContext<string[]>();
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <DropZone
      multiple
      accept="image/*"
      onDropAccepted={onDropAccepted}
      onDropRejected={(errors) => {
        field.setErrorMap({ onChange: errors });
        field.handleBlur();
      }}
      disabled={isSubmitting || disabled}
      aria-invalid={isInvalid || ariaInvalid}
      className={cn("w-full", className)}
      {...props}
      inputProps={fieldControllerProps}
    />
  );
}
