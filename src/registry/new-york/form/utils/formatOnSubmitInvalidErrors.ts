import { toSentenceCase } from "@/registry/utils/formatters/formatters";
import { type AnyFormApi } from "@tanstack/react-form-nextjs";

const FALLBACK_MESSAGE =
  "Please check the fields marked in red and correct any errors before submitting again.";

/** Errors can be strings, `Error`s, or `{ message }` objects depending on the validator. */
function toMessage(error: unknown): string {
  if (typeof error === "string") return error.trim();

  if (error && typeof error === "object" && "message" in error) {
    const { message } = error as { message: unknown };
    return typeof message === "string" ? message.trim() : "";
  }

  return "";
}

function formatOnSubmitInvalidErrors(
  fields: ReturnType<AnyFormApi["getAllErrors"]>["fields"],
) {
  const errors = Object.keys(fields ?? {}).flatMap((fieldName) =>
    (fields?.[fieldName]?.errors ?? []).reduce<
      { field: string; message: string }[]
    >((acc, error) => {
      const message = toMessage(error);
      if (message) acc.push({ field: fieldName, message });

      return acc;
    }, []),
  );

  const firstError = errors[0];
  if (!firstError) return FALLBACK_MESSAGE;

  const remainingCount = errors.length - 1;
  const remaining = remainingCount > 0 ? ` +${remainingCount} more` : "";

  return `${toSentenceCase(firstError.field)}: ${firstError.message}${remaining}`;
}

export { formatOnSubmitInvalidErrors };
