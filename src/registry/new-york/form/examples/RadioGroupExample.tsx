"use client";

import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import {
  AppFieldRadioGroup,
  AppFieldRadioGroupItem,
  AppFieldRadioGroupItemDescription,
  AppFieldRadioGroupItemLabel,
  AppFieldRadioGroupItemProvider,
} from "@/registry/new-york/form/fieldComponents/AppFieldRadioGroup";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const plans = [
  { value: "hobby", label: "Hobby", description: "For side projects. Free." },
  { value: "pro", label: "Pro", description: "For small teams. $12 / month." },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "SSO, audit logs and a dedicated support line.",
  },
];

const schema = z.object({
  plan: z.string().min(1, "Pick a plan"),
});

export default function RadioGroupExample() {
  const form = useAppForm({
    defaultValues: { plan: "" },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <form.AppField name="plan">
            {() => (
              <FieldSet>
                <FieldLegend>Plan</FieldLegend>
                <AppFieldRadioGroup>
                  {plans.map((plan) => (
                    <AppFieldRadioGroupItemProvider
                      key={plan.value}
                      radioItemValue={plan.value}
                    >
                      <Field orientation="horizontal">
                        <AppFieldRadioGroupItem />
                        <FieldContent>
                          <AppFieldRadioGroupItemLabel>
                            {plan.label}
                          </AppFieldRadioGroupItemLabel>
                          <AppFieldRadioGroupItemDescription>
                            {plan.description}
                          </AppFieldRadioGroupItemDescription>
                        </FieldContent>
                      </Field>
                    </AppFieldRadioGroupItemProvider>
                  ))}
                </AppFieldRadioGroup>
                <AppFieldError />
              </FieldSet>
            )}
          </form.AppField>
        </FieldGroup>

        <SubmitButton>Submit</SubmitButton>
      </form.AppForm>
    </ExampleForm>
  );
}
