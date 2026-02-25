import {
  PopoverOnHover,
  PopoverOnHoverContent,
  PopoverOnHoverTrigger,
} from "@/components/PopoverOnHover";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { TableIcon, Trash2 } from "lucide-react";
import { type ComponentProps, Fragment, useId } from "react";
import z from "zod";

import { EditorButton } from "../../../components/EditorButton";
import { useEditorMessages } from "../../../context/EditorMessagesContext";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";

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
  const { messages } = useEditorMessages();
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
      tooltipContent: messages.insertColumnBefore,
      onClick: () => editor.chain().focus().addColumnBefore().run(),
      icon: <icons.insert />,
    },
    {
      key: "insertColumnAfter",
      tooltipContent: messages.insertColumnAfter,
      onClick: () => editor.chain().focus().addColumnAfter().run(),
      icon: <icons.insert className="rotate-180" />,
    },
    {
      key: "deleteColumn",
      tooltipContent: messages.deleteColumn,
      onClick: () => editor.chain().focus().deleteColumn().run(),
      icon: <icons.delete className="text-destructive" />,
    },
    {
      key: "addRowBefore",
      tooltipContent: messages.addRowTop,
      onClick: () => editor.chain().focus().addRowBefore().run(),
      icon: <icons.insert className="rotate-90" />,
    },
    {
      key: "addRowAfter",
      tooltipContent: messages.addRowBottom,
      onClick: () => editor.chain().focus().addRowAfter().run(),
      icon: <icons.insert className="rotate-270" />,
    },
    {
      key: "deleteRow",
      tooltipContent: messages.deleteRow,
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
              <EditorButton
                isActive={false}
                variant="ghost"
                size="sm"
                tooltipContentSide="top"
                tooltipContent={tooltipContent}
                onClick={onClick}
              >
                {icon}
              </EditorButton>
              {(key === "deleteColumn" || key === "deleteRow") && (
                <Separator
                  orientation="vertical"
                  data-table-key={key}
                  className="data-[orientation=vertical]:h-5 data-[table-key=deleteRow]:me-1"
                />
              )}
            </Fragment>
          ))}

          <EditorButton
            isActive={false}
            variant="destructive"
            tooltipContentSide="top"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            tooltipContent={messages.deleteTable}
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <Trash2 className="size-3.5" />
          </EditorButton>
        </div>
      ) : null}
    </BubbleMenu>
  );
}

function TablePopover() {
  const { messages } = useEditorMessages();
  return (
    <PopoverOnHover>
      <PopoverOnHoverTrigger asChild>
        <EditorButton
          isActive={false}
          tooltipContent={null}
          aria-label={messages.insertTable}
        >
          <TableIcon />
        </EditorButton>
      </PopoverOnHoverTrigger>

      <PopoverOnHoverContent className="w-fit p-3">
        <TablePopoverContent />
      </PopoverOnHoverContent>
    </PopoverOnHover>
  );
}

function TablePopoverContent() {
  const { messages } = useEditorMessages();
  const { editor } = useCurrentEditor();
  const form = useForm({
    defaultValues: {
      rows: 3,
      cols: 3,
    },
    validators: {
      onChange: z.object({
        rows: z.number().min(1),
        cols: z.number().min(1),
      }),
    },
    onSubmit: ({ value: { rows, cols } }) => {
      editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: true })
        .run();
    },
  });

  const rowInputId = useId();
  const colInputId = useId();

  const fieldsList = [
    {
      name: "rows",
      label: messages.rows,
      placeholder: messages.rows,
      inputId: rowInputId,
    },
    {
      name: "cols",
      label: messages.columns,
      placeholder: messages.columns,
      inputId: colInputId,
    },
  ] as const;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="grid grid-cols-[6rem_6rem] items-end gap-3"
    >
      {fieldsList.map(({ name, label, placeholder, inputId }) => (
        <form.Field key={name} name={name}>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field
                data-invalid={isInvalid}
                className={isInvalid ? "col-span-2" : ""}
              >
                <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
                <Input
                  id={inputId}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(+e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={placeholder}
                  type="number"
                  min={1}
                  inputMode="numeric"
                />
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="col-span-2"
                  />
                )}
              </Field>
            );
          }}
        </form.Field>
      ))}

      <Button type="submit" size="sm" className="col-span-2 h-8 w-full">
        {messages.insertTable}
      </Button>
    </form>
  );
}

export { TableBubbleMenu, TablePopover };
