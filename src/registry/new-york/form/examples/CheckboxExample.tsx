"use client";

import { FieldContent, FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldCheckbox } from "@/registry/new-york/form/fieldComponents/AppFieldCheckbox";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const schema = z.object({
  newsletter: z.boolean(),
  terms: z.boolean().refine(Boolean, "You have to accept the terms"),
});

export default function CheckboxExample() {
  const form = useAppForm({
    defaultValues: { newsletter: false, terms: false },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="newsletter">
            {() => (
              <AppField orientation="horizontal">
                <AppFieldCheckbox />
                <FieldContent>
                  <AppFieldLabel>Subscribe to the newsletter</AppFieldLabel>
                  <AppFieldDescription>
                    Product updates, once a month. No spam.
                  </AppFieldDescription>
                </FieldContent>
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="terms">
            {() => (
              <AppField orientation="horizontal">
                <AppFieldCheckbox />
                <FieldContent>
                  <AppFieldLabel>I agree to the terms of service</AppFieldLabel>
                  <AppFieldError />
                </FieldContent>
              </AppField>
            )}
          </form.AppField>
        </FieldGroup>

        <SubmitButton>Submit</SubmitButton>
      </form.AppForm>
    </ExampleForm>
  );
}
