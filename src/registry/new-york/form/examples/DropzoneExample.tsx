"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldDescription } from "@/registry/new-york/form/fieldComponents/AppFieldDescription";
import { AppFieldDropzone } from "@/registry/new-york/form/fieldComponents/AppFieldDropzone";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import { XIcon } from "lucide-react";
import z from "zod";

const maxSizeInBytes = 2 * 1024 * 1024;

const schema = z.object({
  photos: z
    .array(z.string())
    .min(1, "Add at least one photo")
    .max(3, "Max 3 photos"),
});

export default function DropzoneExample() {
  const form = useAppForm({
    defaultValues: { photos: [] as string[] },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="photos">
            {(field) => (
              <AppField>
                <AppFieldLabel>Photos</AppFieldLabel>
                <AppFieldDropzone
                  maxSizeInBytes={maxSizeInBytes}
                  onDropAccepted={(files) => {
                    // demo: keep the file names, a real form would upload
                    // here and store the returned urls
                    const names = files.map((file) => file.name);
                    field.handleChange([...field.state.value, ...names]);
                  }}
                />
                <AppFieldDescription>
                  Images only, up to 2MB each. Drop a PDF to see a rejection.
                </AppFieldDescription>
                <AppFieldError />

                {field.state.value.length > 0 && (
                  <ul className="flex flex-col gap-1 text-sm">
                    {field.state.value.map((name) => (
                      <li
                        key={name}
                        className="flex items-center justify-between gap-2 rounded-md border px-3 py-1.5"
                      >
                        <span className="truncate">{name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Remove ${name}`}
                          onClick={() =>
                            field.handleChange(
                              field.state.value.filter((n) => n !== name),
                            )
                          }
                        >
                          <XIcon />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </AppField>
            )}
          </form.AppField>
        </FieldGroup>

        <SubmitButton>Submit</SubmitButton>
      </form.AppForm>
    </ExampleForm>
  );
}
