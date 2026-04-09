import {
  PopoverOnHover,
  PopoverOnHoverContent,
  PopoverOnHoverTrigger,
} from "@/components/PopoverOnHover";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
  XIcon,
} from "lucide-react";

import { EditorButton } from "../../../components/EditorButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { useEditorMessages } from "../../../i18n/EditorMessagesContext";
import { getShortcut } from "../../../utils/getShortcut";

export function TextAlignPopover() {
  const { messages } = useEditorMessages();
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
          {messages.leftAlign} <Kbd>{getShortcut("leftAlign")}</Kbd>
        </>
      ),
      icon: AlignLeft,
      getShortcutKey: "leftAlign",
      alignment: "left" as const,
      label: messages.left,
      isActive: editorState.isAlignLeft,
    },
    {
      tooltipContent: (
        <>
          {messages.centerAlign} <Kbd>{getShortcut("centerAlign")}</Kbd>
        </>
      ),
      icon: AlignCenter,
      getShortcutKey: "centerAlign",
      alignment: "center" as const,
      label: messages.center,
      isActive: editorState.isAlignCenter,
    },
    {
      tooltipContent: (
        <>
          {messages.rightAlign} <Kbd>{getShortcut("rightAlign")}</Kbd>
        </>
      ),
      icon: AlignRight,
      getShortcutKey: "rightAlign",
      alignment: "right" as const,
      label: messages.right,
      isActive: editorState.isAlignRight,
    },
    {
      tooltipContent: (
        <>
          {messages.justifyAlign} <Kbd>{getShortcut("justify")}</Kbd>
        </>
      ),
      icon: AlignJustify,
      getShortcutKey: "justify",
      alignment: "justify" as const,
      label: messages.justify,
      isActive: editorState.isAlignJustify,
    },
  ] as const;

  const activeAlignment = buttons.find(({ isActive }) => isActive) || {
    alignment: null as null,
    icon: AlignJustify,
    tooltipContent: messages.alignText,
  };

  return (
    <PopoverOnHover>
      <PopoverOnHoverTrigger asChild>
        <EditorButton
          isActive={activeAlignment.alignment !== null}
          tooltipContent={null}
          aria-label={messages.currentTextAlignment(activeAlignment.alignment)}
          size="default"
          className="h-8 w-fit px-1!"
        >
          <activeAlignment.icon />
          <ChevronDown className="size-3 shrink-0" />
        </EditorButton>
      </PopoverOnHoverTrigger>
      <PopoverOnHoverContent align="start" className="grid w-fit gap-0.5 p-1">
        {buttons.map(
          ({ alignment, icon: Icon, isActive, getShortcutKey, label }) => (
            <EditorButton
              key={alignment}
              onClick={() => handleClick(alignment)}
              isActive={isActive}
              className="w-52 justify-start gap-3 px-2 py-1"
              variant="ghost"
              tooltipContent={null}
            >
              <Icon className="shrink-0" />
              {label}
              <Kbd className="ms-auto">{getShortcut(getShortcutKey)}</Kbd>
            </EditorButton>
          ),
        )}

        {activeAlignment.alignment !== null && (
          <>
            <Separator className="my-1" />
            <EditorButton
              onClick={() => handleClick("unset")}
              isActive={activeAlignment.alignment === null}
              className="w-52 justify-start gap-3 px-2 py-1"
              variant="destructive"
              tooltipContent={null}
            >
              <XIcon className="shrink-0" />
              {messages.unset}
            </EditorButton>
          </>
        )}
      </PopoverOnHoverContent>
    </PopoverOnHover>
  );
}
