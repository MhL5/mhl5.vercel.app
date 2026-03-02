import { Field } from "@/components/ui/field";
import { type ComponentProps } from "react";

import { useAppField } from "../appForm";

export default function AppField({ ...props }: ComponentProps<typeof Field>) {
  const { isInvalid } = useAppField();
  return <Field data-invalid={isInvalid} {...props} />;
}
