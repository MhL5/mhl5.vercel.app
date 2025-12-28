import { Input } from "@/components/ui/input";
import {
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import type { ComponentProps } from "react";

import { useFormItemContext } from "../FormItem";

export function FormItemInputGroupInput(props: ComponentProps<typeof Input>) {
  const { field, formControlProps } = useFormItemContext();

  return (
    <InputGroupInput
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...formControlProps}
      {...props}
    />
  );
}

export function FormItemInputGroupTextarea(
  props: ComponentProps<typeof InputGroupTextarea>,
) {
  const { field, formControlProps } = useFormItemContext();

  return (
    <InputGroupTextarea
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      {...formControlProps}
      {...props}
    />
  );
}
