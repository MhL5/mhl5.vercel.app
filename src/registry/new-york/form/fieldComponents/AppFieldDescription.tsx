import { FieldDescription } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppFieldDescription(props: ComponentProps<typeof FieldDescription>) {
  const { fieldDescriptionId } = useGenerateFieldProps();

  return <FieldDescription id={fieldDescriptionId} {...props} />;
}

export { AppFieldDescription };
