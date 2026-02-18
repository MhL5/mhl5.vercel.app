import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import {
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

import { EditorButton } from "../../../components/EditorButton";
import {
  EditorPopover,
  EditorPopoverContent,
  EditorPopoverTrigger,
} from "../../../components/EditorPopover";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { getShortcut } from "../../../utils/getShortcut";

export function HeadingPopover() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isHeading1: ctx.editor.isActive("heading", { level: 1 }),
      isHeading2: ctx.editor.isActive("heading", { level: 2 }),
      isHeading3: ctx.editor.isActive("heading", { level: 3 }),
      isHeading4: ctx.editor.isActive("heading", { level: 4 }),
      isHeading5: ctx.editor.isActive("heading", { level: 5 }),
      isHeading6: ctx.editor.isActive("heading", { level: 6 }),
    }),
  });

  function handleHeadingClick(level: 1 | 2 | 3 | 4 | 5 | 6) {
    editor.chain().focus().toggleHeading({ level }).run();
  }

  const headingsList = [
    {
      icon: Heading1,
      title: "Heading 1",
      isActive: editorState.isHeading1,
      onClick: () => handleHeadingClick(1),
      shortcut: getShortcut(`heading1`),
    },
    {
      icon: Heading2,
      title: "Heading 2",
      isActive: editorState.isHeading2,
      onClick: () => handleHeadingClick(2),
      shortcut: getShortcut(`heading2`),
    },
    {
      icon: Heading3,
      title: "Heading 3",
      isActive: editorState.isHeading3,
      onClick: () => handleHeadingClick(3),
      shortcut: getShortcut(`heading3`),
    },
    {
      icon: Heading4,
      title: "Heading 4",
      isActive: editorState.isHeading4,
      onClick: () => handleHeadingClick(4),
      shortcut: getShortcut(`heading4`),
    },
    {
      icon: Heading5,
      title: "Heading 5",
      isActive: editorState.isHeading5,
      onClick: () => handleHeadingClick(5),
      shortcut: getShortcut(`heading5`),
    },
    {
      icon: Heading6,
      title: "Heading 6",
      isActive: editorState.isHeading6,
      onClick: () => handleHeadingClick(6),
      shortcut: getShortcut(`heading6`),
    },
  ] as const;

  const activeHeading = headingsList.find(({ isActive }) => isActive) || {
    title: "Heading",
    icon: Heading,
    shortcut: null,
  };

  return (
    <EditorPopover>
      <EditorPopoverTrigger asChild>
        <EditorButton
          isActive={activeHeading.title !== "Heading"}
          tooltipContent={null}
          size="default"
          className="h-7 px-1!"
          aria-label={`${activeHeading.title} ${activeHeading.shortcut ? `(${activeHeading.shortcut})` : ""}`}
        >
          <activeHeading.icon className="size-4 shrink-0" />
          <ChevronDown className="size-3 shrink-0" />
        </EditorButton>
      </EditorPopoverTrigger>

      <EditorPopoverContent align="start" className="grid w-fit gap-0.5 p-1">
        {headingsList.map(
          ({ icon: Icon, onClick, title, isActive, shortcut }) => (
            <EditorButton
              isActive={isActive}
              key={title + shortcut}
              onClick={onClick}
              className="w-52 justify-start gap-3 px-2 py-1"
              variant="ghost"
              tooltipContent={null}
            >
              <Icon className="shrink-0" />
              {title}
              <Kbd className="ms-auto">{shortcut}</Kbd>
            </EditorButton>
          ),
        )}
      </EditorPopoverContent>
    </EditorPopover>
  );
}
