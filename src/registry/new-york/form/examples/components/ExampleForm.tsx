import { cn } from "cn";
import type { ComponentProps } from "react";

type ExampleFormProps = Omit<ComponentProps<"form">, "onSubmit"> & {
  /** any `useAppForm()` result, only `handleSubmit` is needed */
  form: { handleSubmit: () => Promise<void> };
};

/**
 * The `<form>` shell every example shares: disables native validation so
 * TanStack Form owns the errors, and routes submit to `form.handleSubmit()`.
 *
 * @example
 * <ExampleForm form={form}>
 *   <form.AppForm>...</form.AppForm>
 * </ExampleForm>
 */
function ExampleForm({ form, className, ...props }: ExampleFormProps) {
  return (
    <form
      noValidate
      className={cn("mx-auto flex w-full max-w-md flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    />
  );
}

export { ExampleForm };
