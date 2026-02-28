"use client";

import { useEditorState } from "@tiptap/react";
import { ListTree } from "lucide-react";
import { useCallback } from "react";

import { EditorButton } from "../../../components/EditorButton";
import { useCurrentEditor } from "../../../hooks/useCurrentEditor";
import { useEditorMessages } from "../../../i18n/EditorMessagesContext";

export function InsertTableOfContentsButton() {
  const { messages } = useEditorMessages();
  const { editor } = useCurrentEditor();

  const { hasHeadings } = useEditorState({
    editor,
    selector: (ctx) => ({
      hasHeadings:
        (ctx.editor.storage.tableOfContents?.content?.length ?? 0) > 0,
    }),
  });

  const insertTableOfContents = useCallback(() => {
    const content = editor.storage.tableOfContents?.content;
    if (!content || content.length === 0) return;

    const listItems = content.map(
      (anchor: { id: string; textContent: string; level: number }) => ({
        type: "listItem",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: anchor.textContent,
                marks: [
                  {
                    type: "link",
                    attrs: { href: `#${anchor.id}`, target: "_self" },
                  },
                ],
              },
            ],
          },
        ],
      }),
    );

    editor
      .chain()
      .focus()
      .insertContent({
        type: "bulletList",
        content: listItems,
      })
      .run();
  }, [editor]);

  return (
    <EditorButton
      tooltipContent={
        hasHeadings
          ? messages.insertTableOfContents
          : messages.noHeadingsInDocument
      }
      isActive={false}
      type="button"
      onClick={insertTableOfContents}
      disabled={!hasHeadings}
      aria-label={messages.insertTableOfContents}
    >
      <ListTree />
    </EditorButton>
  );
}
