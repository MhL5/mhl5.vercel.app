import type { AnyFieldApi } from "@tanstack/react-form-nextjs";

type GenerateFieldPropsOptions = {
  fieldItemIdSuffix?: string | number;
};

/**
 * Generates accessible ids and control props for a form field.
 */
function generateFieldProps(
  field: AnyFieldApi,
  { fieldItemIdSuffix = "" }: GenerateFieldPropsOptions = {},
) {
  "use no memo";
  // why "use no memo"? tanstack form returns stable references and with react compiler it can break the updates

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // base unique id for each field
  const baseId = `${field.form.formId}-${field.name}`;

  const fieldControllerId = fieldItemIdSuffix
    ? `${baseId}-item-${fieldItemIdSuffix}`
    : `${baseId}-controller`;

  const fieldDescriptionId = `${baseId}-description`;
  const fieldErrorId = `${baseId}-error`;

  const fieldItemDescriptionId = fieldItemIdSuffix
    ? `${baseId}-item-${fieldItemIdSuffix}-description`
    : ``;

  const fieldItemErrorId = fieldItemIdSuffix
    ? `${baseId}-item-${fieldItemIdSuffix}-error`
    : ``;

  const fieldControllerProps = {
    id: fieldControllerId,
    "aria-describedby": joinIds(
      fieldDescriptionId,
      fieldItemDescriptionId,
      isInvalid ? fieldErrorId : "",
      isInvalid ? fieldItemErrorId : "",
    ),
    "aria-invalid": isInvalid,
  };

  return {
    /** Props to spread on the form control element (id, aria-describedby, aria-invalid) */
    fieldControllerProps,
    /** id for the field description element */
    fieldDescriptionId,
    /** id for the field error message element */
    fieldErrorId,
    /** id for the field item error message element */
    fieldItemErrorId,
    /** id for the field item description element */
    fieldItemDescriptionId,
    /** Whether the field has been touched and contains validation errors */
    isInvalid,
  };
}

function joinIds(...ids: string[]) {
  return ids.filter(Boolean).join(" ");
}

export { generateFieldProps, type GenerateFieldPropsOptions };
