import { FieldDescription } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useAppField } from "../appForm";

export default function AppFieldDescription(
  props: ComponentProps<typeof FieldDescription>,
) {
  const { fieldDescriptionId } = useAppField();
  return <FieldDescription id={fieldDescriptionId} {...props} />;
}
