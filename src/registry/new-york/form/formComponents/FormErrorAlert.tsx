import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldError } from "@/components/ui/field";
import { useStore } from "@tanstack/react-form-nextjs";
import { AlertTriangleIcon } from "lucide-react";
import z from "zod";

import { useFormContext } from "../appForm";

const schema = z.object({
  errors: z
    .array(
      z
        .object({
          message: z.string().trim().min(1),
        })
        .optional(),
    )
    .min(1),
});

function FormErrorAlert() {
  const form = useFormContext();
  const onSubmitErrorMap = useStore(
    form.store,
    (state) => state.errorMap.onSubmit,
  );

  const result = schema.safeParse(onSubmitErrorMap);

  if (!result.success) return;

  const errors = result.data.errors.filter(
    (error): error is { message: string } => Boolean(error?.message),
  );

  if (errors.length === 0) return null;

  return (
    <Alert variant="error">
      <AlertTriangleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-1">
        <FieldError role={undefined} className="text-current" errors={errors} />
      </AlertDescription>
    </Alert>
  );
}

export { FormErrorAlert };
