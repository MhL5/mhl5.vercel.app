"use client";

import { editorMessages } from "@/components/TiptapEditor/i18n/messages";
import { useDirection } from "@/components/ui/direction";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { tiptapTypography } from "@/styles/typography";
import {
  type Content,
  EditorContent,
  EditorContext,
  type EditorEvents,
  useEditor,
} from "@tiptap/react";
import { type Ref, useImperativeHandle } from "react";

import { TIPTAP_EXTENSIONS } from "./extensions";
import { InsertAssetUploadPopover } from "./extensions/asset-upload-node/components/InsertAssetUploadPopover";
import { BlockButtons } from "./extensions/starter-kit/components/BlockButtons";
import { HeadingPopover } from "./extensions/starter-kit/components/HeadingPopover";
import {
  LinkBubbleMenu,
  LinkPopover,
} from "./extensions/starter-kit/components/Link";
import { ListPopover } from "./extensions/starter-kit/components/ListPopover";
import { TextFormattingButtons } from "./extensions/starter-kit/components/TextFormattingButtons";
import { UndoRedo } from "./extensions/starter-kit/components/UndoRedo";
import { InsertTableOfContentsButton } from "./extensions/table-of-contents/components/InsertTableOfContentsButton";
import {
  TableBubbleMenu,
  TablePopover,
} from "./extensions/table/components/Table";
import { TextAlignPopover } from "./extensions/text-align/components/TextAlignPopover";
import { YoutubeDialog } from "./extensions/youtube/components/YoutubeDialog";
import { EditorMessagesProvider } from "./i18n/EditorMessagesContext";
import "./tiptap-editor-styles.css";

type TiptapEditorProps = {
  className?: string;

  content: Content;
  onUpdate: (props: EditorEvents["update"]) => void;

  "aria-invalid": boolean;
  ref: Ref<{ setEditable: (editable: boolean) => void }>;
  locale?: keyof typeof editorMessages;
};

function TiptapEditor({
  className,
  content,
  locale = "en",
  onUpdate,
  ref,
  "aria-invalid": ariaInvalid,
}: TiptapEditorProps) {
  const direction = useDirection();
  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    textDirection: direction,
    /**
     * Changing the `editable` prop passed to useEditor after the initial render does not update the editor's editable state.
     * To dynamically toggle the editor between read-only and editable, you must explicitly call editor.setEditable
     * after initialization whenever the `editable` value changes.
     *
     * Note: updating this inside useEffect breaks tanstack form field
     *
     * @see https://github.com/ueberdosis/tiptap/issues/111
     */
    // editable: true,
    content,
    onUpdate,
    editorProps: {
      attributes: {
        class: cn(
          tiptapTypography,
          "tiptap-editor-styles mx-auto w-full overflow-x-hidden px-0.5 focus:outline-none",
          // while working with the editor we need to remove the img margin y
          "prose-img:my-0!",
        ),
      },
    },
  });

  function handleClickInsideEditorContent() {
    editor?.commands.focus();
  }

  /**
   * Changing the `editable` prop passed to useEditor after the initial render does not update the editor's editable state.
   * To dynamically toggle the editor between read-only and editable, you must explicitly call editor.setEditable
   * after initialization whenever the `editable` value changes.
   *
   * Note: updating this inside useEffect breaks tanstack form field, we have to use a ref
   *
   * @see https://github.com/ueberdosis/tiptap/issues/111
   */
  useImperativeHandle(ref, () => ({
    setEditable: (editable: boolean) => editor?.setEditable(editable),
  }));

  if (!editor) return <Skeleton className={cn("h-200 w-full", className)} />;
  return (
    <div
      dir={direction}
      data-disabled={!editor.isEditable}
      aria-invalid={ariaInvalid}
      className={cn(
        "w-full overflow-hidden rounded-sm border aria-invalid:border-destructive data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:bg-input/30",
        className,
      )}
    >
      <EditorMessagesProvider messages={editorMessages[locale]}>
        <EditorContext value={{ editor }}>
          {/* Toolbar */}
          <div
            data-slot="editor-toolbar"
            className="flex items-center justify-center gap-2 overflow-x-auto border-b bg-card px-2 py-1.75 text-card-foreground [scrollbar-color:var(--muted-foreground)_transparent] [scrollbar-width:thin]"
          >
            <UndoRedo />

            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-5"
            />

            <HeadingPopover />
            <ListPopover />
            <BlockButtons />

            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-5"
            />

            <TextFormattingButtons />
            <LinkPopover />

            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-5"
            />

            <TextAlignPopover />
            <TablePopover />
            <InsertAssetUploadPopover />
            <YoutubeDialog />
            <InsertTableOfContentsButton />
          </div>

          {/* Bubble menus */}
          <LinkBubbleMenu />
          <TableBubbleMenu />

          {/* Editor content */}
          <EditorContent
            onClick={handleClickInsideEditorContent}
            className="h-200 w-full overflow-x-hidden overscroll-contain px-5 py-7"
            editor={editor}
          />
        </EditorContext>
      </EditorMessagesProvider>
    </div>
  );
}

export { TiptapEditor };
