import { Button } from "@/components/ui/button";
import { useStore } from "@tanstack/react-form-nextjs";
import type { ComponentProps } from "react";

import { useFormContext } from "../appForm";

/**
 * A wrapper around the base `Button` component that automatically
 * disables itself while the form is submitting.
 *
 * The button will be disabled when:
 * - the form is currently submitting
 * - the `disabled` prop is explicitly provided
 *
 */
function FormActionButton({
  disabled,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <Button type="button" disabled={isSubmitting || disabled} {...props} />
  );
}

export { FormActionButton };
