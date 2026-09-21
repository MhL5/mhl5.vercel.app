import { Field } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useGenerateFieldProps } from "../hooks/useGenerateFieldProps";

function AppField({ ...props }: ComponentProps<typeof Field>) {
  const { isInvalid } = useGenerateFieldProps();

  return <Field data-invalid={isInvalid} {...props} />;
}

export { AppField };
