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

import { LinkBubbleMenu } from "./components/LinkBubbleMenu";
import { EditorToolbar } from "./components/toolbar/EditorToolbar";
import { TableBubbleMenu } from "./components/toolbar/components/table/TableBubbleMenu";
import { TIPTAP_EXTENSIONS } from "./extensions";
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
        <EditorToolbar />

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
