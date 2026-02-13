import { Kbd } from "@/components/ui/kbd";
import { useEditorState } from "@tiptap/react";
import { List, ListOrdered } from "lucide-react";

import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { getShortcut } from "../../../utils/getShortcut";
import { ToolbarButton } from "../../ToolbarButton";

export function ListButtons() {
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
