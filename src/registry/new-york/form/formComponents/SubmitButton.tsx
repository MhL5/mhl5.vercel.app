import { Button } from "@/components/ui/button";
import { useStore } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";

import { useFormContext } from "../appForm";

function SubmitButton({ disabled, ...props }: ComponentProps<typeof Button>) {
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Button type="submit" disabled={isSubmitting || disabled} {...props} />
  );
}

export { SubmitButton };
