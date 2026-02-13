import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import { getShortcut } from "../utils/getShortcut";
import { ToolbarButton } from "./ui/ToolbarButton";

export function TextFormattingButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isUnderline: ctx.editor.isActive("underline"),
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isStrike: ctx.editor.isActive("strike"),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isCode: ctx.editor.isActive("code"),
      canCode: ctx.editor.can().chain().toggleCode().run(),
    }),
  });

  const buttons = [
    {
      key: "underline",
      tooltipContent: (
        <>
          Underline <Kbd>{getShortcut("underline")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editorState.isUnderline,
      icon: Underline,
    },
    {
      key: "bold",
      tooltipContent: (
        <>
          Bold <Kbd>{getShortcut("bold")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editorState.canBold,
      isActive: editorState.isBold,
      icon: Bold,
    },
    {
      key: "italic",
      tooltipContent: (
        <>
          Italic <Kbd>{getShortcut("italic")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editorState.canItalic,
      isActive: editorState.isItalic,
      icon: Italic,
    },
    {
      key: "strikethrough",
      tooltipContent: (
        <>
          Strikethrough <Kbd>{getShortcut("strikethrough")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editorState.canStrike,
      isActive: editorState.isStrike,
      icon: Strikethrough,
    },
    {
      key: "code",
      tooltipContent: (
        <>
          Inline code <Kbd>{getShortcut("code")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editorState.canCode,
      isActive: editorState.isCode,
      icon: Code,
    },
  ];

  return buttons.map(
    ({ disabled, icon: Icon, isActive, key, onClick, tooltipContent }) => (
      <ToolbarButton
        key={key}
        tooltipContent={tooltipContent}
        onClick={onClick}
        disabled={disabled}
        isActive={isActive}
      >
        <Icon />
      </ToolbarButton>
    ),
  );
}
