import { LoadingButton } from "@/components/buttons/LoadingButton";
import { Button } from "@/components/ui/button";
import { useStore } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";

import { useFormContext } from "../appForm";

export default function SubmitButton({
  disabled,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <LoadingButton
      form={form.formId}
      disabled={isSubmitting || disabled}
      {...props}
    />
  );
}
