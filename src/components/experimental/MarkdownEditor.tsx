"use client";

import MdxRemoteClient from "@/components/MDX-remote/MdxRemoteClient";
import Prose from "@/components/Prose";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/registry/hooks/useDebounce/useDebounce";
import { FileText } from "lucide-react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { type ChangeEvent, type ComponentProps, useState } from "react";

const viewModes = ["split", "editor", "preview"] as const;

type MarkdownEditorProps = {
  value: string;
  onValueChange: (value: string) => void;
} & Omit<ComponentProps<"textarea">, "value">;

export default function MarkdownEditor({
  value,
  onValueChange,
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = useState(value);
  const [viewMode, setViewMode] = useState<(typeof viewModes)[number]>(
    viewModes[0],
  );
  const [serializedMarkdown, setSerializedMarkdown] =
    useState<MDXRemoteSerializeResult | null>(null);
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");

  useDebounce(
    async () => {
      try {
        setStatus("working");
        setSerializedMarkdown(await serialize(markdown));
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    },
    1000,
    [markdown],
  );

  async function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    onValueChange(value);
    setMarkdown(value);
  }

  return (
    <div className="relative mx-auto flex h-200 w-full max-w-[1400px] flex-col overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/5">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <FileText className="size-4" />
          <span className="font-medium">Markdown Editor</span>
        </div>

        <div className="flex items-center">
          {viewModes.map((view) => (
            <Button
              key={view}
              size="xs"
              onClick={() => setViewMode(view)}
              variant={view === viewMode ? "default" : "outline"}
              className="gap-1.5 px-2.5 text-xs first:rounded-e-none nth-[2]:rounded-none nth-[3]:rounded-s-none"
            >
              <FileText className="size-3.5" />
              <span className="hidden capitalize sm:inline">{view}</span>
            </Button>
          ))}
        </div>
      </header>

      {/* Main content area */}
      <section className="flex min-h-0 flex-1 bg-muted/40">
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
              dir="auto"
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
            "relative overflow-auto transition-[width,opacity] duration-300 ease-out",
            viewMode === "editor" ? "w-0 opacity-0" : "opacity-100",
            viewMode === "split" && "w-1/2",
            viewMode === "preview" && "w-full",
          )}
        >
          {/* Inner container handles centering and max-width */}

          {serializedMarkdown ? (
            <Prose
              as="div"
              dir="auto"
              className="mx-auto min-h-0 max-w-3xl flex-1 p-4"
            >
              <MdxRemoteClient source={serializedMarkdown} />
            </Prose>
          ) : (
            <Skeleton className="absolute size-full rounded-none" />
          )}
        </div>
        <Badge
          className="absolute end-6 top-17 px-2 text-sm data-[status=error]:bg-error data-[status=error]:text-error-foreground data-[status=idle]:bg-success data-[status=idle]:text-success-foreground data-[status=waiting]:bg-info data-[status=waiting]:text-info-foreground data-[status=working]:bg-warning data-[status=working]:text-warning-foreground"
          data-status={status}
        >
          {status}
        </Badge>
      </section>
    </div>
  );
}
