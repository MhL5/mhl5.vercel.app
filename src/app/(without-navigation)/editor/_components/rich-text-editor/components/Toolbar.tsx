import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
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
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Type,
  Underline,
  Undo2,
  XIcon,
} from "lucide-react";

import { useCurrentEditor } from "../hooks/useEditor";
import { getShortcut } from "../utils/getShortcut";
import TablePopover from "./TablePopover";
import { ToolbarButton } from "./ToolbarButton";

export default function Toolbar() {
  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto bg-muted/70 px-2 py-1.5">
      <UndoRedoButtons />
      <ToolbarSeparator />
      <HeadingDropdown />
      <ToolbarSeparator />
      <ListButtons />
      <ToolbarSeparator />
      <TextAlignButtons />
      <ToolbarSeparator />
      <TextFormattingButtons />
      <ToolbarSeparator />
      <BlockButtons />
      <ToolbarSeparator />
      <ImageButton />
      <TablePopover />
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

function HeadingDropdown() {
  const { editor } = useCurrentEditor();
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
          tooltipContent={
            <>
              {activeHeading.title}{" "}
              {activeHeading.level ? (
                <Kbd>{getShortcut(`heading${activeHeading.level}`)}</Kbd>
              ) : null}
            </>
          }
          isActive={activeHeading.title !== "Heading"}
          size="default"
          className="h-8"
        >
          <activeHeading.icon className="size-4 shrink-0" />
          <ChevronDown className="size-3 shrink-0" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="grid gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="w-48 justify-start px-2 py-1"
          isActive={editorState.isParagraph}
          variant="ghost"
          tooltipContent={null}
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
            variant="ghost"
            tooltipContent={null}
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

function ListButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBulletList: ctx.editor.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor.isActive("orderedList") ?? false,
    }),
  });

  function handleClick(type: "bulletList" | "orderedList") {
    if (type === "bulletList") editor.chain().focus().toggleBulletList().run();
    if (type === "orderedList")
      editor.chain().focus().toggleOrderedList().run();
  }

  const buttons = [
    {
      tooltipContent: (
        <>
          Bullet list <Kbd>{getShortcut("bulletList")}</Kbd>
        </>
      ),
      type: "bulletList",
      isActive: editorState.isBulletList,
      icon: List,
    },
    {
      tooltipContent: (
        <>
          Ordered list <Kbd>{getShortcut("orderedList")}</Kbd>
        </>
      ),
      type: "orderedList",
      isActive: editorState.isOrderedList,
      icon: ListOrdered,
    },
  ] as const;

  return buttons.map(({ icon: Icon, isActive, tooltipContent, type }) => (
    <ToolbarButton
      key={type}
      tooltipContent={tooltipContent}
      onClick={() => handleClick(type)}
      isActive={isActive}
    >
      <Icon />
    </ToolbarButton>
  ));
}

function UndoRedoButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
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

function TextAlignButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
      isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
    }),
  });

  function handleClick(
    alignment: "left" | "center" | "right" | "justify" | "unset",
  ) {
    if (alignment === "unset")
      return editor.chain().focus().unsetTextAlign().run();
    editor.chain().focus().toggleTextAlign(alignment).run();
  }

  const buttons = [
    {
      tooltipContent: (
        <>
          Left align <Kbd>{getShortcut("leftAlign")}</Kbd>
        </>
      ),
      icon: AlignLeft,
      getShortcutKey: "leftAlign",
      alignment: "left",
      isActive: editorState.isAlignLeft,
    },
    {
      tooltipContent: (
        <>
          Center align <Kbd>{getShortcut("centerAlign")}</Kbd>
        </>
      ),
      icon: AlignCenter,
      getShortcutKey: "centerAlign",
      alignment: "center",
      isActive: editorState.isAlignCenter,
    },
    {
      tooltipContent: (
        <>
          Right align <Kbd>{getShortcut("rightAlign")}</Kbd>
        </>
      ),
      icon: AlignRight,
      getShortcutKey: "rightAlign",
      alignment: "right",
      isActive: editorState.isAlignRight,
    },
    {
      tooltipContent: (
        <>
          Justify align <Kbd>{getShortcut("justify")}</Kbd>
        </>
      ),
      icon: AlignJustify,
      getShortcutKey: "justify",
      alignment: "justify",
      isActive: editorState.isAlignJustify,
    },
  ] as const;

  const activeAlignment = buttons.find(({ isActive }) => isActive) || {
    alignment: null,
    icon: AlignJustify,
    tooltipContent: "Align text",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isActive={activeAlignment.alignment !== null}
          tooltipContent={activeAlignment.tooltipContent}
          size="default"
          className="h-8"
        >
          <activeAlignment.icon />
          <ChevronDown className="size-3 shrink-0" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="grid gap-0.5">
        {buttons.map(({ alignment, icon: Icon, isActive, getShortcutKey }) => (
          <ToolbarButton
            key={alignment}
            onClick={() => handleClick(alignment)}
            isActive={isActive}
            className="w-48 justify-start px-2 py-1"
            variant="ghost"
            tooltipContent={null}
          >
            <Icon className="shrink-0" />
            {alignment}
            <Kbd className="ms-auto">{getShortcut(getShortcutKey)}</Kbd>
          </ToolbarButton>
        ))}

        {activeAlignment.alignment !== null && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <ToolbarButton
              onClick={() => handleClick("unset")}
              isActive={activeAlignment.alignment === null}
              className="w-48 justify-start px-2 py-1"
              variant="destructive"
              tooltipContent={null}
            >
              <XIcon className="shrink-0" />
              Unset
            </ToolbarButton>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TextFormattingButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isUnderline: ctx.editor.isActive("underline") ?? false,

      isBold: ctx.editor.isActive("bold") ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

      isItalic: ctx.editor.isActive("italic") ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,

      isStrike: ctx.editor.isActive("strike") ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,

      isCode: ctx.editor.isActive("code") ?? false,
      canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
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

function BlockButtons() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isParagraph: ctx.editor.isActive("paragraph") ?? false,
      isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
      isBlockquote: ctx.editor.isActive("blockquote") ?? false,
    }),
  });

  const buttons = [
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

function ImageButton() {
  const { editor } = useCurrentEditor();
  return (
    <ToolbarButton
      tooltipContent={null}
      isActive={false}
      onClick={() => {
        editor.commands.setImage({
          src: "/img-example.jpg",
          alt: "A boring example image",
          title: "An example",
        });
      }}
    >
      <ImageIcon />
    </ToolbarButton>
  );
}
