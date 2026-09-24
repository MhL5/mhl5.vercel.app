import { tryCatch } from "@/registry/utils/tryCatch/tryCatch";
import { cn } from "cn";
import type { ComponentProps, ComponentType, ReactNode } from "react";
import { toast } from "sonner";

import { FormErrorAlert } from "./FormErrorAlert";

type AppFormProps = {
  /**
   * Only the three members below are used. They are declared structurally
   * rather than as `AnyFormApi`: that alias narrows every field name to
   * `never`, so a form holding an array field is not assignable to it.
   */
  form: {
    handleSubmit(): Promise<void>;
    /** `unknown`: the real signature narrows `onServer` per declared validator. */
    setErrorMap(errorMap: unknown): void;
    AppForm: ComponentType<{ children?: ReactNode }>;
  };
} & ComponentProps<"form">;

function AppForm({
  children,
  form,
  onSubmit,
  className,
  ...props
}: AppFormProps) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit?.(e);

        await tryCatch(form.handleSubmit(), {
          onError: (error) => {
            const message = (error as Error)?.message?.trim() || null;
            if (!message) return;

            form.setErrorMap({
              onServer: {
                form: [{ message }],
              },
            });
            toast.error(message);
          },
        });
      }}
      className={cn("space-y-3", className)}
      {...props}
    >
      <form.AppForm>
        <FormErrorAlert />
        {children}
      </form.AppForm>
    </form>
  );
}

export { AppForm };
