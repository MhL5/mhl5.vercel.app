"use client";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import {
  AppFieldSelect,
  AppFieldSelectContent,
  AppFieldSelectGroup,
  AppFieldSelectItem,
  AppFieldSelectLabel,
  AppFieldSelectSeparator,
  AppFieldSelectTrigger,
  AppFieldSelectValue,
} from "@/registry/new-york/form/fieldComponents/AppFieldSelect";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const roleGroups = [
  {
    label: "Engineering",
    options: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
    ],
  },
  {
    label: "Design",
    options: [
      { value: "design", label: "Designer" },
      { value: "product", label: "Product" },
    ],
  },
];

const schema = z.object({
  role: z.string().min(1, "Pick a role"),
  timezone: z.string().min(1, "Pick a timezone"),
});

export default function SelectExample() {
  const form = useAppForm({
    defaultValues: { role: "", timezone: "utc" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="role">
            {() => (
              <AppField>
                <AppFieldLabel>Role</AppFieldLabel>
                <AppFieldSelect>
                  <AppFieldSelectTrigger>
                    <AppFieldSelectValue placeholder="Select a role" />
                  </AppFieldSelectTrigger>
                  <AppFieldSelectContent>
                    {roleGroups.map((group, index) => (
                      <AppFieldSelectGroup key={group.label}>
                        {index > 0 && <AppFieldSelectSeparator />}
                        <AppFieldSelectLabel>{group.label}</AppFieldSelectLabel>
                        {group.options.map((option) => (
                          <AppFieldSelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </AppFieldSelectItem>
                        ))}
                      </AppFieldSelectGroup>
                    ))}
                  </AppFieldSelectContent>
                </AppFieldSelect>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="timezone">
            {() => (
              <AppField>
                <AppFieldLabel>Timezone</AppFieldLabel>
                <AppFieldSelect>
                  <AppFieldSelectTrigger className="w-full">
                    <AppFieldSelectValue />
                  </AppFieldSelectTrigger>
                  <AppFieldSelectContent>
                    <AppFieldSelectItem value="utc">UTC</AppFieldSelectItem>
                    <AppFieldSelectItem value="cet">CET</AppFieldSelectItem>
                    <AppFieldSelectItem value="est">EST</AppFieldSelectItem>
                  </AppFieldSelectContent>
                </AppFieldSelect>
                <AppFieldDescription>
                  Pre-selected through <code>defaultValues</code>.
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
