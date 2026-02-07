import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Code,
  Code2,
  CornerDownLeft,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Type,
  Undo2,
} from "lucide-react";
import type { ComponentProps } from "react";

import { useTiptapEditorContext } from "../context/TiptapEditorContext";
import { getShortcut } from "../utils/getShortcut";

export default function Toolbar() {
  const { editor } = useTiptapEditorContext();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      // Text formatting
      isBold: ctx.editor.isActive("bold") ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive("italic") ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isStrike: ctx.editor.isActive("strike") ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor.isActive("code") ?? false,
      canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
      canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

      // Block types
      isParagraph: ctx.editor.isActive("paragraph") ?? false,
      isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
      isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
      isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
      isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,

      // Lists and blocks
      isBulletList: ctx.editor.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor.isActive("orderedList") ?? false,
      isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
      isBlockquote: ctx.editor.isActive("blockquote") ?? false,

      // History
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }),
  });

  return (
    <div className="flex items-center justify-start gap-2 overflow-x-auto border-b border-border/50 bg-muted px-2 py-1.5">
      <ToolbarButton
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        isActive={editorState.canUndo}
      >
        <Undo2 />
      </ToolbarButton>
      <ToolbarButton
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        isActive={editorState.canRedo}
      >
        <Redo2 />
      </ToolbarButton>

      <ToolbarSeparator />

      <HeadingDropdown />

      <ToolbarButton
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        isActive={editorState.isBold}
      >
        <Bold />
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        isActive={editorState.isItalic}
      >
        <Italic />
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        isActive={editorState.isStrike}
      >
        <Strikethrough />
      </ToolbarButton>
      <ToolbarButton
        title="Inline code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        isActive={editorState.isCode}
      >
        <Code />
      </ToolbarButton>

      <ToolbarButton
        title="Paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editorState.isParagraph}
      >
        <Pilcrow />
      </ToolbarButton>

      <ToolbarButton
        title="Bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState.isBulletList}
      >
        <List />
      </ToolbarButton>
      <ToolbarButton
        title="Ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editorState.isOrderedList}
      >
        <ListOrdered />
      </ToolbarButton>
      <ToolbarButton
        title="Code block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editorState.isCodeBlock}
      >
        <Code2 />
      </ToolbarButton>
      <ToolbarButton
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editorState.isBlockquote}
      >
        <Quote />
      </ToolbarButton>
      <ToolbarButton
        title="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        isActive={false}
      >
        <Minus />
      </ToolbarButton>
      <ToolbarButton
        title="Hard break"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        isActive={false}
      >
        <CornerDownLeft />
      </ToolbarButton>
    </div>
  );
}

function ToolbarSeparator() {
  return (
    <Separator
      orientation="vertical"
      className="data-[orientation=vertical]:h-5"
    />
  );
}

function ToolbarButton({
  isActive,
  ...props
}: ComponentProps<typeof Button> & {
  isActive: boolean;
}) {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="icon-sm"
      className="data-[is-active=true]=bg-primary/70 data-[is-active=true]=text-primary-foreground/70 transition-colors duration-300"
      data-is-active={isActive}
      {...props}
    />
  );
}

function HeadingDropdown() {
  const { editor } = useTiptapEditorContext();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isParagraph: ctx.editor.isActive("paragraph") ?? false,
      isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
      isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
      isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
      isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
    }),
  });

  function handleHeadingClick(level: 1 | 2 | 3 | 4 | 5 | 6) {
    editor.chain().focus().toggleHeading({ level }).run();
  }

  const headingsList = [
    {
      level: 1,
      icon: Heading1,
      title: "Heading 1",
      isActive: editorState.isHeading1,
    },
    {
      level: 2,
      icon: Heading2,
      title: "Heading 2",
      isActive: editorState.isHeading2,
    },
    {
      level: 3,
      icon: Heading3,
      title: "Heading 3",
      isActive: editorState.isHeading3,
    },
    {
      level: 4,
      icon: Heading4,
      title: "Heading 4",
      isActive: editorState.isHeading4,
    },
    {
      level: 5,
      icon: Heading5,
      title: "Heading 5",
      isActive: editorState.isHeading5,
    },
    {
      level: 6,
      icon: Heading6,
      title: "Heading 6",
      isActive: editorState.isHeading6,
    },
  ] as const;

  const activeHeading = headingsList.find(({ isActive }) => isActive) || {
    title: "Heading",
    icon: Heading,
    level: null,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          title={`${activeHeading.title} ${activeHeading.level ? `(${getShortcut(`heading${activeHeading.level}`)})` : ""}`}
          isActive={activeHeading.title !== "Heading"}
        >
          <activeHeading.icon className="size-4 shrink-0" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="grid gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="w-48 justify-start px-2 py-1"
          isActive={editorState.isParagraph}
        >
          <Type className="shrink-0" />
          Normal
          <Kbd className="ms-auto">{getShortcut("normalText")}</Kbd>
        </ToolbarButton>
        {headingsList.map(({ icon: Icon, level, title, isActive }) => (
          <ToolbarButton
            isActive={isActive}
            key={title + level}
            onClick={() => handleHeadingClick(level)}
            className="w-48 justify-start px-2 py-1"
          >
            <Icon className="shrink-0" />
            {title}
            <Kbd className="ms-auto">{getShortcut(`heading${level}`)}</Kbd>
          </ToolbarButton>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
