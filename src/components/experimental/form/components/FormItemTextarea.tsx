import { Textarea } from "@/components/ui/textarea";
import type { ComponentProps } from "react";

import { useFormItemContext } from "../FormItem";

export default function FormItemTextarea(
  props: ComponentProps<typeof Textarea>,
) {
  const { field, formControlProps } = useFormItemContext();

  return (
    <Textarea
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...formControlProps}
      {...props}
    />
  );
}
