import { LoadingButton } from "@/components/buttons/LoadingButton";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

import { useFormContext } from "../appForm";

export default function SubmitButton({
  disabled,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <LoadingButton
          form={form.formId}
          disabled={isSubmitting || disabled}
          {...props}
        />
      )}
    </form.Subscribe>
  );
}
