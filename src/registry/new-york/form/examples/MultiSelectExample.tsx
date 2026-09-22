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
  AppFieldMultiSelect,
  AppFieldMultiSelectContent,
  AppFieldMultiSelectGroup,
  AppFieldMultiSelectItem,
  AppFieldMultiSelectTrigger,
  AppFieldMultiSelectValue,
} from "@/registry/new-york/form/fieldComponents/AppFieldMultiSelect";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const skillGroups = [
  {
    label: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "nextjs", label: "Next.js" },
      { value: "tailwind", label: "Tailwind" },
    ],
  },
  {
    label: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "postgres", label: "PostgreSQL" },
      { value: "redis", label: "Redis" },
    ],
  },
];

const schema = z.object({
  skills: z
    .array(z.string())
    .min(1, "Pick at least one skill")
    .max(3, "Pick at most 3 skills"),
});

export default function MultiSelectExample() {
  const form = useAppForm({
    defaultValues: { skills: [] as string[] },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="skills">
            {() => (
              <AppField>
                <AppFieldLabel>Skills</AppFieldLabel>
                <AppFieldMultiSelect>
                  <AppFieldMultiSelectTrigger className="w-full">
                    <AppFieldMultiSelectValue placeholder="Pick up to 3 skills" />
                  </AppFieldMultiSelectTrigger>
                  <AppFieldMultiSelectContent
                    search={{ placeholder: "Search skills..." }}
                  >
                    {skillGroups.map((group) => (
                      <AppFieldMultiSelectGroup
                        key={group.label}
                        heading={group.label}
                      >
                        {group.options.map((option) => (
                          <AppFieldMultiSelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </AppFieldMultiSelectItem>
                        ))}
                      </AppFieldMultiSelectGroup>
                    ))}
                  </AppFieldMultiSelectContent>
                </AppFieldMultiSelect>
                <AppFieldDescription>
                  Stored as <code>string[]</code>.
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
