import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  type Content,
  EditorContent,
  EditorContext,
  type EditorEvents,
  useEditor,
} from "@tiptap/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

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
import { useSyncEditorEditable } from "./hooks/useSyncEditorEditable";

type TiptapEditorProps = {
  className?: string;
  content: Content;
  onUpdate: (props: EditorEvents["update"]) => void;
  editable?: boolean;
};

function TiptapEditor({
  className,
  content,
  editable = true,
  onUpdate,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content,
    editable,
    editorProps: {
      attributes: {
        class: `tiptap tiptap-typography px-0.5 w-full mx-auto overflow-x-hidden focus:outline-none`,
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate,
  });

  const memoizedEditor = useMemo(() => editor, [editor]);

  useSyncEditorEditable({ editable, editor });

  if (!editor) return <TiptapEditorSkeleton />;
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border bg-background",
        className,
      )}
    >
      <EditorContext value={{ editor: memoizedEditor }}>
        <div
          data-slot="editor-toolbar"
          className="flex items-center justify-center gap-2 overflow-x-auto bg-card px-2 py-1.75 text-card-foreground"
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

        <LinkBubbleMenu />
        <TableBubbleMenu />

        <EditorContent
          className="h-200 w-full overflow-x-hidden px-5 py-7 md:h-250"
          editor={editor}
        />
      </EditorContext>
    </div>
  );
}

const TiptapEditorSkeleton = () => (
  <Skeleton className="h-200 w-full md:h-250" />
);

const TiptapEditorDynamic = dynamic(
  () => import("./TiptapEditor").then((mod) => mod.TiptapEditor),
  {
    ssr: false,
    loading: TiptapEditorSkeleton,
  },
);

export { TiptapEditor, TiptapEditorDynamic };
