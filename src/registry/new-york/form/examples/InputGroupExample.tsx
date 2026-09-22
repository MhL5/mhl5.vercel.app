"use client";

import { FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldInputGroupInput } from "@/registry/new-york/form/fieldComponents/AppFieldInputGroupInput";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import { AtSignIcon } from "lucide-react";
import z from "zod";

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username needs at least 3 characters")
    .regex(/^[a-z0-9_]+$/i, "Letters, numbers and underscores only"),
  website: z
    .string()
    .trim()
    .min(1, "Enter your domain")
    .regex(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i, "Enter a domain like example.com"),
});

export default function InputGroupExample() {
  const form = useAppForm({
    defaultValues: { username: "", website: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="username">
            {() => (
              <AppField>
                <AppFieldLabel>Username</AppFieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <AtSignIcon />
                  </InputGroupAddon>
                  <AppFieldInputGroupInput placeholder="ada" />
                </InputGroup>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="website">
            {() => (
              <AppField>
                <AppFieldLabel>Website</AppFieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                  <AppFieldInputGroupInput placeholder="example.com" />
                </InputGroup>
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
