"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldInput } from "@/registry/new-york/form/fieldComponents/AppFieldInput";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { FormActionButton } from "@/registry/new-york/form/formComponents/FormActionButton";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import z from "zod";

import { AppForm } from "../formComponents/AppForm";

const schema = z.object({
  username: z.string().trim().min(3, "Username needs at least 3 characters"),
});

export default function FormActionsExample() {
  const form = useAppForm({
    defaultValues: { username: "" },
    validators: {
      onSubmit: schema,
    },
    onSubmit: () => {
      throw new Error("can you catch me?");
    },
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <AppForm form={form}>
      <FieldGroup>
        <form.AppField name="username">
          {() => (
            <AppField>
              <AppFieldLabel>Username</AppFieldLabel>
              <AppFieldInput placeholder="ada" autoComplete="off" />
              <AppFieldDescription>
                Try <code>admin</code> to trigger a form-level error.
              </AppFieldDescription>
              <AppFieldError />
            </AppField>
          )}
        </form.AppField>
      </FieldGroup>

      <div className="flex flex-wrap gap-3">
        <SubmitButton>Create account</SubmitButton>
        <FormActionButton variant="outline" onClick={() => form.reset()}>
          Reset
        </FormActionButton>
      </div>
    </AppForm>
  );
}
