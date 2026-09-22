"use client";

import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldCheckbox } from "@/registry/new-york/form/fieldComponents/AppFieldCheckbox";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldDropzone } from "@/registry/new-york/form/fieldComponents/AppFieldDropzone";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldInput } from "@/registry/new-york/form/fieldComponents/AppFieldInput";
import { AppFieldInputGroupInput } from "@/registry/new-york/form/fieldComponents/AppFieldInputGroupInput";
import { AppFieldInputNumber } from "@/registry/new-york/form/fieldComponents/AppFieldInputNumber";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import {
  AppFieldMultiSelect,
  AppFieldMultiSelectContent,
  AppFieldMultiSelectGroup,
  AppFieldMultiSelectItem,
  AppFieldMultiSelectTrigger,
  AppFieldMultiSelectValue,
} from "@/registry/new-york/form/fieldComponents/AppFieldMultiSelect";
import {
  AppFieldRadioGroup,
  AppFieldRadioGroupItem,
  AppFieldRadioGroupItemDescription,
  AppFieldRadioGroupItemLabel,
  AppFieldRadioGroupItemProvider,
} from "@/registry/new-york/form/fieldComponents/AppFieldRadioGroup";
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
import { AppFieldTextarea } from "@/registry/new-york/form/fieldComponents/AppFieldTextarea";
import { FormActionButton } from "@/registry/new-york/form/formComponents/FormActionButton";
import { FormErrorAlert } from "@/registry/new-york/form/formComponents/FormErrorAlert";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import { AtSignIcon } from "lucide-react";
import z from "zod";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name needs at least 2 characters"),
  username: z
    .string()
    .trim()
    .min(3, "Username needs at least 3 characters")
    .regex(/^[a-z0-9_]+$/i, "Letters, numbers and underscores only"),
  age: z
    .number({ error: "Age is required" })
    .min(18, "You must be 18+")
    .max(100, "Max age is 100")
    .nullable(),
  bio: z.string().trim().max(200, "Max 200 characters"),
  role: z.string().min(1, "Pick a role"),
  skills: z.array(z.string()).min(1, "Pick at least one skill"),
  experience: z.string().min(1, "Pick an experience level"),
  newsletter: z.boolean(),
  avatar: z.array(z.string()),
});

const defaultValues: z.infer<typeof schema> = {
  fullName: "",
  username: "",
  age: null,
  bio: "",
  role: "",
  skills: [],
  experience: "",
  newsletter: false,
  avatar: [],
};

const experienceOptions = [
  { value: "junior", label: "Junior", description: "0–2 years" },
  { value: "mid", label: "Mid-level", description: "2–5 years" },
  { value: "senior", label: "Senior", description: "5+ years" },
];

export default function FullFormExample() {
  const form = useAppForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form} className="max-w-xl py-10">
      <form.AppForm>
        <FormErrorAlert />

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

          <form.AppField name="age">
            {() => (
              <AppField>
                <AppFieldLabel>Age</AppFieldLabel>
                <AppFieldInputNumber placeholder="27" />
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="bio">
            {() => (
              <AppField>
                <AppFieldLabel>Bio</AppFieldLabel>
                <AppFieldTextarea
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
                <AppFieldDescription>Max 200 characters.</AppFieldDescription>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="role">
            {() => (
              <AppField>
                <AppFieldLabel>Role</AppFieldLabel>
                <AppFieldSelect>
                  <AppFieldSelectTrigger>
                    <AppFieldSelectValue placeholder="Select a role" />
                  </AppFieldSelectTrigger>
                  <AppFieldSelectContent>
                    <AppFieldSelectGroup>
                      <AppFieldSelectLabel>Engineering</AppFieldSelectLabel>
                      <AppFieldSelectItem value="frontend">
                        Frontend
                      </AppFieldSelectItem>
                      <AppFieldSelectItem value="backend">
                        Backend
                      </AppFieldSelectItem>
                    </AppFieldSelectGroup>
                    <AppFieldSelectSeparator />
                    <AppFieldSelectGroup>
                      <AppFieldSelectLabel>Design</AppFieldSelectLabel>
                      <AppFieldSelectItem value="design">
                        Designer
                      </AppFieldSelectItem>
                      <AppFieldSelectItem value="product">
                        Product
                      </AppFieldSelectItem>
                    </AppFieldSelectGroup>
                  </AppFieldSelectContent>
                </AppFieldSelect>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="skills">
            {() => (
              <AppField>
                <AppFieldLabel>Skills</AppFieldLabel>
                <AppFieldMultiSelect>
                  <AppFieldMultiSelectTrigger>
                    <AppFieldMultiSelectValue placeholder="Pick skills" />
                  </AppFieldMultiSelectTrigger>
                  <AppFieldMultiSelectContent>
                    <AppFieldMultiSelectGroup>
                      <AppFieldMultiSelectItem value="react">
                        React
                      </AppFieldMultiSelectItem>
                      <AppFieldMultiSelectItem value="nextjs">
                        Next.js
                      </AppFieldMultiSelectItem>
                      <AppFieldMultiSelectItem value="typescript">
                        TypeScript
                      </AppFieldMultiSelectItem>
                      <AppFieldMultiSelectItem value="tailwind">
                        Tailwind
                      </AppFieldMultiSelectItem>
                    </AppFieldMultiSelectGroup>
                  </AppFieldMultiSelectContent>
                </AppFieldMultiSelect>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="experience">
            {() => (
              <FieldSet>
                <FieldLegend>Experience</FieldLegend>
                <AppFieldRadioGroup>
                  {experienceOptions.map((option) => (
                    <AppFieldRadioGroupItemProvider
                      key={option.value}
                      radioItemValue={option.value}
                    >
                      <Field orientation="horizontal">
                        <AppFieldRadioGroupItem />
                        <div className="flex flex-col gap-1">
                          <AppFieldRadioGroupItemLabel>
                            {option.label}
                          </AppFieldRadioGroupItemLabel>
                          <AppFieldRadioGroupItemDescription>
                            {option.description}
                          </AppFieldRadioGroupItemDescription>
                        </div>
                      </Field>
                    </AppFieldRadioGroupItemProvider>
                  ))}
                </AppFieldRadioGroup>
                <AppFieldError />
              </FieldSet>
            )}
          </form.AppField>

          <form.AppField name="newsletter">
            {() => (
              <AppField orientation="horizontal">
                <AppFieldCheckbox />
                <div className="flex flex-1 flex-col gap-1">
                  <AppFieldLabel>Subscribe to newsletter</AppFieldLabel>
                  <AppFieldDescription>
                    Get product updates via email.
                  </AppFieldDescription>
                </div>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>

          <form.AppField name="avatar">
            {(field) => (
              <AppField>
                <AppFieldLabel>Avatar</AppFieldLabel>
                <AppFieldDropzone
                  maxSizeInBytes={5 * 1024 * 1024}
                  onDropAccepted={(files) => {
                    // demo: store file names instead of uploading
                    field.handleChange(files.map((file) => file.name));
                  }}
                />
                <AppFieldDescription>
                  Images only, max 5MB.
                  {field.state.value.length > 0
                    ? ` Selected: ${field.state.value.join(", ")}`
                    : null}
                </AppFieldDescription>
                <AppFieldError />
              </AppField>
            )}
          </form.AppField>
        </FieldGroup>

        <div className="flex flex-wrap gap-3">
          <SubmitButton>Submit</SubmitButton>
          <FormActionButton variant="outline" onClick={() => form.reset()}>
            Reset
          </FormActionButton>
        </div>
      </form.AppForm>
    </ExampleForm>
  );
}
