import type { AnyFieldApi } from "@tanstack/react-form";

export function isFieldInvalid(field: AnyFieldApi) {
  return field.state.meta.isTouched && !field.state.meta.isValid;
}
