import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Columns3, Rows3, TableIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCurrentEditor } from "../hooks/useEditor";
import { ToolbarButton } from "./ToolbarButton";

const MIN_ROWS = 1;
const MAX_ROWS = 20;
const MIN_COLS = 1;
const MAX_COLS = 10;
const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

export default function TablePopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton
          isActive={false}
          tooltipContent={null}
          title="Insert table"
        >
          <TableIcon />
        </ToolbarButton>
      </PopoverTrigger>
      <TablePopoverContent onInsert={() => setOpen(false)} />
    </Popover>
  );
}

function TablePopoverContent({ onInsert }: { onInsert: () => void }) {
  const { editor } = useCurrentEditor();
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);

  function handleSubmit() {
    const r = Math.min(MAX_ROWS, Math.max(MIN_ROWS, rows));
    const c = Math.min(MAX_COLS, Math.max(MIN_COLS, cols));

    if (!editor.can().insertTable({ rows: r, cols: c }))
      return toast.error("Cannot insert table here");

    editor
      .chain()
      .focus()
      .insertTable({ rows: r, cols: c, withHeaderRow: true })
      .run();

    onInsert();
  }

  return (
    <PopoverContent className="w-fit p-3" align="end" sideOffset={6}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="grid grid-cols-3 items-end gap-2"
      >
        <div className="space-y-2">
          <Label htmlFor="table-rows">Rows</Label>
          <Input
            id="table-rows"
            type="number"
            min={MIN_ROWS}
            max={MAX_ROWS}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value) || MIN_ROWS)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="table-cols">Columns</Label>
          <Input
            id="table-cols"
            type="number"
            min={MIN_COLS}
            max={MAX_COLS}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value) || MIN_COLS)}
            className="h-9"
          />
        </div>

        <Button type="submit" size="sm" className="h-9 w-full">
          Insert table
        </Button>
      </form>
    </PopoverContent>
  );
}

/**
 * Bubble menu when selection is inside a table:
 * - Add row / Add column buttons
 * - Delete table button at the end (top end)
 */
export function TableBubbleMenu() {
  const { editor } = useCurrentEditor();
  const { isTableActive } = useEditorState({
    editor,
    selector: (ctx) => ({
      isTableActive: ctx.editor.isActive("table"),
    }),
  });

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableBubbleMenu"
      shouldShow={() => isTableActive}
      options={{ placement: "top" }}
    >
      {isTableActive ? (
        <div className="flex items-center gap-0.5 rounded-lg border border-border bg-popover px-1 py-1 shadow-md">
          <ToolbarButton
            isActive={false}
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs"
            tooltipContent="Add row after"
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            <Rows3 className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            isActive={false}
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs"
            tooltipContent="Add column after"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            <Columns3 className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton
            isActive={false}
            variant="destructive"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs"
            tooltipContent="delete current column"
            onClick={() => editor.chain().focus().deleteColumn().run()}
          >
            <Columns3 className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            isActive={false}
            variant="destructive"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs"
            tooltipContent="delete current row"
            onClick={() => editor.chain().focus().deleteRow().run()}
          >
            <Rows3 className="size-3.5" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6" />

          <ToolbarButton
            isActive={false}
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
            tooltipContent="Delete table"
            // disabled={!editor.can().deleteTable()}
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <Trash2 className="size-3.5" />
          </ToolbarButton>
        </div>
      ) : null}
    </BubbleMenu>
  );
}
