"use client";

import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { useAppForm, withFieldGroup } from "@/registry/new-york/form/appForm";
import { ExampleForm } from "@/registry/new-york/form/examples/components/ExampleForm";
import { showSubmittedValues } from "@/registry/new-york/form/examples/utils/showSubmittedValues";
import { AppField } from "@/registry/new-york/form/fieldComponents/AppField";
import { AppFieldError } from "@/registry/new-york/form/fieldComponents/AppFieldError";
import { AppFieldInput } from "@/registry/new-york/form/fieldComponents/AppFieldInput";
import { AppFieldLabel } from "@/registry/new-york/form/fieldComponents/AppFieldLabel";
import { SubmitButton } from "@/registry/new-york/form/formComponents/SubmitButton";
import { focusOnFirstInvalidInput } from "@/registry/new-york/form/utils/focusOnFirstInvalidInput";
import { revalidateLogic } from "@tanstack/react-form-nextjs";
import z from "zod";

const addressSchema = z.object({
  street: z.string().trim().min(1, "Street is required"),
  city: z.string().trim().min(1, "City is required"),
  zip: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Enter a 5-digit ZIP code"),
});

const addressDefaultValues: z.infer<typeof addressSchema> = {
  street: "",
  city: "",
  zip: "",
};

/**
 * A reusable group of fields. `group.AppField` names are relative to the
 * group, the parent decides where the group lives with the `fields` prop.
 */
const AddressFields = withFieldGroup({
  defaultValues: addressDefaultValues,
  props: { legend: "" },
  render: function AddressFieldsRender({ group, legend }) {
    return (
      <FieldSet>
        <FieldLegend>{legend}</FieldLegend>
        <FieldGroup>
          <group.AppField name="street">
            {() => (
              <AppField>
                <AppFieldLabel>Street</AppFieldLabel>
                <AppFieldInput autoComplete="street-address" />
                <AppFieldError />
              </AppField>
            )}
          </group.AppField>

          <div className="grid grid-cols-[1fr_8rem] gap-4">
            <group.AppField name="city">
              {() => (
                <AppField>
                  <AppFieldLabel>City</AppFieldLabel>
                  <AppFieldInput autoComplete="address-level2" />
                  <AppFieldError />
                </AppField>
              )}
            </group.AppField>

            <group.AppField name="zip">
              {() => (
                <AppField>
                  <AppFieldLabel>ZIP</AppFieldLabel>
                  <AppFieldInput
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                  <AppFieldError />
                </AppField>
              )}
            </group.AppField>
          </div>
        </FieldGroup>
      </FieldSet>
    );
  },
});

const schema = z.object({
  shipping: addressSchema,
  billing: addressSchema,
});

export default function FieldGroupExample() {
  const form = useAppForm({
    defaultValues: {
      shipping: addressDefaultValues,
      billing: addressDefaultValues,
    },
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmit: showSubmittedValues,
    onSubmitInvalid: focusOnFirstInvalidInput,
  });

  return (
    <ExampleForm form={form}>
      <form.AppForm>
        <FieldGroup>
          <AddressFields
            form={form}
            fields="shipping"
            legend="Shipping address"
          />
          <AddressFields
            form={form}
            fields="billing"
            legend="Billing address"
          />
        </FieldGroup>

        <SubmitButton>Submit</SubmitButton>
      </form.AppForm>
    </ExampleForm>
  );
}
