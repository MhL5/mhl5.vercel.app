import {
  PopoverOnHover,
  PopoverOnHoverContent,
  PopoverOnHoverTrigger,
} from "@/components/PopoverOnHover";
import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { ChevronDown, List, ListOrdered } from "lucide-react";

import { EditorButton } from "../../../components/EditorButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { useEditorMessages } from "../../../i18n/EditorMessagesContext";
import { getShortcut } from "../../../utils/getShortcut";

export function ListPopover() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
    }),
  });

  function handleClick(type: "bulletList" | "orderedList") {
    if (type === "bulletList")
      return editor.chain().focus().toggleBulletList().run();
    if (type === "orderedList")
      return editor.chain().focus().toggleOrderedList().run();
  }

  const { messages } = useEditorMessages();

  const buttons = [
    {
      type: "bulletList",
      isActive: editorState.isBulletList,
      icon: List,
      label: messages.bulletList,
      shortcut: getShortcut("bulletList"),
    },
    {
      type: "orderedList",
      isActive: editorState.isOrderedList,
      icon: ListOrdered,
      label: messages.orderedList,
      shortcut: getShortcut("orderedList"),
    },
  ] as const;

  const isTriggerActive = editorState.isBulletList || editorState.isOrderedList;

  return (
    <PopoverOnHover>
      <PopoverOnHoverTrigger asChild>
        <EditorButton
          isActive={isTriggerActive}
          tooltipContent={null}
          size="default"
          className="h-7 px-1.25!"
        >
          <List
            data-active={isTriggerActive}
            className="data-[active=false]:text-muted-foreground"
          />
          <ChevronDown className="size-3 shrink-0" />
        </EditorButton>
      </PopoverOnHoverTrigger>
      <PopoverOnHoverContent align="start" className="grid w-fit gap-0.5 p-1">
        {buttons.map(({ icon: Icon, isActive, type, label, shortcut }) => (
          <EditorButton
            key={type}
            onClick={() => handleClick(type)}
            isActive={isActive}
            className="min-w-52 justify-start gap-3 px-2 py-1"
            variant="ghost"
            tooltipContent={null}
          >
            <Icon />
            {label}
            <Kbd className="ms-auto">{shortcut}</Kbd>
          </EditorButton>
        ))}
      </PopoverOnHoverContent>
    </PopoverOnHover>
  );
}
