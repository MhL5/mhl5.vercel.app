import { getFieldIds } from "@/components/form/utils/getFieldIds";
import { isFieldInvalid } from "@/components/form/utils/isFieldInvalid";
import type { AnyFieldApi } from "@tanstack/react-form";

export function getFieldControllerProps(field: AnyFieldApi) {
  const { fieldControllerId, fieldDescriptionId, fieldErrorId } =
    getFieldIds(field);
  const isInvalid = isFieldInvalid(field);

  return {
    id: fieldControllerId,
    "aria-describedby": `${fieldDescriptionId}${isInvalid ? ` ${fieldErrorId}` : ``}`,
    "aria-invalid": isInvalid,
  };
}
