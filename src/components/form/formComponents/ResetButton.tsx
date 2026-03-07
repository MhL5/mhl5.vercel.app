import { Button } from "@/components/ui/button";
import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";

import { useFormContext } from "../appForm";

export default function ResetButton({
  disabled,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Button
      disabled={isSubmitting || disabled}
      type="button"
      variant="outline"
      onClick={(e) => {
        onClick?.(e);
        form.reset();
      }}
      {...props}
    />
  );
}
