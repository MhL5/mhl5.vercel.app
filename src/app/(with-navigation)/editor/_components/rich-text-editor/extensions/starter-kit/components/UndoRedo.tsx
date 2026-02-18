import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";

import { EditorButton } from "../../../components/EditorButton";
import { useEditorMessages } from "../../../context/EditorMessagesContext";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { getShortcut } from "../../../utils/getShortcut";

export function UndoRedo() {
  const { messages } = useEditorMessages();
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
          {messages.undo} <Kbd>{getShortcut("undo")}</Kbd>
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
          {messages.redo} <Kbd>{getShortcut("redo")}</Kbd>
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
      <EditorButton
        key={type}
        tooltipContent={tooltipContent}
        onClick={() => handleClick(type)}
        disabled={disabled}
        isActive={isActive}
      >
        <Icon />
      </EditorButton>
    ),
  );
}
