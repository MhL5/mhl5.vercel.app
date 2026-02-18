import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { Code2, CornerDownLeft, Minus, Pilcrow, Quote } from "lucide-react";

import { EditorButton } from "../../../components/EditorButton";
import { useEditorMessages } from "../../../context/EditorMessagesContext";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { getShortcut } from "../../../utils/getShortcut";

export function BlockButtons() {
  const { messages } = useEditorMessages();
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
          {messages.blockquote} <Kbd>{getShortcut("blockquote")}</Kbd>
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
          {messages.codeBlock} <Kbd>{getShortcut("codeBlock")}</Kbd>
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
          {messages.paragraph} <Kbd>{getShortcut("normalText")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editorState.isParagraph,
      icon: Pilcrow,
    },
    {
      key: "horizontalRule",
      // Doesn't have shortcut
      tooltipContent: <>{messages.horizontalRule}</>,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
      icon: Minus,
    },
    {
      key: "hardBreak",
      tooltipContent: (
        <>
          {messages.hardBreak} <Kbd>{getShortcut("lineBreak")}</Kbd>
        </>
      ),
      onClick: () => editor.chain().focus().setHardBreak().run(),
      isActive: false,
      icon: CornerDownLeft,
    },
  ];

  return buttons.map(
    ({ icon: Icon, isActive, key, onClick, tooltipContent }) => (
      <EditorButton
        key={key}
        tooltipContent={tooltipContent}
        onClick={onClick}
        isActive={isActive}
      >
        <Icon />
      </EditorButton>
    ),
  );
}
