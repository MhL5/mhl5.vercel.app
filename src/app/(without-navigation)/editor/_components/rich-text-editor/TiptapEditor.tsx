"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { typographyClassName } from "@/styles/typographyClassName";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { type Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dynamic from "next/dynamic";

import Toolbar from "./components/Toolbar";
import { TiptapEditorContextProvider } from "./context/TiptapEditorContext";

const extensions = [
  StarterKit,
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
        class: cn(typographyClassName, `focus:outline-none`, className),
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => onUpdate(editor.getJSON()),
  });

  if (!editor) return <Skeleton className="h-40 w-full" />;
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <TiptapEditorContextProvider editor={editor}>
        <Toolbar />
        <EditorContent
          className="h-[70svh] overflow-y-auto px-5 py-7"
          editor={editor}
        />
      </TiptapEditorContextProvider>
    </div>
  );
}
