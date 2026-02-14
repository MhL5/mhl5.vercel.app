import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import { getShortcut } from "../utils/getShortcut";
import { ToolbarButton } from "./ToolbarButton";

export function UndoRedo() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
    }),
  });

  function handleClick(type: "undo" | "redo") {
    if (type === "undo") editor.chain().focus().undo().run();
    if (type === "redo") editor.chain().focus().redo().run();
  }

  const buttons = [
    {
      tooltipContent: (
        <>
          Undo <Kbd>{getShortcut("undo")}</Kbd>
        </>
      ),
      type: "undo",
      disabled: !editorState.canUndo,
      isActive: editorState.canUndo,
      icon: Undo2,
    },
    {
      tooltipContent: (
        <>
          Redo <Kbd>{getShortcut("redo")}</Kbd>
        </>
      ),
      type: "redo",
      disabled: !editorState.canRedo,
      isActive: editorState.canRedo,
      icon: Redo2,
    },
  ] as const;

  return buttons.map(
    ({ disabled, icon: Icon, isActive, tooltipContent, type }) => (
      <ToolbarButton
        key={type}
        tooltipContent={tooltipContent}
        onClick={() => handleClick(type)}
        disabled={disabled}
        isActive={isActive}
      >
        <Icon />
      </ToolbarButton>
    ),
  );
}
