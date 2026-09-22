import { toast } from "sonner";

/**
 * Stand-in for a real request: waits long enough for the submitting state to
 * be visible, then shows the submitted values in a toast.
 *
 * @example
 * useAppForm({ defaultValues, onSubmit: showSubmittedValues });
 */
async function showSubmittedValues({ value }: { value: unknown }) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  toast.success("Submitted!", {
    description: (
      <pre className="mt-2 w-full overflow-x-auto rounded bg-muted p-2 text-xs">
        {JSON.stringify(value, null, 2)}
      </pre>
    ),
  });
}

export { showSubmittedValues };
