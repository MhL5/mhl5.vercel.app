import { Input } from "@/components/ui/input";
import type { ComponentProps } from "react";

import { useFormItemContext } from "../FormItem";

export default function FormItemInput(props: ComponentProps<typeof Input>) {
  const { field, formControlProps } = useFormItemContext();

  return (
    <Input
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...formControlProps}
      {...props}
    />
  );
}
