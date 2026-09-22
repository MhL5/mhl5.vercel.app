"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { AppFieldTextarea } from "@/registry/new-york/form/fieldComponents/AppFieldTextarea";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const maxLength = 200;

const schema = z.object({
  bio: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters")
    .max(maxLength, `Max ${maxLength} characters`),
});

export default function TextareaExample() {
  const form = useAppForm({
    defaultValues: { bio: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="bio">
            {(field) => (
              <AppField>
                <AppFieldLabel>Bio</AppFieldLabel>
                <AppFieldTextarea
                  rows={4}
                  placeholder="Tell us a bit about yourself..."
                />
                <AppFieldDescription className="flex justify-between">
                  <span>Shown on your public profile.</span>
                  <span className="tabular-nums">
                    {field.state.value.length}/{maxLength}
                  </span>
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
