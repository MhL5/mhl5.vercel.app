import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
  XIcon,
} from "lucide-react";

import { useCurrentEditor } from "../hooks/useCurrentEditor";
import { getShortcut } from "../utils/getShortcut";
import {
  EditorPopover,
  EditorPopoverContent,
  EditorPopoverTrigger,
} from "./ui/EditorPopover";
import { ToolbarButton } from "./ui/ToolbarButton";

export function TextAlignPopover() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isAlignLeft: ctx.editor.isActive({ textAlign: "left" }),
      isAlignCenter: ctx.editor.isActive({ textAlign: "center" }),
      isAlignRight: ctx.editor.isActive({ textAlign: "right" }),
      isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }),
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
    <EditorPopover>
      <EditorPopoverTrigger asChild>
        <ToolbarButton
          isActive={activeAlignment.alignment !== null}
          tooltipContent={null}
          aria-label={`Current text alignment: ${activeAlignment.alignment || "unset"}`}
          size="default"
          className="h-8"
        >
          <activeAlignment.icon />
          <ChevronDown className="size-3 shrink-0" />
        </ToolbarButton>
      </EditorPopoverTrigger>
      <EditorPopoverContent align="start" className="grid w-fit gap-0.5 p-1">
        {buttons.map(({ alignment, icon: Icon, isActive, getShortcutKey }) => (
          <ToolbarButton
            key={alignment}
            onClick={() => handleClick(alignment)}
            isActive={isActive}
            className="w-52 justify-start gap-3 px-2 py-1"
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
              className="w-52 justify-start gap-3 px-2 py-1"
              variant="destructive"
              tooltipContent={null}
            >
              <XIcon className="shrink-0" />
              Unset
            </ToolbarButton>
          </>
        )}
      </EditorPopoverContent>
    </EditorPopover>
  );
}
