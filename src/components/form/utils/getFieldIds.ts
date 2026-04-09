import type { AnyFieldApi } from "@tanstack/react-form-nextjs";

export function getFieldIds(field: AnyFieldApi) {
  const uniqueIdPrefix = `${field.form.formId}-${field.name}`;

  const fieldControllerId = `${uniqueIdPrefix}-item`;
  const fieldDescriptionId = `${uniqueIdPrefix}-description`;
  const fieldErrorId = `${uniqueIdPrefix}-error`;

  return { fieldControllerId, fieldDescriptionId, fieldErrorId };
}
