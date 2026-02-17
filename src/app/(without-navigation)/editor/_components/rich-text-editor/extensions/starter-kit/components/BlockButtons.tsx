import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { Code2, CornerDownLeft, Minus, Pilcrow, Quote } from "lucide-react";

import { ToolbarButton } from "../../../components/ToolbarButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { getShortcut } from "../../../utils/getShortcut";

export function BlockButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isParagraph: ctx.editor.isActive("paragraph"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
      isBlockquote: ctx.editor.isActive("blockquote"),
    }),
  });

  const buttons = [
    {
      key: "blockquote",
      tooltipContent: (
        <>
          Blockquote <Kbd>{getShortcut("blockquote")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editorState.isBlockquote,
      icon: Quote,
    },
    {
      key: "codeBlock",
      tooltipContent: (
        <>
          Code block <Kbd>{getShortcut("codeBlock")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editorState.isCodeBlock,
      icon: Code2,
    },
    {
      key: "paragraph",
      tooltipContent: (
        <>
          Paragraph <Kbd>{getShortcut("normalText")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editorState.isParagraph,
      icon: Pilcrow,
    },
    {
      key: "horizontalRule",
      // Doesn't have shortcut
      tooltipContent: <>Horizontal rule</>,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
      icon: Minus,
    },
    {
      key: "hardBreak",
      tooltipContent: (
        <>
          Hard break <Kbd>{getShortcut("lineBreak")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().setHardBreak().run(),
      isActive: false,
      icon: CornerDownLeft,
    },
  ];

  return buttons.map(
    ({ icon: Icon, isActive, key, onClick, tooltipContent }) => (
      <ToolbarButton
        key={key}
        tooltipContent={tooltipContent}
        onClick={onClick}
        isActive={isActive}
      >
        <Icon />
      </ToolbarButton>
    ),
  );
}
