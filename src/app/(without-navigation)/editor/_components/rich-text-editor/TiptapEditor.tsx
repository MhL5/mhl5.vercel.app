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
import { TableBubbleMenu } from "./components/TablePopover";
import Toolbar from "./components/Toolbar";
import { TIPTAP_EXTENSIONS } from "./extensions";

const TiptapEditorDynamic = dynamic(
  () => import("./TiptapEditor").then((mod) => mod.TiptapEditor),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[70svh] w-full" />,
  },
);

type TiptapEditorProps = {
  className?: string;
  content: Content;
  onUpdate: (props: EditorEvents["update"]) => void;
  editable?: boolean;
};

function TiptapEditor({
  className,
  content,
  editable,
  onUpdate,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: TIPTAP_EXTENSIONS,
    content,
    editable, // Todo: for some reason doesn't work
    editorProps: {
      attributes: {
        class: `tiptap typography px-0.5 w-full mx-auto overflow-x-hidden focus:outline-none`,
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate,
  });

  const memoizedEditor = useMemo(() => editor, [editor]);

  if (!editor) return <Skeleton className="h-40 w-full" />;
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border bg-background",
        className,
      )}
    >
      <EditorContext value={{ editor: memoizedEditor }}>
        <Toolbar />

        <LinkBubbleMenu />
        <TableBubbleMenu />

        <EditorContent
          className="h-[70svh] w-full overflow-x-hidden px-5 py-7"
          editor={editor}
        />
      </EditorContext>
    </div>
  );
}

export { TiptapEditorDynamic, TiptapEditor };
