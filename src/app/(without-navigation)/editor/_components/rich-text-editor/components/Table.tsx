import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Trash2 } from "lucide-react";
import { TableIcon } from "lucide-react";
import { type ComponentProps, Fragment } from "react";
import { type SubmitEvent, useId, useState } from "react";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import {
  EditorPopover,
  EditorPopoverContent,
  EditorPopoverTrigger,
} from "./EditorPopover";
import { ToolbarButton } from "./ToolbarButton";

const icons = {
  insert: (props: ComponentProps<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="13" height="7" x="3" y="3" rx="1"></rect>
      <path d="m22 15-3-3 3-3"></path>
      <rect width="13" height="7" x="3" y="14" rx="1"></rect>
    </svg>
  ),
  delete: (props: ComponentProps<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.5 3c1.404 0 2.107 0 2.611.38c.219.164.406.375.552.62C9 4.568 9 5.358 9 6.938v10.125c0 1.58 0 2.37-.337 2.937a2.1 2.1 0 0 1-.552.621c-.504.38-1.207.38-2.611.38s-2.107 0-2.611-.38a2.1 2.1 0 0 1-.552-.62C2 19.432 2 18.642 2 17.062V6.938c0-1.58 0-2.37.337-2.938a2.1 2.1 0 0 1 .552-.62C3.393 3 4.096 3 5.5 3M20 11.938v5.124c0 1.58 0 2.37-.337 2.938a2.1 2.1 0 0 1-.552.62c-.504.38-1.207.38-2.611.38s-2.107 0-2.611-.38a2.1 2.1 0 0 1-.552-.62C13 19.433 13 18.642 13 17.063V6.938c0-1.58 0-2.37.337-2.938M22 9l-6-6m6 0l-6 6"
        color="currentColor"
      />
    </svg>
  ),
};

function TableBubbleMenu() {
  const { editor } = useCurrentEditor();
  const { isTableActive } = useEditorState({
    editor,
    selector: (ctx) => ({
      isTableActive: ctx.editor.isActive("table"),
    }),
  });

  const buttons = [
    {
      key: "insertColumnBefore",
      tooltipContent: "Insert column before",
      onClick: () => editor.chain().focus().addColumnBefore().run(),
      icon: <icons.insert />,
    },
    {
      key: "insertColumnAfter",
      tooltipContent: "Insert column after",
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      icon: <icons.insert className="rotate-180" />,
    },
    {
      key: "deleteColumn",
      tooltipContent: "Delete column",
      onClick: () => editor.chain().focus().deleteColumn().run(),
      icon: <icons.delete className="text-destructive" />,
    },
    {
      key: "addRowBefore",
      tooltipContent: "Add row top",
      onClick: () => editor.chain().focus().addRowBefore().run(),
      icon: <icons.insert className="rotate-90" />,
    },
    {
      key: "addRowAfter",
      tooltipContent: "Add row bottom",
      onClick: () => editor.chain().focus().addRowAfter().run(),
      icon: <icons.insert className="rotate-270" />,
    },
    {
      key: "deleteRow",
      tooltipContent: "Delete row",
      onClick: () => editor.chain().focus().deleteRow().run(),
      icon: <icons.delete className="rotate-90 text-destructive" />,
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableBubbleMenu"
      shouldShow={() => isTableActive}
      options={{ placement: "top" }}
    >
      {isTableActive ? (
        <div className="flex items-center gap-1 rounded-lg border border-border bg-popover px-1 py-1 shadow-md">
          {buttons.map(({ icon, onClick, tooltipContent, key }) => (
            <Fragment key={key}>
              <ToolbarButton
                isActive={false}
                variant="ghost"
                size="sm"
                tooltipContentSide="top"
                tooltipContent={tooltipContent}
                onClick={onClick}
              >
                {icon}
              </ToolbarButton>
              {(key === "deleteColumn" || key === "deleteRow") && (
                <Separator
                  orientation="vertical"
                  data-table-key={key}
                  className="data-[orientation=vertical]:h-5 data-[table-key=deleteRow]:me-1"
                />
              )}
            </Fragment>
          ))}

          <ToolbarButton
            isActive={false}
            variant="destructive"
            tooltipContentSide="top"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            tooltipContent="Delete table"
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <Trash2 className="size-3.5" />
          </ToolbarButton>
        </div>
      ) : null}
    </BubbleMenu>
  );
}

function TablePopover() {
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

export { TableBubbleMenu, TablePopover };
