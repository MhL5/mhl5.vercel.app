"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldInputNumber } from "@/registry/new-york/form/fieldComponents/AppFieldInputNumber";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

// an empty input is stored as `null`, so the schema has to allow it
// and produce the "required" message from it
const schema = z.object({
  age: z
    .number({ error: "Age is required" })
    .int("Whole years only")
    .min(18, "You must be 18+")
    .max(100, "Max age is 100")
    .nullable()
    .refine((age) => age !== null, "Age is required"),
  seats: z.number({ error: "Enter a number" }).min(1, "At least one seat"),
});

export default function InputNumberExample() {
  const form = useAppForm({
    defaultValues: { age: null as number | null, seats: 1 as number | null },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="age">
            {(field) => (
              <AppField>
                <AppFieldLabel>Age</AppFieldLabel>
                <AppFieldInputNumber placeholder="27" />
                <AppFieldDescription>
                  Stored as <code>{JSON.stringify(field.state.value)}</code>
                </AppFieldDescription>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="seats">
            {() => (
              <AppField>
                <AppFieldLabel>Seats</AppFieldLabel>
                <AppFieldInputNumber min={1} step={1} />
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
