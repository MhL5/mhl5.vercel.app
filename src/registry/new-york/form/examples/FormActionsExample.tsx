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
import { FormActionButton } from "@/registry/new-york/form/formComponents/FormActionButton";
import { FormErrorAlert } from "@/registry/new-york/form/formComponents/FormErrorAlert";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const takenUsernames = ["admin", "root"];

const schema = z.object({
  username: z.string().trim().min(3, "Username needs at least 3 characters"),
});

export default function FormActionsExample() {
  const form = useAppForm({
    defaultValues: { username: "" },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
      // stand-in for a server round trip. Returning `{ errors }` puts the
      // message in `errorMap.onSubmit`, which is what `FormErrorAlert` renders
      onSubmitAsync: async ({ value }) => {
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (!takenUsernames.includes(value.username.toLowerCase())) return;

        return {
          errors: [
            { message: `"${value.username}" is already taken.` },
            { message: "Try adding a number or an underscore." },
          ],
        };
      },
    },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FormErrorAlert />

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
      </form.AppForm>
    </ExampleForm>
  );
}
