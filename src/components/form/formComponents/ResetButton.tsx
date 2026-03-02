import { useFormContext } from "@/components/form/appForm";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

export default function ResetButton({
  disabled,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
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
      )}
    </form.Subscribe>
  );
}
