import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useCurrentEditor } from "../../../../hooks/useCurrentEditor";
import {
  EditorDropdownContentMenu,
  EditorDropdownMenu,
  EditorDropdownTriggerMenu,
} from "../../../EditorDropdown";
import { ToolbarButton } from "../ui/ToolbarButton";

export function TableDropdown() {
  return (
    <EditorDropdownMenu>
      <EditorDropdownTriggerMenu asChild>
        <ToolbarButton
          isActive={false}
          tooltipContent={null}
          title="Insert table"
        >
          <TableIcon />
        </ToolbarButton>
      </EditorDropdownTriggerMenu>

      <EditorDropdownContentMenu className="w-fit p-3">
        <TableDropdownContent />
      </EditorDropdownContentMenu>
    </EditorDropdownMenu>
  );
}

const MIN_ROWS = 1;
const MAX_ROWS = 20;
const MIN_COLS = 1;
const MAX_COLS = 10;
const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

function TableDropdownContent() {
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
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid grid-cols-2 items-end gap-3"
    >
      <div className="w-24 space-y-2">
        <Label htmlFor="table-rows">Rows</Label>
        <Input
          id="table-rows"
          type="number"
          min={MIN_ROWS}
          max={MAX_ROWS}
          value={rows}
          onChange={(e) => setRows(Number(e.target.value) || MIN_ROWS)}
          className="h-8"
        />
      </div>
      <div className="w-24 space-y-2">
        <Label htmlFor="table-cols">Columns</Label>
        <Input
          id="table-cols"
          type="number"
          min={MIN_COLS}
          max={MAX_COLS}
          value={cols}
          onChange={(e) => setCols(Number(e.target.value) || MIN_COLS)}
          className="h-8"
        />
      </div>

      <Button type="submit" size="sm" className="col-span-2 h-8 w-full">
        Insert table
      </Button>
    </form>
  );
}
