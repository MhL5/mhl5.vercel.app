"use client";

import MdxRemoteClient from "@/components/MDX-remote/MdxRemoteClient";
import Prose from "@/components/Prose";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { type ChangeEvent, useState } from "react";

const viewModes = ["split", "editor", "preview"] as const;

type MarkdownEditorProps = {
  markdown: string;
  serializedMarkdown: MDXRemoteSerializeResult;
};

export default function MarkdownEditor({
  markdown: initialMarkdown,
  serializedMarkdown: initialSerializedMarkdown,
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [viewMode, setViewMode] = useState<(typeof viewModes)[number]>(
    viewModes[0],
  );
  const [serializedMarkdown, setSerializedMarkdown] =
    useState<MDXRemoteSerializeResult>(initialSerializedMarkdown);

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setMarkdown(value);
    setSerializedMarkdown(await serialize(value));
  }

  return (
    <div className="mx-auto flex h-200 w-full max-w-7xl flex-col overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/5">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <FileText className="size-4" />
          <span className="font-medium">Markdown Editor</span>
        </div>

        <div className="flex items-center gap-1">
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as typeof viewMode)}
          >
            <TabsList className="h-8">
              {viewModes.map((view) => (
                <TabsTrigger
                  key={view}
                  value={view}
                  className="gap-1.5 px-2.5 text-xs"
                >
                  <FileText className="size-3.5" />
                  <span className="hidden capitalize sm:inline">{view}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main content area */}
      <section className="flex min-h-0 flex-1">
        {/* Editor pane - outer container handles width transitions */}
        <div
          className={cn(
            "min-h-0 overflow-hidden transition-[width,opacity] duration-300 ease-out",
            viewMode === "preview" ? "w-0 opacity-0" : "opacity-100",
            viewMode === "split" && "w-1/2 border-r",
            viewMode === "editor" && "w-full",
          )}
        >
          {/* Inner container handles centering and max-width */}
          <div className="mx-auto h-full w-full max-w-3xl">
            <textarea
              value={markdown}
              onChange={handleChange}
              className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
              placeholder="Start writing your markdown..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Preview pane - outer container handles width transitions */}
        <div
          className={cn(
            "min-h-0 overflow-auto bg-muted/20 transition-[width,opacity] duration-300 ease-out",
            viewMode === "editor" ? "w-0 opacity-0" : "opacity-100",
            viewMode === "split" && "w-1/2",
            viewMode === "preview" && "w-full",
          )}
        >
          {/* Inner container handles centering and max-width */}
          <Prose as="div" className="mx-auto max-w-3xl flex-1 p-4">
            <MdxRemoteClient source={serializedMarkdown} />
          </Prose>
        </div>
      </section>
    </div>
  );
}
