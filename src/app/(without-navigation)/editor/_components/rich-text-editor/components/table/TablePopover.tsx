import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TableIcon } from "lucide-react";
import { type SubmitEvent, useId, useState } from "react";

import { useCurrentEditor } from "../../hooks/useCurrentEditor";
import {
  EditorPopover,
  EditorPopoverContent,
  EditorPopoverTrigger,
} from "../ui/EditorPopover";
import { ToolbarButton } from "../ui/ToolbarButton";

export function TablePopover() {
  return (
    <EditorPopover>
      <EditorPopoverTrigger asChild>
        <ToolbarButton
          isActive={false}
          tooltipContent={null}
          title="Insert table"
        >
          <TableIcon />
        </ToolbarButton>
      </EditorPopoverTrigger>

      <EditorPopoverContent className="w-fit p-3">
        <TablePopoverContent />
      </EditorPopoverContent>
    </EditorPopover>
  );
}

const MIN_ROWS = 1;
const MAX_ROWS = 20;
const MIN_COLS = 1;
const MAX_COLS = 10;
const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

function TablePopoverContent() {
  const { editor } = useCurrentEditor();
  const [error, setError] = useState("");

  const rowInputId = useId();
  const colInputId = useId();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rowsFormData = formData.get("rows");
    const colsFormData = formData.get("cols");

    if (!rowsFormData || !colsFormData)
      return setError("Invalid rows or columns");

    const rows = +rowsFormData;
    const cols = +colsFormData;

    if (isNaN(rows) || isNaN(cols)) return setError("Invalid rows or columns");

    const r = Math.min(MAX_ROWS, Math.max(MIN_ROWS, +rows));
    const c = Math.min(MAX_COLS, Math.max(MIN_COLS, +cols));

    if (!editor.can().insertTable({ rows: r, cols: c }))
      return setError("Cannot insert table here");

    setError("");

    editor
      .chain()
      .focus()
      .insertTable({ rows: r, cols: c, withHeaderRow: true })
      .run();
  }

  const isInvalid = !!error;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[6rem_6rem] items-end gap-3"
    >
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={rowInputId}>Rows</FieldLabel>
        <Input
          id={rowInputId}
          name="rows"
          type="number"
          aria-invalid={isInvalid}
          placeholder="Rows"
          min={MIN_ROWS}
          max={MAX_ROWS}
          defaultValue={DEFAULT_ROWS}
          inputMode="numeric"
        />
      </Field>

      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={colInputId}>Columns</FieldLabel>
        <Input
          id={colInputId}
          name="cols"
          type="number"
          aria-invalid={isInvalid}
          placeholder="Columns"
          min={MIN_COLS}
          max={MAX_COLS}
          defaultValue={DEFAULT_COLS}
          inputMode="numeric"
        />
      </Field>

      {isInvalid && error && (
        <FieldError errors={[{ message: error }]} className="col-span-2" />
      )}

      <Button type="submit" size="sm" className="col-span-2 h-8 w-full">
        Insert table
      </Button>
    </form>
  );
}
