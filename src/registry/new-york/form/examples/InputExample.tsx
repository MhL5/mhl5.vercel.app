"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldInput } from "@/registry/new-york/form/fieldComponents/AppFieldInput";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name needs at least 2 characters"),
  email: z.email("Enter a valid email"),
});

export default function InputExample() {
  const form = useAppForm({
    defaultValues: { fullName: "", email: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="fullName">
            {() => (
              <AppField>
                <AppFieldLabel>Full name</AppFieldLabel>
                <AppFieldInput placeholder="Ada Lovelace" />
                <AppFieldDescription>
                  Your display name on the site.
                </AppFieldDescription>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="email">
            {() => (
              <AppField>
                <AppFieldLabel>Email</AppFieldLabel>
                <AppFieldInput type="email" placeholder="ada@example.com" />
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
