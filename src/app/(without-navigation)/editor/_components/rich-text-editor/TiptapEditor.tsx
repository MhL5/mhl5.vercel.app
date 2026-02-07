"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import {
  type Content,
  EditorContent,
  EditorContext,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import Toolbar from "./components/Toolbar";

const extensions = [
  StarterKit.configure({
    link: {
      openOnClick: false,
      enableClickSelection: true,
      protocols: ["ftp", "mailto"],
      defaultProtocol: "https",
      HTMLAttributes: {
        // Change rel to different value
        // Allow search engines to follow links(remove nofollow)
        rel: "noopener noreferrer",
      },
    },
  }),
  TextStyleKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export const TiptapEditorDynamic = dynamic(() => import("./TiptapEditor"), {
  ssr: false,
  loading: () => <Skeleton className="h-40 w-full" />,
});

type TiptapEditorProps = {
  className?: string;
  content: Content;
  onUpdate: (content: Content) => void;
  editable?: boolean;
};

export default function TiptapEditor({
  className,
  content,
  editable,
  onUpdate,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions,
    content,
    editable, // Todo: for some reason doesn't work
    editorProps: {
      attributes: {
        class: `typography w-full mx-auto overflow-x-hidden focus:outline-none`,
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => onUpdate(editor.getJSON()),
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
        <EditorContent
          className="h-[70svh] w-full overflow-y-auto px-5 py-7"
          editor={editor}
        />
      </EditorContext>
    </div>
  );
}
