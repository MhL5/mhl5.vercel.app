import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldError } from "@/components/ui/field";
import { useSelector } from "@tanstack/react-form-nextjs";
import { AlertTriangleIcon } from "lucide-react";
import z from "zod";

import { useFormContext } from "../appForm";

const schema = z
  .array(
    z
      .object({
        message: z.string().trim().min(1),
      })
      .optional(),
  )
  .min(1);

function FormErrorAlert() {
  const form = useFormContext();
  const onSubmitErrorMapForm = useSelector(
    form.store,
    (state) => state.errorMap.onServer?.form,
  );
  const onSubmitErrorMapFields = useSelector(
    form.store,
    (state) => state.errorMap.onServer?.fields,
  );

  const allErrors = [
    ...(Array.isArray(onSubmitErrorMapForm) ? onSubmitErrorMapForm : []),
    ...(Array.isArray(onSubmitErrorMapFields) ? onSubmitErrorMapFields : []),
  ];

  const result = schema.safeParse(allErrors);

  if (!result.success) return;

  return (
    <Alert variant="destructive">
      <AlertTriangleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-1">
        <FieldError
          role={undefined}
          className="text-current"
          errors={result.data}
        />
      </AlertDescription>
    </Alert>
  );
}

export { FormErrorAlert };
