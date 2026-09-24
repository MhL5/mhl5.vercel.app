"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  useAppForm,
  useFieldContext,
  useFormContext,
} from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { useGenerateFieldProps } from "@/registry/new-york/form/hooks/useGenerateFieldProps";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic, useSelector } from "@tanstack/react-form-nextjs";
import { cn } from "cn";
import { StarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import z from "zod";

type AppFieldRatingProps = Omit<ComponentProps<"div">, "children"> & {
  max?: number;
};

/**
 * A field control from scratch. The three hooks do all the wiring:
 * - `useFieldContext`      value, `handleChange`, `handleBlur`
 * - `useGenerateFieldProps` `id`, `aria-describedby`, `aria-invalid`
 * - `useFormContext`       disable while the form submits
 */
function AppFieldRating({ max = 5, className, ...props }: AppFieldRatingProps) {
  const field = useFieldContext<number>();
  const { fieldControllerProps, isInvalid } = useGenerateFieldProps();
  const form = useFormContext();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <div
      role="radiogroup"
      tabIndex={-1}
      onBlur={field.handleBlur}
      className={cn("flex gap-1", className)}
      {...fieldControllerProps}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const value = index + 1;
        const isChecked = field.state.value === value;
        const isFilled = field.state.value >= value;

        return (
          <Button
            key={value}
            type="button"
            role="radio"
            variant="ghost"
            size="icon"
            aria-checked={isChecked}
            aria-label={`${value} of ${max}`}
            aria-invalid={isInvalid}
            disabled={isSubmitting}
            onClick={() => field.handleChange(value)}
          >
            <StarIcon
              className={cn(
                "size-5",
                isFilled && "fill-current",
                isInvalid && "text-destructive",
              )}
            />
          </Button>
        );
      })}
    </div>
  );
}

const schema = z.object({
  rating: z.number().min(1, "Pick a rating"),
});

export default function CustomControlExample() {
  const form = useAppForm({
    defaultValues: { rating: 0 },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="rating">
            {(field) => (
              <AppField>
                <AppFieldLabel>How was it?</AppFieldLabel>
                <AppFieldRating />
                <AppFieldDescription>
                  {field.state.value > 0
                    ? `${field.state.value} out of 5`
                    : "Click a star"}
                </AppFieldDescription>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>
        </FieldGroup>

        <SubmitButton>Submit</SubmitButton>
      </form.AppForm>
    </ExampleForm>
  );
}
