import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { ChevronDown, List, ListOrdered } from "lucide-react";

import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { getShortcut } from "../../../utils/getShortcut";
import {
  EditorDropdown,
  EditorDropdownContent,
  EditorDropdownTrigger,
} from "../../EditorDropdown";
import { ToolbarButton } from "../../ToolbarButton";

export function ListDropdown() {
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

  const buttons = [
    {
      type: "bulletList",
      isActive: editorState.isBulletList,
      icon: List,
      label: "Bullet list",
      shortcut: getShortcut("bulletList"),
    },
    {
      type: "orderedList",
      isActive: editorState.isOrderedList,
      icon: ListOrdered,
      label: "Ordered list",
      shortcut: getShortcut("orderedList"),
    },
  ] as const;

  const isTriggerActive = editorState.isBulletList || editorState.isOrderedList;

  return (
    <EditorDropdown>
      <EditorDropdownTrigger asChild>
        <ToolbarButton
          isActive={isTriggerActive}
          tooltipContent={null}
          size="default"
          className="h-7 px-1.25!"
        >
          <List
            data-active={isTriggerActive}
            className="data-[active=false]:text-muted-foreground"
          />
          <ChevronDown className="size-3 shrink-0 text-foreground" />
        </ToolbarButton>
      </EditorDropdownTrigger>
      <EditorDropdownContent align="start" className="grid gap-0.5">
        {buttons.map(({ icon: Icon, isActive, type, label, shortcut }) => (
          <ToolbarButton
            key={type}
            onClick={() => handleClick(type)}
            isActive={isActive}
            className="w-52 justify-start gap-3 px-2 py-1"
            variant="ghost"
            tooltipContent={null}
          >
            <Icon />
            {label}
            <Kbd className="ms-auto">{shortcut}</Kbd>
          </ToolbarButton>
        ))}
      </EditorDropdownContent>
    </EditorDropdown>
  );
}
